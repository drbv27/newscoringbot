import { FaUserEdit,FaRegTrashAlt } from 'react-icons/fa'
import { MdEventAvailable } from 'react-icons/md'
import { CgUnavailable } from 'react-icons/cg'

const EventsList = ({eventsArray}) => {

  return (
    <div className='mr-1.5 border-4 rounded-t-lg'>
        <div className='columns-4 bg-sky-800 py-4 text-xl text-white text-center rounded-t-lg'>
            <p>Nombre</p>
            <p>Año</p>
            <p>Estado</p>
            <p>Acciones</p>
        </div>
        {eventsArray.map((event)=>{
            return(
                <>
                    <div className='columns-4 text-center mt-3' key={event.id}>
                        <p>{event.eventName}</p>
                        <p>{event.eventYear}</p>
                        <p>{event.available 
                            ? <MdEventAvailable className='mx-auto text-2xl text-green-600'/> 
                            : <CgUnavailable className='mx-auto text-2xl text-red-600'/> }
                        </p>
                        <div>
                            <button><FaUserEdit className='bg-amber-500 p-1 text-3xl text-white rounded border border-amber-800 mr-1'/></button>
                            <button><FaRegTrashAlt className='bg-red-600 p-1 text-3xl text-white rounded border border-red-800'/></button>
                        </div>
                    </div>
                    <hr />
                </>
            )
        })}
    </div>
  )
}

export default EventsList