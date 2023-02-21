import React,{ useState,useEffect,useId } from 'react'
import uuid from 'react-uuid';
import {Link} from 'react-router-dom'
import Layout from '../components/Layout'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { CategoriesType } from '../helpers/categories'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc } from 'firebase/firestore'

const firestore = getFirestore(app)

const animatedComponents = makeAnimated();
const initialState = {
    eventName: "",
    eventSlug: "",
    imageURL: "",
    eventYear:"",
    eventDescription: "",
    stage:"",
    maxTeams: 0,
    minTeams:0,
    categories: [],
    challenges:[],
    available:true,
    id:"",
  };

const AddEvent = () => {

  const [challengesList,setChallengesList] = useState([])
  const challengesOptions = challengesList.map((elm, index) => ({
                              value: index,
                              label: elm.name,
                            }));
  const categoryOptions = CategoriesType.map((elm, index) => ({
                            value: index,
                            label: elm,
                          }));
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState([])
  const idGnerator = () =>{
    const fullId = uuid()
    const firstId = fullId.substring(0,8)
    const secondId = fullId.slice(9,13)
    return `${firstId}${secondId}`
  }
  const [formData, setFormData] = useState(initialState);
  const {
      eventName,
      eventSlug,
      imageURL,
      eventYear,
      eventDescription,
      stage,
      maxTeams,
      minTeams,
      categories,
      challenges,
      available,
      id
    } = formData;
    
  useEffect(() => {
    const fetchChallenges = async () => {
      let list = [];
      try{
          const querySnapshot =  await getDocs(collection(firestore, "challenges"));
          querySnapshot.forEach((doc) => {
           /*  console.log(doc.data().id)  */
            list.push(doc.data()).name})
            setChallengesList(list)
            /* console.log(list) */
      }catch (err){
          console.log(err);
      }
    }
    fetchChallenges();
  }, [])

  async function addEventData(e){
    e.preventDefault();
    /* console.log("probando",formData) */
    await setDoc(doc(firestore,"events",id),formData)
    /* console.log("probando2",formData) */
    cleanForm(e) 
  }

  const cleanForm = (e) => {
      setSelectedCategory([])
      setSelectedChallenge([])
      e.target.available.checked=true
      setFormData(initialState)
  }

  const handleChange = (e)=>{
    setFormData({...formData,
        [e.target.name]:
        ('eventYear'===e.target.name
        ||'maxTeams'===e.target.name
        ||'minTeams'===e.target.name)
        ? parseInt(e.target.value)
        :e.target.type === 'checkbox'
        ? e.target.checked 
        : e.target.value})
  };

  const handleChangeSelect = (e)=>{
    const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
    setSelectedCategory(selectedOptions)
    setFormData({
        ...formData,
        categories: categoryOptions
            .filter((option) => selectedOptions.includes(option.value))
            .map((elm) => elm.label),
        });
  };
  const handleChangeSelect2 = (e)=>{
    const eventId = idGnerator()
    const selectedChallenges = Array.isArray(e) ? e.map((option) => option.value) : [];
    setSelectedChallenge(selectedChallenges)
    setFormData({
        ...formData,
        challenges: challengesOptions
            .filter((option) => selectedChallenges.includes(option.value))
            .map((elm) => elm.label),
        id:eventId,
        });
  };

  return (
      <Layout>
          <div className='py-4'>
              <Link to="/events" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
          </div>
          <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl mb-5' onSubmit={addEventData}>
              <div className='mb-4 flex'>
                  <h1 className='text-4xl font-bold text-blue-900'>Agregar Evento</h1>
                  <div className='ml-auto flex gap-2'>
                      <label htmlFor="available" className='text-xl'>Habilitar:</label>
                      <input type="checkbox" className='
                                                      mt-1
                                                      form-input 
                                                      block 
                                                      h-6
                                                      rounded-md 
                                                      border-gray-300 
                                                      shadow-sm
                                                      focus:border-indigo-300 
                                                      focus:ring 
                                                      ocus:ring-indigo-200 
                                                      focus:ring-opacity-50'
                                              id="available"
                                              name="available"
                                              defaultChecked={true}
                                              checked={available.check}
                                              value={available}
                                              onChange={() =>
                                                  setFormData({
                                                  ...formData,
                                                  available: !formData.available,})}/>
                  </div>
                  <hr className='text-black'/>
              </div>
              <label htmlFor="eventName">Nombre Evento (*):</label>
              <input type="text" className='
                                          mt-1
                                          form-input 
                                          block 
                                          w-full 
                                          rounded-md 
                                          border-gray-300 
                                          shadow-sm
                                          focus:border-indigo-300 
                                          focus:ring 
                                          focus:ring-indigo-200 
                                          focus:ring-opacity-50'
                                  id="eventName"
                                  name="eventName"
                                  value={eventName}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="eventSlug">Slug Reto (*):</label>
              <input type="text" className='
                                          mt-1
                                          form-input 
                                          block 
                                          w-full 
                                          rounded-md 
                                          border-gray-300 
                                          shadow-sm
                                          focus:border-indigo-300 
                                          focus:ring 
                                          focus:ring-indigo-200 
                                          focus:ring-opacity-50'
                                  id="eventSlug"
                                  name="eventSlug"
                                  value={eventSlug}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="imageURL">url imagen(*):</label>
              <input type="text" className='
                                          mt-1
                                          form-input 
                                          block 
                                          w-full 
                                          rounded-md 
                                          border-gray-300 
                                          shadow-sm
                                          focus:border-indigo-300 
                                          focus:ring 
                                          focus:ring-indigo-200 
                                          focus:ring-opacity-50'
                                  id="imageURL"
                                  name="imageURL"
                                  value={imageURL}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="eventYear">año(*):</label>
              <input type="number" className='
                                          mt-1
                                          form-input 
                                          block 
                                          w-full 
                                          rounded-md 
                                          border-gray-300 
                                          shadow-sm
                                          focus:border-indigo-300 
                                          focus:ring 
                                          focus:ring-indigo-200 
                                          focus:ring-opacity-50'
                                  id="eventYear"
                                  name="eventYear"
                                  value={eventYear}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="eventDescription">Descripcion: </label>
              <textarea  className='
                                  mt-1
                                  form-input 
                                  block 
                                  w-full 
                                  rounded-md 
                                  border-gray-300 
                                  shadow-sm
                                  focus:border-indigo-300 
                                  focus:ring 
                                  focus:ring-indigo-200 
                                  focus:ring-opacity-50'
                          id="eventDescription"
                          name="eventDescription"
                          value={eventDescription}
                          onChange={handleChange}/>
              
              <div>
                <label htmlFor="stage">Etapa</label>
                <select
                  className="mt-1
                            form-input
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300 
                            focus:ring 
                            focus:ring-indigo-200 
                            focus:ring-opacity-50"
                  name="stage"
                  id="stage"
                  value={stage}
                  onChange={handleChange}
                >
                  <option value="">Selecciona la etapa</option>
                  <option value="registration">Registro Equipos</option>
                  <option value="scoring">Calificando</option>
                  <option value="finished">Terminado</option>
                </select>
              </div>


              <label htmlFor="maxTeams">maximo de equipos(*):</label>
              <input type="number" className='
                                              mt-1
                                              form-input 
                                              block 
                                              w-full 
                                              rounded-md 
                                              border-gray-300 
                                              shadow-sm
                                              focus:border-indigo-300 
                                              focus:ring 
                                              focus:ring-indigo-200 
                                              focus:ring-opacity-50'
                                  id="maxTeams"
                                  name="maxTeams"
                                  value={maxTeams}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="minTeams">minimo de equipos(*):</label>
              <input type="number" className='
                                              mt-1
                                              form-input 
                                              block 
                                              w-full 
                                              rounded-md 
                                              border-gray-300 
                                              shadow-sm
                                              focus:border-indigo-300 
                                              focus:ring 
                                              focus:ring-indigo-200 
                                              focus:ring-opacity-50'
                                  id="minTeams"
                                  name="minTeams"
                                  value={minTeams}
                                  onChange={handleChange}
                                  required/>
              <label htmlFor="categories">Categorias (*): </label>
              <Select
                      placeholder='Selecciona las categorias'
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      isMulti
                      isClearable
                      options={categoryOptions}
                      id="categories"
                      className='mt-1'
                      name="categories"
                      value={categoryOptions.filter((elm)=>selectedCategory.includes(elm.value))}
                      onChange={handleChangeSelect}
                      required/>
              <div>
              <label htmlFor="retos">Retos (*): </label>
              <Select
                    placeholder='Selecciona los retos'
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    isMulti
                    isClearable
                    options={challengesOptions}
                    id="challenges"
                    className='mt-1'
                    name="challenges"
                    value={challengesOptions.filter((elm)=>selectedChallenge.includes(elm.value))}
                    onChange={handleChangeSelect2}
                    required/>
              </div>
              <hr className='mt-4'/>
              <div className='inline-block mt-3 w-1/2 pl-1'>
                  <button type="submit" className='bg-blue-900 p-2 text-white rounded mr-2'>Guardar</button>
                  <button type="reset" className='border border-blue-900 p-2 text-blue-900 rounded'>Cancelar</button>
              </div>
          </form>
      </Layout>
  )
}

export default AddEvent