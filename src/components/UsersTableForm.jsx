import React from 'react'
import { BsTrash } from 'react-icons/bs'

const UsersTableForm = ({membersArray,deleteMember}) => {
    /* console.log(taskArray) */
  return (
    <div>
     {membersArray && membersArray.map((member,index)=>
      <div key={index} className='flex border border-slate-400 rounded-md mb-1 bg-white'>
        <div className='w-1/5 bg-sky-800 text-white font-bold py-1 rounded-l-md'>
          <h3 className='ml-1.5'>Nombre:</h3>
          <h3 className='ml-1.5'>Edad:</h3>
          <h3 className='ml-1.5'>Id:</h3>
          <h3 className='ml-1.5'>Genero:</h3>
        </div>
        <div className='w-3/5 pl-2 py-1'>
          <p>{member.memberName}</p>
          <p>{member.age}</p>
          <p>{member.memberId}</p>
          <p>{member.gender}</p>
        </div>
        <div className='w-1/5 align-text-bottom'>
          <button onClick={(e)=>deleteMember(e,index)}
                        className='
                                  text-white
                                  text-2xl
                                  bg-red-500
                                  p-1.5
                                  rounded-md
                                  mt-9
                                  ml-9
                                  '>
                  <BsTrash />
                </button>
        </div>
      </div>)}
{/*       <table className='mt-5 w-full mb-2'>
          <thead className='bg-sky-900 text-white mb-5 rounded-sm'>
              <tr className='rounded-sm'>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Documento</th>
                  <th>Genero</th>
                  <th>acción</th>
              </tr>
          </thead>
          <tbody >
          {membersArray && membersArray.map((member,index)=>
          <tr key={index} className='pt-12'>
              <th className='pt-2'>{member.memberName}</th>
              <th className='pt-2'>{member.age}</th>
              <th className='pt-2'>{member.memberId}</th>
              <th className='pt-2'>{member.gender}</th>
              <th>
                <button onClick={(e)=>deleteMember(e,index)}
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
      </table> */}
    </div>
  )
}

export default UsersTableForm