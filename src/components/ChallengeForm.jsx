import React,{useState} from 'react'
import Select from 'react-select'
import ToggleSwitch from './ToggleSwitch'
import makeAnimated from 'react-select/animated';
import MatchChallengeForm from './MatchChallengeForm';
import TaskChallengeForm from './TaskChallengeForm';
const animatedComponents = makeAnimated();

const ChallengeForm = () => {
  const [challType,setChallType] = useState("none")
  const challengeTypes = ["tareas","partido"]
  const myData =  [
  { value: 'child', label: 'Infantil' },
  { value: 'junior', label: 'Junior' },
  { value: 'youth', label: 'Juvenil' },
  { value: 'senior', label: 'Senior' },
]


async function addChallenge(e){
  e.preventDefault();
  const challengeType = e.target.userChallengeType.value
  console.log(challengeType)
}
console.log(challType);

  return (
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
                                    id="name"/>
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
                                    id="challengeSlug"/>
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
                                    id="urlImage"/>
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
                                    id="description"/>

        <label htmlFor="categorias">Categorias (*): </label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="categorias"
                className='
                        mt-1'/>

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
                                    id="maxTeams"/>

        <label htmlFor="userFormRole">Tipo de reto: </label>
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
          </div>
          {challType === "partido" && <MatchChallengeForm/>}
          {challType === "tareas" && <TaskChallengeForm/>}
          {(challType !== "tareas"&& challType !== "partido")  && <div>selecciona</div>}
       



        <div className='inline-block mt-3 w-1/2 pl-1'>
            <button type="submit" className='bg-blue-900 p-2 text-white rounded mr-2'>Guardar</button>
            <button type="reset" className='border border-blue-900 p-2 text-blue-900 rounded'>Cancelar</button>
        </div>

    </form>
  )
}

export default ChallengeForm