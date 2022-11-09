import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const ChallengeForm = () => {

    const myData =  [
  { value: 'user', label: 'Usuario' },
  { value: 'judge', label: 'Juez' },
  { value: 'admin', label: 'Administrador' },
]

  return (
    <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl'>
        <div className='mb-4'>
            <h1 className='text-4xl mb-2 font-bold text-blue-900'>Agregar Reto</h1>
            <hr className='text-black'/>
        </div>
        <label htmlFor="name">Nombres*</label>
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
                                    id="name"/>
        <label htmlFor="lastname">Apellidos*</label>
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
                                    id="lastname"/>
        <label htmlFor="email">Email</label>
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
                                    id="email"/>
        <label htmlFor="country">Pais</label>
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
                                    id="country"/>
        <label htmlFor="city">Ciudad</label>
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
                                    id="city"/>
        <label htmlFor="role">Rol</label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="role"
                className='
                        mt-1'/>
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

export default ChallengeForm