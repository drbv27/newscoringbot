import React,{useState} from 'react'
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
import { getFirestore,updateDoc,doc,setDoc } from 'firebase/firestore';

const firestore = getFirestore(app)

const animatedComponents = makeAnimated();
const initialState = {
    name: "",
    slug: "",
    imageURL: "",
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
  };

const AddTaskChallenge = () => {
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

    async function addChallenge(e){
    e.preventDefault();
    numberFormat()
    console.log(formData)
    await setDoc(doc(firestore,"challenges",name),formData)
    }

    const numberFormat = () => {
        setFormData({...formData,maxTeams:parseInt(maxTeams)})
        setFormData({...formData,maxTurns:parseInt(maxTurns)})
        setFormData({...formData,finalTeams:parseInt(finalTeams)})
        setFormData({...formData,maxTime:parseInt(maxTime)})
        setFormData({...formData,topMaxTurns:parseInt(topMaxTurns)})
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
    setFormData({...formData,[e.target.name]:e.target.type === 'checkbox' ? e.target.checked : e.target.value})
    /* setFormData({...formData,maxTeams:parseInt(maxTeams)}) */
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

/* console.log("afuera",selectedOptions) */

    return (
        <Layout>
            <div className='py-4'>
                <Link to="/challenges" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
            </div>
            <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl' onSubmit={addChallenge}>
                <div className='mb-4 flex'>
                    <h1 className='text-4xl font-bold text-blue-900'>Agregar Reto</h1>
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
                                    onChange={handleChange}/>
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
                                    onChange={handleChange}/>
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
                                    onChange={handleChange}/>
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
                        onChange={handleChangeSelect}/>
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
                                    onChange={handleChange}/>
                <div>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Turnos</h2>
                    <label htmlFor="innings">No. Turnos por Equipo(*):</label>
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
                                        name="maxTurns"
                                        value={maxTurns}
                                        onChange={handleChange}/>
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
                                        onChange={handleChange}/>
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
                                        onChange={handleChange}/>
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
                    <MatchChallengeForm addTask={addTask} textButton="Añadir" />
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
                                                            })
                                                        }
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
                                                            })
                                                        }
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

export default AddTaskChallenge