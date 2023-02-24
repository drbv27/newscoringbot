import React from 'react'
import '../App.css'
import Navbar from './Navbar'
import LateralBar from './LateralBar'

const Layout = (props) => {
  return (
    <>
        <LateralBar/>
        <Navbar/>
        <div className='principal'>{props.children}</div>
    </>
  )
}

export default Layout