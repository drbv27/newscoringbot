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
         {taskArray && taskArray.map((task)=><tr>
            <th>{task.label}</th>
            <th>{task.points}</th>
            <th>{task.penalty}</th>
                        </tr>)}
        </tbody>

    </table>
  )
}

export default TasksTableForm