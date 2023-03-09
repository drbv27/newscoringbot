import React from 'react'

const GameMatch = (match,position) => {
    console.log(match,position)
    console.log(match.match)
  return (
    <div className='flex flex-col items-center gap-x-11'>
        <div className='flex gap-11'>
            <div className='text-center'>
                <h3 className='text-9xl'>0</h3>
                <h4>{match.match.teamA.teamName}</h4>
                <div>
                    <button className='bgsec text-2xl px-2 rounded font-bold text-white'>+</button>
                    <button className='bgrojostem text-2xl px-2 rounded font-bold text-white'>-</button>
                </div>
            </div>
            <div className='text-center'>
                <h3 className='text-9xl'>0</h3>
                <h4>{match.match.teamB.teamName}</h4>
                <div>
                    <button className='bgsec text-2xl px-2 rounded font-bold text-white'>+</button>
                    <button className='bgrojostem text-2xl px-2 rounded font-bold text-white'>-</button>
                </div>
            </div>
        </div>
        <div>00:00</div>
    </div>
  )
}

export default GameMatch