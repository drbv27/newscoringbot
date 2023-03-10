import React,{useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const GameMatch = (match,position) => {
    const [goalsA,setGoalsA] = useState(0);
    const [goalsB,setGoalsB] = useState(0);

    const handleGoalsA = ()=>{
        setGoalsA(goalsA+1)
    }
    const handleGoalsB = ()=>{
        setGoalsB(goalsB+1)
    }
    const cancelGoalsA = ()=>{
        setGoalsA(goalsA-1)
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

    const confirmation = () =>{
        MySwal.fire({
            title: <p>Hello World</p>,
            didOpen: () => {
              // `MySwal` is a subclass of `Swal` with all the same instance & static methods
              MySwal.showLoading()
            },
          }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
          })
    }

    console.log(match,position)
    console.log(match.match)
  return (
    <div className='flex flex-col items-center gap-x-11'>
        <div className='flex gap-11'>
            <div className='text-center'>
                <h3 className='text-9xl'>{goalsA}</h3>
                <h4>{match.match.teamA.teamName}</h4>
                <div>
                    <button className='bgsec text-2xl px-2 rounded font-bold text-white'
                            onClick={handleGoalsA}>+</button>
                    <button className='bgrojostem text-2xl px-2 rounded font-bold text-white'
                            onClick={cancelGoalsA}>-</button>
                </div>
            </div>
            <div className='text-center'>
                <h3 className='text-9xl'>{goalsB}</h3>
                <h4>{match.match.teamB.teamName}</h4>
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