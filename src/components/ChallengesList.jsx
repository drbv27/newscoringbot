import { FaUserEdit,FaRegTrashAlt } from 'react-icons/fa'
import { MdEventAvailable } from 'react-icons/md'
import { CgUnavailable } from 'react-icons/cg'
import { GiAutoRepair,GiSoccerBall } from 'react-icons/gi'

const ChallengesList = ({challengesArray}) => {
  return (
    <div className='mr-1.5 border-4 rounded-t-lg rounded-b-sm'>
        <div className='columns-4 bgoscurostem py-4 text-xl text-white text-center rounded-t-lg'>
            <p>Nombre</p>
            <p>Tipo</p>
            <p>Estado</p>
            <p>Acción</p>
        </div>
        {challengesArray.map((challenge)=>{
          return(
            <div key={challenge.id}>
                <div className='columns-4 text-center mt-3'>
                    <p>{challenge.name}</p>
                    <p>{challenge.challengeType ==="tasks" 
                        ? <GiAutoRepair className='mx-auto text-3xl txtoscurostem'/> 
                        : <GiSoccerBall className='mx-auto text-3xl txtoscurostem'/>}</p>
                    <p>{challenge.available 
                        ? <MdEventAvailable className='mx-auto text-3xl txtsec'/> 
                        : <CgUnavailable className='mx-auto text-3xl txtrojostem'/> }
                    </p>
                    <div>
                        <button><FaUserEdit className='bgnaranjastem p-1 text-3xl text-white rounded border border-amber-700 mr-1'/></button>
                        <button><FaRegTrashAlt className='bgrojostem p-1 text-3xl text-white rounded border border-red-700'/></button>
                    </div>
                </div>
                <hr />
            </div>
          )
        })}
    </div>
  )
}

export default ChallengesList