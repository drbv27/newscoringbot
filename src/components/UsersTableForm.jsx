import React from 'react'
import { BsTrash } from 'react-icons/bs'

const UsersTableForm = ({taskArray,deleteTask}) => {
    /* console.log(taskArray) */
  return (
    <table className='mt-5 w-full mb-2'>
        <thead className='bg-sky-900 text-white mb-5 rounded-sm'>
            <tr className='rounded-sm'>
                <th>Tarea</th>
                <th>Puntos</th>
                <th>Penalidad</th>
                <th>acción</th>
            </tr>
        </thead>
        <tbody >
         {taskArray && taskArray.map((task,index)=>
         <tr key={index} className='pt-12'>
            <th className='pt-2'>{task.label}</th>
            <th className='pt-2'>{task.points}</th>
            <th className='pt-2'>{task.penalty}</th>
            <th>
              <button onClick={(e)=>deleteTask(e,index)}
                      className='
                                text-white
                                bg-red-600
                                p-1.5
                                rounded-md
                                '>
                <BsTrash />
              </button>
            </th>
        </tr>)}
        </tbody>

    </table>
  )
}

export default UsersTableForm