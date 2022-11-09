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
            <li className='text-lg pt-4'><Link to='/events' className='menu'><SiProbot className='iconMenu'/>Eventos</Link></li>
            <li className='text-lg pt-4'><Link to='/challenges' className='menu'><MdOutlineEmojiEvents className='iconMenu'/>Retos</Link></li>
            <li className='text-lg pt-4'><Link to='/users' className='menu'><HiOutlineUser className='iconMenu'/>Usuarios</Link></li>
            <li className='text-lg pt-4'><Link to='/teams' className='menu'><HiOutlineUserGroup className='iconMenu'/>Equipos</Link></li>
            

        </ul>
    </div>
  )
}

export default LateralBar