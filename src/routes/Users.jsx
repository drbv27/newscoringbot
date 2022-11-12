import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import UsersList from '../components/UsersList'

const Users = () => {


  return (
    <Layout>
        <h1 
        className='text-3xl text-center font-bold text-blue-900'>
          USUARIOS
        </h1>
        <div className='mt-4 mb-4 ml-12'>
          <Link to='/users/adduser' className='bg-blue-900 text-white p-2  rounded'>
            Agregar Usuario
          </Link>
        </div>
        <UsersList />
    </Layout>
  )
}

export default Users