import React, {useState} from 'react'
import LateralBar from '../components/LateralBar'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import EdiCup from "../assets/img/EdiTrofeoHi.png"


const Home = () => {



  return (
    <>
      <Layout>
        <div>
          <h1 className='text-3xl'>Bienvenido</h1>
          <div className='flex ml-24 mt-2'><img src={EdiCup} alt="" className='w-9/12 ml-2'/></div>
        </div>
      </Layout>
  
    </>
  )
}

export default Home