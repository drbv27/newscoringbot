import React from 'react'
import './LateralBar.css'
import { Link } from 'react-router-dom'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import { SiProbot } from 'react-icons/si'
import { HiOutlineUser,HiOutlineUserGroup } from 'react-icons/hi'

const LateralBar = () => {
  return (
    <div id="bar">
        <ul>
            <li className='text-lg pt-4 flex'>
              <Link to='/events' className='menu'>
                <SiProbot className='iconMenu text-4xl sm:text-xl'/>
              </Link>
              <Link to='/events' className='menu invisible sm:visible'>
                Eventos
              </Link>
            </li>
            <li className='text-lg pt-4 flex'>
              <Link to='/challenges' className='menu'>
                <MdOutlineEmojiEvents className='iconMenu text-4xl sm:text-xl'/>
              </Link>
              <Link to='/challenges' className='menu invisible sm:visible'>
                Retos
              </Link>
            </li>
            <li className='text-lg pt-4 flex'>
              <Link to='/users' className='menu'>
                <HiOutlineUser className='iconMenu text-4xl sm:text-xl'/>
              </Link>
              <Link to='/users' className='menu invisible sm:visible'>
                Usuarios
              </Link>
            </li>
            <li className='text-lg pt-4 flex'>
              <Link to='/teams' className='menu'>
                <HiOutlineUserGroup className='iconMenu text-4xl sm:text-xl'/>
              </Link>
              <Link to='/teams' className='menu invisible sm:visible'>
                Equipos
              </Link>
            </li>
            

        </ul>
    </div>
  )
}

export default LateralBar