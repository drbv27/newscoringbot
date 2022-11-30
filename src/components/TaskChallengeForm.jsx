import React from 'react'
import TasksTableForm from './TasksTableForm'

const TaskChallengeForm = () => {
  return (
    <>
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
                                    id="innings"/>
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
                                    id="inningsTop"/>
        <hr className='mt-5'/>
        <h2 className='text-xl font-bold'>Finales</h2>
        <label htmlFor="isPlayOff">PlayOffs:</label>
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
                                    id="isPlayOff"/>
        <label htmlFor="playOffsTeams">No. equipos finalistas:</label>
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
                                    id="playOffsTeams"/>
        <hr className='mt-5'/>
        <h2 className='text-xl font-bold'>Tareas</h2>
        <label htmlFor="maxTaskTime">Tiempo Maxímo (segundos):</label>
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
                                    id="maxTaskTime"/>
        <TasksTableForm/>
        
    </>
  )
}

export default TaskChallengeForm