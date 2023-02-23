import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../components/Layout'
import { CategoriesType } from '../helpers/categories'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc } from 'firebase/firestore'
import UserTeamForm from '../components/UserTeamForm'

const firestore = getFirestore(app)

const initialState = {
    teamName: "",
    country: "",
    city: "",
    events:[],
    teamEvent:"",
    teamChallenge:"",
    description: "",
    maxTeams: 0,
    maxTurns: 0,
    topMaxTurns: 0,
    playoffs: false,
    finalTeams: 0,
    categories: [],
    available: false,
    maxTime: 0,
    members: [],
    taskSecuence: false,
    stopTime: false,
    bonusType: "",
    challengeType:"tasks"
  };

const AddTeam = () => {
    const [eventList,setEventList] = useState([])
    const eventsOptions = eventList.map((elm, index) => ({
        value: index,
        label: elm.eventName,
      }));
    const [selectedEvent, setSelectedEvent] = useState([])
      // selecet Categories use State
    const categoryOptions = CategoriesType.map((elm, index) => ({
                    value: index,
                     label: elm,
                            }));
    const [selectedCategory, setSelectedCategory] = useState([])

    const [formData, setFormData] = useState(initialState);
    /* const [selectedOptions, setSelectedOptions] = useState([]); */
    const {
        teamName,
        country,
        city,
        events,
        institution,
        teamEvent,
        teamChallenge,
        description,
        categories,
        maxTeams,
        maxTurns,
        topMaxTurns,
        members,
        taskSecuence,
        stopTime,
        bonusType,
        maxTime,
        playoffs,
        finalTeams,
        available,
      } = formData;

    useEffect(() => {
    const fetchEvents = async () => {
        let list = [];
        try{
            const querySnapshot =  await getDocs(collection(firestore, "events"));
            querySnapshot.forEach((doc) => {
            /*  console.log(doc.data().id)  */
            list.push(doc.data())
            })
            setEventList(list)
            /* console.log(list) */
        }catch (err){
            console.log(err);
        }
    }
    fetchEvents();
    }, [])

   /*  console.log(eventList) */

    async function saveTeam(e){
        e.preventDefault();
/*         const evetsToSend = selectedEvent.map((event)=>eventList[event].id)
        console.log(evetsToSend)
        setFormData({
            ...formData,
            events: evetsToSend}) */
        console.log("enviando...")
        console.log("al enviar",formData)
       /*  console.log(selectedEvent) */
        /* await setDoc(doc(firestore,"challenges",name),formData) */
        /* cleanForm(e) */
    }

    const cleanForm = (e) => {
        setSelectedCategory([])
        e.target.available.checked=false
        e.target.playoffs.checked=false
        e.target.stopTime.checked=false
        e.target.taskSecuence.checked=false
        setFormData(initialState)

    }

    const addMember = (member) => {
        console.log(member)
        console.log(formData)
        setFormData({ ...formData, members: [...members, member] });
        console.log(formData)
    console.log("miembros",members)
    };

    const deleteMember = (e,index) => {
    e.preventDefault()
    const copyMember= [...members]
    copyMember.splice(index,1)
    setFormData({ ...formData, members: [...copyMember] });
    };

    const handleChange = (e)=>{
        console.log(e.target)
/*     setFormData({...formData,
        [e.target.name]:
        ('teamEvent'===e.target.name)
        ? parseInt(e.target.value)
        :e.target.type === 'checkbox'
        ? e.target.checked 
        : e.target.value}) */
    setFormData({...formData,
        [e.target.name]:
        ('maxTurns'===e.target.name
        ||'maxTeams'===e.target.name
        ||'finalTeams'===e.target.name
        ||'maxTime'===e.target.name
        ||'topMaxTurns'===e.target.name)
        ? parseInt(e.target.value)
        :e.target.type === 'checkbox'
        ? e.target.checked 
        : e.target.value})
    };

    const handleChangeSelect = (e)=>{
        const selectedEvents = Array.isArray(e) ? e.map((option) => option.value) : [];
        setSelectedEvent(selectedEvents)
        console.log("prueba",selectedEvent)
        setFormData({
            ...formData,
            events: selectedEvents.map((event)=>eventList[event])})
    };
console.log("eventos",selectedEvent)
console.log(eventList)
console.log(eventList.filter((evt)=>evt.available===true).map((evt)=>evt))
console.log(teamEvent)
console.log("afuera",formData)
if(teamEvent!==""){
    console.log(eventList.filter((event)=>event.id===teamEvent)[0].challenges.map((challenge)=>challenge.name))
}
/* console.log(eventList.filter((event)=>event.id===teamEvent)[0].challenges)
console.log(eventList.filter((event)=>event.id===teamEvent)[0].challenges) */


    return (
        <Layout>
            <div className='py-4'>
                <Link to="/teams" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
            </div>
            <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl mb-5' onSubmit={saveTeam}>
                <div className='mb-4 flex'>
                    <h1 className='text-4xl font-bold text-blue-900'>Agregar Equipo</h1>
                    <div className='ml-auto flex gap-2'>
                        <label htmlFor="available" className='text-xl'>Habilitar equipo:</label>
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
                <label htmlFor="teamName">Nombre Equipo (*):</label>
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
                                    id="teamName"
                                    name="teamName"
                                    value={teamName}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="country">País (*):</label>
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
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="city">ciudad(*):</label>
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
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="institution">Institución(*):</label>
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
                                    id="institution"
                                    name="institution"
                                    value={institution}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="events">Evento (*): </label>

                <select name="teamEvent"
                        value={teamEvent} 
                        id="teamEvent" 
                        onChange={handleChange}
                        className='mt-1
                                form-input 
                                block 
                                w-full 
                                rounded-md 
                                border-gray-300 
                                shadow-sm
                                focus:border-indigo-300 
                                focus:ring 
                                focus:ring-indigo-200 
                                focus:ring-opacity-50'>
                    <option value="">Seleccione evento</option>
                    {eventList.filter((evt)=>evt.available===true).map((evt)=><option value={evt.id}>{evt.eventName}</option>)}
                </select>


                <label htmlFor="teamChallenge">Reto (*): </label>
                <select name="teamChallenge"
                        value={teamChallenge} 
                        id="teamChallenge" 
                        onChange={handleChange}
                        className='mt-1
                                form-input 
                                block 
                                w-full 
                                rounded-md 
                                border-gray-300 
                                shadow-sm
                                focus:border-indigo-300 
                                focus:ring 
                                focus:ring-indigo-200 
                                focus:ring-opacity-50'>
                    <option value="">Seleccione reto</option>
                    {teamEvent!=="" && eventList
                                        .filter((event)=>event.id===teamEvent)[0].challenges
                                        .map((challenge)=><option value={challenge.id}>{challenge.name}</option>)}
                </select>

                <div>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Participantes:</h2>
 
                    <UserTeamForm addMember={addMember} textButton="Añadir"/>
                    

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

export default AddTeam