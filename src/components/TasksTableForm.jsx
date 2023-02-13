import React from 'react'

const TasksTableForm = ({taskArray}) => {
    console.log(taskArray)
  return (
    <table className='mt-5 w-full'>
        <thead className='bg-black text-white mb-5'>
            <tr>
                <th>Tarea</th>
                <th>Puntos</th>
                <th>Penalidad</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
         {taskArray.map((task)=><tr>
            <th>{task.tarea}</th>
            <th>{task.puntos}</th>
            <th>{task.penalidad}</th>
                        </tr>)}
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <input type="text" className='mt-5'/>
                </td>
                <td>
                    <input type="text" className='mt-5'/>
                </td>
                <td>
                    <input type="text" className='mt-5'/>
                </td>
                <td>
                    <button>Añadir</button>
                </td>
            </tr>
        </tfoot>
    </table>
  )
}

export default TasksTableForm