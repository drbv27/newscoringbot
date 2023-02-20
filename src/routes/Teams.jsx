import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'


const Teams = () => {
  return (
    <Layout>
    <h1 
    className='text-3xl text-center font-bold text-blue-900'>
      EQUIPOS
    </h1>
    <div className='mt-4 mb-4 ml-12 flex gap-4'>
      <h2 className='text-2xl'>Agregar equipo:</h2>
      <Link to='/teams/addteams' className='bg-blue-900 text-white p-2  rounded text-2xl'>
        <AiOutlineUsergroupAdd />
      </Link>
    </div>
    
</Layout>
)
}

export default Teams