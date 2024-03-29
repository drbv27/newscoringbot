import React from 'react'
import './LateralBar.css'
import '../App.css'
import { Link } from 'react-router-dom'
import { MdOutlineEmojiEvents,MdScore,MdOutlineScore } from 'react-icons/md'
import { SiProbot } from 'react-icons/si'
import { GiPodium } from 'react-icons/gi'
import { BsUiChecks } from 'react-icons/bs'
import { HiOutlineUser,HiOutlineUserGroup } from 'react-icons/hi'

const LateralBar = () => {
  return (
    <div id="bar">
      <p>Crear:</p>
      <ul className='pb-4'>
          <li className='text-sm lg:text-lg pt-4 flex'>
            <Link to='/events' className='menu'>
              <SiProbot className='iconMenu text-4xl md:text-xl'/>
            </Link>
            <Link to='/events' className='menu invisible md:visible'>
              Eventos
            </Link>
          </li>
          <li className='text-sm lg:text-lg pt-4 flex'>
            <Link to='/challenges' className='menu'>
              <MdOutlineEmojiEvents className='iconMenu text-4xl md:text-xl'/>
            </Link>
            <Link to='/challenges' className='menu invisible md:visible'>
              Retos
            </Link>
          </li>
          <li className='text-sm lg:text-lg pt-4 flex'>
            <Link to='/users' className='menu'>
              <HiOutlineUser className='iconMenu text-4xl md:text-xl'/>
            </Link>
            <Link to='/users' className='menu invisible md:visible'>
              Usuarios
            </Link>
          </li>
          <li className='text-sm lg:text-lg pt-4 flex'>
            <Link to='/teams' className='menu'>
              <HiOutlineUserGroup className='iconMenu text-4xl md:text-xl'/>
            </Link>
            <Link to='/teams' className='menu invisible md:visible'>
              Equipos
            </Link>
          </li>
      </ul>
      <hr className='border-sky-500 mx-1 border-dotted'/>
      <p className='mt-4'>Calificar:</p>
      <ul>
        <li className='text-sm lg:text-lg pt-4 flex'>
          <Link to='/activeevents' className='menu'>
            <BsUiChecks className='iconMenu text-4xl md:text-xl'/>
          </Link>
          <Link to='/activeevents' className='menu invisible md:visible'>
              Eventos
          </Link>
          </li>
      </ul>
      <hr className='border-sky-500 mx-1 border-dotted'/>
      <p className='mt-4'>Posición:</p>
      <ul>
        <li className='text-sm lg:text-lg pt-4 flex'>
          <Link to='/scores' className='menu'>
            <GiPodium className='iconMenu text-4xl md:text-xl'/>
          </Link>
          <Link to='/scores' className='menu invisible md:visible'>
              Puntajes
          </Link>
          </li>
      </ul>
    </div>
  )
}

export default LateralBar