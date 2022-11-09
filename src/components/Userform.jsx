import React,{useState,useEffect} from 'react'
import { UserAuth } from '../context/AuthContext';
import app from '../firebase';
import { getFirestore,updateDoc,doc } from 'firebase/firestore'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const firestore = getFirestore(app)

const UserForm = () => {

  const [value,setValue] = useState("user")

  async function addUsers(e){
    e.preventDefault();
    const userName = e.target.userFormName.value;
    const userLastname = e.target.userFormLastname.value;
    const userEmail = e.target.userFormEmail.value;
    const userCountry = e.target.userFormCountry.value;
    const userCity = e.target.userFormCity.value;
    /* const userRole = e.target.userFormRole.value; */
    const newUser = {
      name:userName,
      lastname:userLastname,
      email:userEmail,
      country:userCountry,
      city:userCity,
      role:value

    }
    console.log(newUser);
  }

    const myData =  [
  { value: 'user', label: 'Usuario' },
  { value: 'judge', label: 'Juez' },
  { value: 'admin', label: 'Administrador' },
]

const handleChange = (value) =>{
  setValue(value)
}
  return (
    <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl' onSubmit={addUsers}>
        <div className='mb-4'>
            <h1 className='text-4xl mb-2 font-bold text-blue-900'>Agregar Usuario</h1>
            <hr className='text-black'/>
        </div>
        <label htmlFor="userFormName">Nombres*</label>
        <input type="text" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="userFormName"/>
        <label htmlFor="userFormLastname">Apellidos*</label>
        <input type="text" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="userFormLastname"/>
        <label htmlFor="userFormEmail">Email</label>
        <input type="email" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="userFormEmail"/>
        <label htmlFor="userFormCountry">Pais</label>
        <input type="text" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="userFormCountry"/>
        <label htmlFor="userFormCity">Ciudad</label>
        <input type="text" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="userFormCity"/>
        <label htmlFor="userFormRole">Rol</label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="userFormRole"
                value={value}
                onChange={handleChange}
                className='mt-1'/>
        <div className='inline-block mt-1 w-1/2 pr-1'>
            <label htmlFor="passWord">Contraseña*</label>
            <input type="password" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="passWord"/>
        </div>
        <div className='inline-block mt-1 w-1/2 pl-1'>
            <label htmlFor="PassConfirm">Confirmar Contraseña*</label>
            <input type="password" className='
                                    mt-1
                                    form-input 
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-gray-300 
                                    shadow-sm
                                    focus:border-indigo-300 
                                    focus:ring 
                                    focus:ring-indigo-200 
                                    focus:ring-opacity-50'
                                    id="PassConfirm"/>
        </div>


        <label htmlFor="challenges">Retos</label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="challenges"
                className='
                        mt-1'/>

        <div className='inline-block mt-3 w-1/2 pl-1'>
            <button type="submit" className='bg-blue-900 p-2 text-white rounded mr-2'>Guardar</button>
            <button type="reset" className='border border-blue-900 p-2 text-blue-900 rounded'>Cancelar</button>
        </div>

    </form>
  )
}

export default UserForm