import React from 'react'
import { Link, useParams } from 'react-router-dom'

const QualifyMatch = () => {

    const {eventId,matchId} = useParams()
    
    console.log(eventId)
    console.log(matchId)

  return (
    <div>
        <div>qualify</div>
        <div>
            <Link to={`/activeevents/${eventId}`}>atras</Link>
        </div>
    </div>
  )
}

export default QualifyMatch