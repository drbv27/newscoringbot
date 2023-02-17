import React from 'react'

const ChallengesList = ({challenges}) => {
  /* console.log(challenges) */
  return (
    <div>
      {challenges && challenges.map((challenge)=>{
        return(
          <p key={challenge.name}>{challenge.name}</p>
        )
      })}
    </div>
  )
}

export default ChallengesList