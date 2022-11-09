import React from 'react'
import Layout from '../components/Layout'
import UserForm from '../components/Userform'
import {Link} from 'react-router-dom'

const AddUser = () => {
  return (
    <Layout>
        <div className='py-4'>
            <Link to="/users" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
        </div>
        <UserForm/>
    </Layout>
  )
}

export default AddUser