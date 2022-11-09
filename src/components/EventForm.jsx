import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const EventForm = () => {

    const myData =  [
  { value: 'infantil', label: 'infantil' },
  { value: 'junior', label: 'junior' },
  { value: 'juvenil', label: 'juvenil' },
  { value: 'senior', label: 'senior' },
]

  return (
    <form className='w-10/12 mx-auto bg-gray-200 p-5 rounded-xl'>
        <div>
            <h1>Agregar Evento</h1>
        </div>
        <label htmlFor="name">Nombre del Evento*</label>
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
        <label htmlFor="url">Nombre corto(url)*</label>
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
                                    id="url"/>
        <label htmlFor="imageurl">URL Imagen</label>
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
                                    id="imageurl"/>
        <label htmlFor="year">Año</label>
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
                                    id="year"/>
        <label htmlFor="description">Descripcion</label>
        <textarea className='
                            mt-1
                            block 
                            form-input 
                            w-full 
                            rounded-md 
                            border-gray-300 
                            shadow-sm
                            focus:border-indigo-300 
                            focus:ring 
                            focus:ring-indigo-200 
                            focus:ring-opacity-50'
                            id="description"/>
        <div className='inline-block mt-1 w-1/2 pr-1'>
            <label htmlFor="teammax">Máximo de participantes por equipo</label>
            <input type="number" className='
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
                                    id="teammax"/>
        </div>
        <div className='inline-block mt-1 w-1/2 pl-1'>
            <label htmlFor="teammax">Máximo de participantes por equipo</label>
            <input type="number" className='
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
                                    id="teammax"/>
        </div>

        <label htmlFor="categories">Categorías</label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="categories"
                className='
                        mt-1'/>
        <label htmlFor="challenges">Retos</label>
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={myData}
                id="challenges"
                className='
                        mt-1'/>

    </form>
  )
}

export default EventForm