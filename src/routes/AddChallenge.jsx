import React from 'react'
import {Link} from 'react-router-dom'
import ChallengeForm from '../components/ChallengeForm'
import Layout from '../components/Layout'

const AddChallenge = () => {
  return (
    <Layout>
        <div className='py-4'>
            <Link to="/challenges" className='bg-blue-900 text-white p-2 mt-8 ml-24 rounded'>Atrás</Link>
        </div>
        <ChallengeForm/>
    </Layout>
  )
}

export default AddChallenge