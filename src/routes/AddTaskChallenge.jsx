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
    available: "",
    maxTime: 0,
    tasks: [],
    taskSecuence: true,
    stopTime: true,
    bonusType: "",
  };

const AddTaskChallenge = () => {
    const [formData, setFormData] = useState(initialState);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [choices, setChoices] = useState([]);
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
    const [challType,setChallType] = useState("none")
    const challengeTypes = ["tareas","partido"]
    const myData =  [
    { value: 'child', label: 'Infantil' },
    { value: 'junior', label: 'Junior' },
    { value: 'youth', label: 'Juvenil' },
    { value: 'senior', label: 'Senior' },
    { value: '0', label: 'Fin' },
  ]

  async function addChallenge(e){
    e.preventDefault();
    
    
    console.log(formData)
  }
  /* console.log(challType); */

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
    /* setFormData({...formData,
        [e.target.name]:e.target.type === 'checkbox' ? e.target.checked : e.target.value}) */
}
/* const handleChangeSelect = (e)=>{
    setChoices(Array.isArray(e) ? e.map(x=>x.value):[])
    setFormData({...formData, categories:choices})
    console.log("adentro",choices)
    console.log(formData)
} */
const handleChangeSelect = (data)=>{
    setSelectedOptions(data);
    setFormData({...formData, categories:selectedOptions})
    console.log(selectedOptions)
}

/* console.log("afuera",selectedOptions) */

    return (
        <Layout>
            <div className='py-4'>
                <Link to="/challenges" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
            </div>
            <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl' onSubmit={addChallenge}>
        <div className='mb-4'>
            <h1 className='text-4xl font-bold text-blue-900'>Agregar Reto</h1>
            <ToggleSwitch/>
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
                            onChange={handleChange}
                                    />
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
{/*         <Select
                closeMenuOnSelect={true}
                placeholder="Selecciona las categorias"
                components={animatedComponents}
                isMulti
                isClearable
                options={myData}
                id="categorias"
                className='mt-1'
                name="categorias"
                value={myData.filter(obj => choices.includes(obj.value))}
                onChange={handleChangeSelect}
                /> */}
        <Select
                closeMenuOnSelect={true}
                placeholder='Selecciona las categorias y finaliza con "Fin"'
                components={animatedComponents}
                isMulti
                isClearable
                options={myData}
                id="categories"
                className='mt-1'
                name="categories"
                value={selectedOptions}
                onChange={handleChangeSelect}
                />


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

{/*         <label htmlFor="userFormRole">Tipo de reto: </label>
        <div className='my-2 w-full relative rounded-2xl shadow-xl'>
          <input 
                list="challengetype" 
                name="challengetype" 
                id="userChallengeType" 
                className='w-full p-2 bg-primary border border-input rounded-2xl' 
                placeholder='Selecciona tipo de reto'
                onChange={e=>setChallType(e.target.value)} 
          />
            <datalist id="challengetype">
                {challengeTypes.map((type,index) => (
                  <option key={index}>{type}</option>
                ))}
            </datalist>
          </div> */}
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
        <label htmlFor="inningsTop">No. Turnos por Suma Top para clasificar(*):</label>
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
                                    id="inningsTop"
                                    name="topMaxTurns"
                                    value={topMaxTurns}
                                    onChange={handleChange}/>
        <hr className='mt-5'/>
        <h2 className='text-xl font-bold'>Finales</h2>
        <label htmlFor="playoffs">PlayOffs:</label>
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

        <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="taskSecuence">
                    Tareas en secuencia
                  </label>
                  <div className="col-sm">
                    <input
                      type="checkBox"
                      name="taskSecuence"
                      checked={taskSecuence}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskSecuence: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="stopTime">
                    Detener tiempo última tarea
                  </label>
                  <div className="col-sm">
                    <input
                      type="checkBox"
                      name="stopTime"
                      checked={stopTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stopTime: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" htmlFor="bonusType">
                    Puntaje Bonus
                  </label>
                  <div className="col-sm-6">
                    <select
                      className="form-control"
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