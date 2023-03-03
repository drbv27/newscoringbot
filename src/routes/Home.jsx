import React, {useState} from 'react'
import Layout from '../components/Layout'
import EdiCup from "../assets/img/EdiTrofeoHi.png"


const Home = () => {



  return (
    <>
      <Layout>
        <div>
          <h1 className='text-3xl'>Bienvenido</h1>
          <div className='flex ml-24 mt-2'><img src={ EdiCup } alt="" className='w-6/12 ml-auto mr-auto'/></div>
        </div>
      </Layout>
  
    </>
  )
}

export default Home