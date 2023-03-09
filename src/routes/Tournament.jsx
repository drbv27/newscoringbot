import React, { useState,useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc,getDoc,updateDoc } from 'firebase/firestore'

const firestore = getFirestore(app)

const Tournament = () => {
    const [challengeInfo,setChallengeInfo] = useState(null)
    const {eventId,matchId} = useParams()

    useEffect(()=>{
        const fetchTeams = async () => {
            try{
                const docRef = doc(firestore,'eventchallenge',`${eventId}${matchId}`)
                const docSnap = await getDoc(docRef)
    
                if (docSnap.exists()) {
                    /* console.log("Document data:", docSnap.data()); */
                    setChallengeInfo(docSnap.data())
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    fetchTeams();//ojo con esto Diego
                  }
            }catch (error){
                console.log(error)
            }
        }
        fetchTeams()
    },[])

    {challengeInfo && console.log(challengeInfo)}



  return (
    <Layout>
        <h2>Torneo...</h2>
        {challengeInfo 
        &&
        <div>
            {challengeInfo.matches.map((team)=>{
                return <div key={`${team.teamA.id}${team.teamB.id}`}
                            className='flex justify-between ml-8 mr-8 mb-2'>
                            {team.teamA.teamName} vs {team.teamB.teamName} 
                            <button className='
                                                bgsec
                                                text-white
                                                rounded-md
                                                px-1
                                                ml-2
                                                '>
                                Jugar
                            </button>
                    </div>
            })}
        </div>
        }
    </Layout>
  )
}

export default Tournament