import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import ChallengeForm from '../components/ChallengeForm'
import Layout from '../components/Layout'
import Select from 'react-select'
import ToggleSwitch from '../components/ToggleSwitch'
import makeAnimated from 'react-select/animated';
import MatchChallengeForm from '../components/MatchChallengeForm';
import TaskChallengeForm from '../components/TaskChallengeForm';
import TasksTableForm from '../components/TasksTableForm'
import { CategoriesType } from '../helpers/categories'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc } from 'firebase/firestore'

const firestore = getFirestore(app)

const animatedComponents = makeAnimated();
const initialState = {
    teamName: "",
    country: "",
    city: "",
    events:[],
    description: "",
    maxTeams: 0,
    maxTurns: 0,
    topMaxTurns: 0,
    playoffs: false,
    finalTeams: 0,
    categories: [],
    available: false,
    maxTime: 0,
    tasks: [],
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
        description,
        categories,
        maxTeams,
        maxTurns,
        topMaxTurns,
        tasks,
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

    const addTask = (task) => {
    setFormData({ ...formData, tasks: [...tasks, task] });
    console.log("tareas",tasks)
    };

    const deleteTask = (e,index) => {
    e.preventDefault()
    const copyTask= [...tasks]
    copyTask.splice(index,1)
    setFormData({ ...formData, tasks: [...copyTask] });
    };

    const handleChange = (e)=>{
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
/* console.log("afuera",formData) */

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
                <label htmlFor="events">Eventos (*): </label>
                <Select
                        placeholder='Selecciona los eventos'
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti
                        isClearable
                        options={eventsOptions}
                        id="events"
                        className='mt-1'
                        name="events"
                        value={eventsOptions.filter((elm)=>selectedEvent.includes(elm.value))}
                        onChange={handleChangeSelect}
                        required/>

{/*                 {selectedEvent.length>0 
                    &&  <select>
                            {eventList[selectedEvent].challenges.map((chall)=><option key={eventList[selectedEvent].id}>{chall}</option>)}
                            {eventList[selectedEvent].challenges.map((chall)=><option>{chall}</option>)}
                        </select>                     
                    
                } */}
                {selectedEvent.length>0 
                    &&  <select>
                            {eventList[selectedEvent].challenges.map((chall)=><option key={eventList[selectedEvent].id}>{chall.name}</option>)}
                        </select>                     
                    
                }
                {selectedEvent.length>0 && <p>prueba</p>}
                
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

{/*                 <label htmlFor="categorias">Categorias (*): </label>
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
                        required/> */}
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
                    <h2 className='text-xl font-bold'>Turnos</h2>
                    <label htmlFor="maxTurns">No. Turnos por Equipo(*):</label>
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
                                        id="maxTurns"
                                        name="maxTurns"
                                        value={maxTurns}
                                        onChange={handleChange}
                                        required/>
                    <label htmlFor="topMaxTurns">No. Turnos por Suma Top para clasificar(*):</label>
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
                                        id="topMaxTurns"
                                        name="topMaxTurns"
                                        value={topMaxTurns}
                                        onChange={handleChange}
                                        required/>
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
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Tareas</h2>
                    <label htmlFor="maxTime">Tiempo Maxímo (segundos):</label>
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
                                        id="maxTime"
                                        name="maxTime"
                                        value={maxTime}
                                        onChange={handleChange}/>
                    <TasksTableForm taskArray={tasks} deleteTask={deleteTask}/>
                    <TaskChallengeForm addTask={addTask} textButton="Añadir" />
                    <div className='flex gap-2 mt-2'>
                        <label htmlFor="taskSecuence" className='text-lg'>
                            Tareas en secuencia
                        </label>
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
                                                id="taskSecuence"
                                                name="taskSecuence"
                                                checked={taskSecuence.check}
                                                value={taskSecuence}
                                                onChange={(e) =>
                                                            setFormData({
                                                            ...formData,
                                                            taskSecuence: e.target.checked,
                                                            })}
                        />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <label htmlFor="stopTime" className='text-lg'>
                            Detener tiempo última vuelta
                        </label>
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
                                                id="stopTime"
                                                name="stopTime"
                                                checked={stopTime.check}
                                                value={stopTime}
                                                onChange={(e) =>
                                                            setFormData({
                                                            ...formData,
                                                            stopTime: e.target.checked,
                                                            })}
                        />
                    </div>

                    <div className="mt-3">
                        <label className="col-sm-3 col-form-label" htmlFor="bonusType">
                            Puntaje Bonus
                        </label>
                        <div className="">
                            <select
                                className='
                                            p-2
                                            border-gray-300
                                            rounded-md
                                            form-input
                                            mt-1
                                            block
                                            shadow-sm
                                            focus:border-indigo-300 
                                            focus:ring 
                                            focus:ring-indigo-200 
                                            focus:ring-opacity-50'
                                name="bonusType"
                                id="bonustype"
                                value={bonusType}
                                onChange={handleChange}
                            >
                                <option value="">Ninguno</option>
                                <option value="timer">Sumar tiempo restante Timer</option>
                                <option value="manual">Ingresar manualmente</option>
                            </select>
                        </div>
                    </div>
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