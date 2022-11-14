import React,{useState,useEffect} from 'react'
import { UserAuth } from '../context/AuthContext';
import app from '../firebase';
import { getFirestore,updateDoc,doc,getDoc,setDoc } from 'firebase/firestore'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const firestore = getFirestore(app)

const UserForm = ({usersArray,setUsersArray}) => {


  const [rolValue,setRolValue] = useState("user")
  const { createUser } = UserAuth()
  const handleChange = (value) =>{
    setRolValue(value.value)
  }

  async function addUsers(e){
    e.preventDefault();
    const userName = e.target.userFormName.value;
    const userLastname = e.target.userFormLastname.value;
    const userEmail = e.target.userFormEmail.value;
    const userCountry = e.target.userFormCountry.value;
    const userCity = e.target.userFormCity.value;
    const password = e.target.userPassword.value;
    const userRole = e.target.userFormRole.value;

    createUser(userEmail,password)



      //crear referencia al documento del usuario
      const docuRef = doc(firestore, `usersArray/${userEmail}`);
      //buscar usuario
      const queryUser = await getDoc(docuRef);
      //reviso si existe el usuario
      if(queryUser.exists()){
        //si existe
        console.log("Ya existe el usuario");
      }else{
        //si no existe
        await setDoc(docuRef,{
                              name:userName,
                              lastname:userLastname,
                              institute:"pygmalion",
                              email:userEmail,
                              country:userCountry,
                              city:userCity,
                              role:userRole,
                              password:password,
                              phone:"564321",
                              })
              }

  }

    const myData =  [
  { value: 'user', label: 'Usuario' },
  { value: 'judge', label: 'Juez' },
  { value: 'admin', label: 'Administrador' },
]
 const roles = ["user","judge","admin"]


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
        <div className='my-2 w-full relative rounded-2xl shadow-xl'>
          <input 
                list="roles" 
                name="roles" 
                id="userFormRole" 
                className='w-full p-2 bg-primary border border-input rounded-2xl' 
                placeholder='Selecciona Rol' 
          />
          <datalist id="roles">
                {roles.map((rol,index) => (
                  <option key={index}>{rol}</option>
                ))}
          </datalist>
            </div>
        <div className='inline-block mt-1 w-1/2 pr-1'>
            <label htmlFor="userPassword">Contraseña*</label>
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
                                    id="userPassword"/>
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


        <div className='inline-block mt-3 w-1/2 pl-1'>
            <button type="submit" className='bg-blue-900 p-2 text-white rounded mr-2'>Guardar</button>
            <button type="reset" className='border border-blue-900 p-2 text-blue-900 rounded'>Cancelar</button>
        </div>

    </form>
  )
}

export default UserForm