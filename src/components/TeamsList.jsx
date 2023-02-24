import { FaUserEdit,FaRegTrashAlt } from 'react-icons/fa'
import { MdEventAvailable } from 'react-icons/md'
import { CgUnavailable } from 'react-icons/cg'

const TeamsList = ({ teamsArray }) => {

    console.log(teamsArray)

  return (
    <>
        {teamsArray.map((team)=>
                        <div key={team.id} className='flex flex-col border mt-2 mx-2 rounded-t-md'>
                            <div className='bgoscurostem text-white font-bold rounded-t-md flex justify-between px-4'>
                                <div>{team.teamName}</div>
                                <div>{team.institution}</div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='pl-4'>{team.members.map((member)=>
                                    <p className='text-sm'>{member.memberName}</p>)}
                                </div>
                                <div className='mt-1'>
                                    <button><FaUserEdit className='bgnaranjastem p-1 text-3xl text-white rounded border border-amber-700 mr-1'/></button>
                                    <button><FaRegTrashAlt className='bgrojostem p-1 text-3xl text-white rounded border border-red-700'/></button>
                                </div>
                            </div>
                        </div>
        )}
    </>
  )
}

export default TeamsList