import React,{useState} from 'react'
import uuid from 'react-uuid';
import {Link} from 'react-router-dom'
import Layout from '../components/Layout'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { CategoriesType } from '../helpers/categories'
import app from '../firebase';
import { getFirestore,updateDoc,doc,setDoc } from 'firebase/firestore';

const firestore = getFirestore(app)

const animatedComponents = makeAnimated();
const initialState = {
    name: "",
    slug: "",
    imageURL: "",
    description: "",
    maxTeams: 0,
    innings: 0,
    inningTime: 0,
    winningPoints:0,
    tiePoints:0,
    playoffs: false,
    finalTeams: 0,
    categories: [],
    available: true,
    challengeType:"match",
    id:""
  };

const AddMatchChallenge = () => {
      // selecet Categories use State
    const categoryOptions = CategoriesType.map((elm, index) => ({
                    value: index,
                     label: elm,
                            }));
    const [selectedCategory, setSelectedCategory] = useState([])

    const [formData, setFormData] = useState(initialState);
    /* const [selectedOptions, setSelectedOptions] = useState([]); */
    const {
        name,
        slug,
        imageURL,
        description,
        categories,
        maxTeams,
        innings,
        inningTime,
        winningPoints,
        tiePoints,
        playoffs,
        finalTeams,
        available,
        id
      } = formData;
    
    const idGnerator = () =>{
      const fullId = uuid()
      const firstId = fullId.substring(0,8)
      const secondId = fullId.slice(9,13)
      return `${firstId}${secondId}`
    }

    async function addChallenge(e){
      e.preventDefault();
      await setDoc(doc(firestore,"challenges",id),formData)
      cleanForm(e)
    }

    const cleanForm = (e) => {
        setSelectedCategory([])
        e.target.available.checked=true
        e.target.playoffs.checked=false
        setFormData(initialState)
    }

    const handleChange = (e)=>{
      setFormData({...formData,
          [e.target.name]:
          ('maxTeams'===e.target.name
          ||'innings'===e.target.name
          ||'inningTime'===e.target.name
          ||'winningPoints'===e.target.name
          ||'tiePoints'===e.target.name
          ||'finalTeams'===e.target.name)
          ? parseInt(e.target.value)
          :e.target.type === 'checkbox'
          ? e.target.checked 
          : e.target.value})
    };

    const handleChangeSelect = (e)=>{
      const challengeId = idGnerator()
      const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
      setSelectedCategory(selectedOptions)
      setFormData({
          ...formData,
          categories: categoryOptions
              .filter((option) => selectedOptions.includes(option.value))
              .map((elm) => elm.label),
          id:challengeId
          });
    };
/* console.log("afuera",selectedOptions) */

    return (
        <Layout>
            <div className='py-4'>
                <Link to="/challenges" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
            </div>
            <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl mb-5' onSubmit={addChallenge}>
                <div className='mb-4 flex'>
                    <h1 className='text-4xl font-bold text-blue-900'>Agregar Reto Partido</h1>
                    <div className='ml-auto flex gap-2'>
                        <label htmlFor="available" className='text-xl text-green-600 font-bold'>Habilitar reto:</label>
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
                <label htmlFor="name">Nombre Reto (*):</label>
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
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="challengeSlug">Slug Reto (*):</label>
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
                                    id="challengeSlug"
                                    name="slug"
                                    value={slug}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="urlImage">url imagen(*):</label>
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
                                    id="urlImage"
                                    name="imageURL"
                                    value={imageURL}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="description">Descripcion: </label>
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
                            id="description"
                            name="description"
                            value={description}
                            onChange={handleChange}/>

                <label htmlFor="categorias">Categorias (*): </label>
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
                <div>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Innings</h2>
                    <label htmlFor="innings">No. Innings por partido(*):</label>
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
                                        id="innings"
                                        name="innings"
                                        value={innings}
                                        onChange={handleChange}
                                        required/>
                    <label htmlFor="inningTime">Tiempo por inning (segundos):(*):</label>
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
                                        id="inningTime"
                                        name="inningTime"
                                        value={inningTime}
                                        onChange={handleChange}
                                        required/>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Puntajes</h2>
                    <div className='flex'>
                      <div className='grow'>
                      <label htmlFor="winningPoints">Puntos ganador:(*):</label>
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
                                            id="winningPoints"
                                            name="winningPoints"
                                            value={winningPoints}
                                            onChange={handleChange}
                                            required/>
                      </div>
                      <div className='grow'>
                      <label htmlFor="tiePoints">Puntos empate:(*):</label>
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
                                            id="tiePoints"
                                            name="tiePoints"
                                            value={tiePoints}
                                            onChange={handleChange}
                                            required/>
                      </div>
                    </div>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Finales</h2>
                    <div className='flex gap-2'>
                        <label htmlFor="playoffs" className='text-lg'>PlayOffs:</label>
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
                                                        focus:ring-indigo-200 
                                                        focus:ring-opacity-50'
                                                id="playoffs"
                                                name="playoffs"
                                                checked={playoffs.check}
                                                value={playoffs}
                                                onChange={handleChange}/>
                    </div>
                    <label htmlFor="finalTeams">No. equipos finalistas:</label>
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
                                        id="finalTeams"
                                        name="finalTeams"
                                        value={finalTeams}
                                        onChange={handleChange}
                                        disabled={!playoffs}/>

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

export default AddMatchChallenge