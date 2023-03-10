import React,{useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const GameMatch = ({match,goalsA,position,setGoalsA,info,goalsB,setGoalsB,setPointsA,setPointsB}) => {

    const handlePoints = () =>{
        if(goalsA>goalsB){
            setPointsA(3)
            setPointsB(0)
            console.log('mayor')
        }if(goalsA<goalsB){
            setPointsA(0)
            setPointsB(3)
            console.log('menor')
        }if(goalsA===goalsB){
            setPointsA(1)
            setPointsB(1)
            console.log('igual')
        }
    }

    const handleGoalsA = ()=>{
        setGoalsA(goalsA+1)
        handlePoints()

    }
    const handleGoalsB = ()=>{
        setGoalsB(goalsB+1)
        handlePoints()
    }

    const cancelGoalsA = ()=>{
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                            MySwal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setGoalsA(goalsA-1)
                            handlePoints()
                            } else if (
                            /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                MySwal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                            }           
                        })
            }

    const cancelGoalsB = ()=>{
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                            MySwal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setGoalsB(goalsB-1)
                            handlePoints()
                            } else if (
                            /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                MySwal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                            }           
                        })
            }

    console.log(match.teamA)
  return (
    <div className='flex flex-col items-center gap-x-11'>
        <div className='flex gap-11'>
            <div className='text-center'>
                <h3 className='text-9xl'>{goalsA}</h3>
                <h4>{match.teamA.teamName}</h4>
                <div>
                    <button className='bgsec text-2xl px-2 rounded font-bold text-white'
                            onClick={handleGoalsA}>+</button>
                    <button className='bgrojostem text-2xl px-2 rounded font-bold text-white'
                            onClick={cancelGoalsA}>-</button>
                </div>
            </div>
            <div className='text-center'>
                <h3 className='text-9xl'>{goalsB}</h3>
                <h4>{match.teamB.teamName}</h4>
                <div>
                    <button className='bgsec text-2xl px-2 rounded font-bold text-white'
                            onClick={handleGoalsB}>+</button>
                    <button className='bgrojostem text-2xl px-2 rounded font-bold text-white'
                            onClick={cancelGoalsB}>-</button>
                </div>
            </div>
        </div>
        <div>00:00</div>
    </div>
  )
}

export default GameMatch