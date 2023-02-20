import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { MdOutlineEmojiEvents } from 'react-icons/md'


const Events = () => {
  return (
    <Layout>
    <h1 
    className='text-3xl text-center font-bold text-blue-900'>
      EVENTOS
    </h1>
    <div className='mt-4 mb-4 ml-12 flex gap-4'>
      <h2 className='text-2xl'>Agregar evento:</h2>
      <Link to='/events/addevent' className='bg-blue-900 text-white p-2  rounded text-2xl'>
        <MdOutlineEmojiEvents />
      </Link>
    </div>
    
</Layout>
)
}

export default Events