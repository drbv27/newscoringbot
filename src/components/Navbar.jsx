import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
/* import ThemeToggle from './ThemeToggle' */
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import PygmaLogo from "../assets/img/Logo-Pygmalion.png"
import { UserAuth } from '../context/AuthContext'
import useUsersDB from '../hooks/useUsersDB'
import TooltipP from "../components/TooltipP"
import { AiOutlineBarChart,AiOutlineFileDone,AiOutlineTeam } from 'react-icons/ai'
import app from "../firebase";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";
const firestore = getFirestore(app);




const Navbar = () => {
    

    const [nav,setNav] = useState(false)

    const {user,logout} = UserAuth()

    const navigate = useNavigate()

    const handleNav = ()=>{
        setNav(!nav)
    }



const handleLogout = async () => {
    try {
        await logout()
        navigate('/')
        console.log('You are logout');
        } catch (error) {
          console.log(error.message)
        }
      }


 const {userDetails,setuserDetails} = useUsersDB(user)

/* const {userDetails,setUserDetails} =useUsersDB(user) */
/* console.log(userDetails) */
  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold bg-appblue mt-1'>
        <Link to="/">
            <div>
            <h1 className='text-3xl'>ProductivityApp</h1>
            <div className='flex ml-24 mt-2'><p>By: </p><img src={PygmaLogo} alt="" className='w-24 ml-2'/></div>
            </div>
        </Link>
{/*         <div className='hidden md:block'>
            <ThemeToggle />
        </div> */}
        {!user ? 
            <div className='hidden md:block'>
                <Link to='/signin' className='p-4 hover:text-accent'>Ingresar</Link>
                <Link to='/signup'
                        className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'
                >Registrarse
                </Link>
            </div>
            :
            <div className='flex-row gap-10 hidden md:flex'>
                <div className='flex text-xl gap-2'>
                    <TooltipP tooltipText="Registro">
                    <div className='text-4xl'>
                        <Link to='/account'><AiOutlineFileDone/></Link>
                    </div>
                    </TooltipP>
                    <TooltipP tooltipText="Dashboard">
                    <div className='text-4xl'>
                        <Link to='/dash'><AiOutlineBarChart/></Link>
                    </div>
                    </TooltipP>
                    {userDetails && !userDetails.isAdmin
                    ?                    <TooltipP tooltipText="Usuarios">
                    <div className='text-4xl'>
                        <Link to='/usersP'><AiOutlineTeam/></Link>
                    </div>
                    </TooltipP>
                    :null
                    } 
{/*                     <TooltipP tooltipText="Theme">
                    <div className='text-xl'>
                        <ThemeToggle/>
                    </div>
                    </TooltipP> */}


                </div>
                <div className='flex flex-col items-center gap-2'>
                    <div>
                        <p>Welcome:   {userDetails && userDetails.name}   </p>              
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className='border px-6 py-1 rounded-2xl shadow-lg hover:shadow-2xl'
                            >Salir
                        </button>
                    </div>
                </div>
                
            </div>
    }



        {/*Menu Icon*/}
        <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
            {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        </div>

        {/*Mobile Menu */}
        <div className={
            nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10 ' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
        }
        
        >
            <ul className='w-full p-4 '>
                <li className='border-b py-6'>
                    <Link to='/account'>Registro</Link>
                </li>
                <li className='border-b py-6'>
                    <Link to='/dash'>DashBoard</Link>
                </li>
                {userDetails && !userDetails.isAdmin
                    ?
                    <li className='border-b py-6'>
                        <Link to='/usersP'>Usuarios</Link>
                    </li>
                    :null
                } 
{/*                 <li className='py-6'>
                    <ThemeToggle/>
                </li> */}
            </ul>
            <div className='flex flex-col w-full p-4 '>
                <button
                    onClick={handleLogout}
                    className='border px-6 py-1 rounded-2xl shadow-lg hover:shadow-2xl bg-button text-white'
                    >Salir
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar