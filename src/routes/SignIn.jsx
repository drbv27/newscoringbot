import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Eddie from '../assets/img/2.png'
import Logo from '../assets/img/Logo-Pygmalion.png'

const SignIn = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const {signIn} = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email,password)
      navigate('/home')
    } catch (e) {
      setError(e.message);
      console.log(e.message)
    }

  }

  return (
   
    <div className='flex-none md:flex items-center gap-10'>
        <div>
            <img src={Eddie} alt="" className='hidden md:block w-72 mb-1'/>
             <img src={Logo} alt="" className='w-72'/>
        </div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Ingreso</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='email'
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Contraseña</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='password'
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
            Ingresar
          </button>
        </form>
        <p className='my-4'>
          No tienes cuenta?{' '}
          <Link to='/signup' className='text-accent'>
            Registrar
          </Link>
        </p>
      </div>
    </div>

  )
}

export default SignIn