import React from 'react'
import { Link } from 'react-router-dom'
import ChallengesList from '../components/ChallengesList'
import Layout from '../components/Layout'

const Challenges = () => {
  return (
        <Layout>
        <h1 
        className='text-3xl text-center font-bold text-blue-900'>
          RETOS
        </h1>
        <div className='mt-4 mb-4 ml-12'>
          <Link to='/challenges/addchallenge' className='bg-blue-900 text-white p-2  rounded'>
            Agregar Reto
          </Link>
        </div>
        <ChallengesList/>
    </Layout>
  )
}

export default Challenges