import React, { useState,useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc,getDoc,updateDoc } from 'firebase/firestore'
import GameMatch from '../components/GameMatch';

const firestore = getFirestore(app)

const Tournament = () => {
    const [challengeInfo,setChallengeInfo] = useState(null)
    const [display,setDisplay] = useState('matches')
    const [match,setMatch] = useState({})
    const [index,setIndex] = useState('')
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

    {challengeInfo && console.log(display)}
    
    const handleClick = (e) => {
        console.log(e.target.getAttribute("index"))
        setIndex(e.target.getAttribute("index"))
        setMatch(challengeInfo.matches[e.target.getAttribute("index")])
        console.log(challengeInfo.matches[e.target.getAttribute("index")])
        setDisplay('one')
    }
    const handleClick2 = () => {
        setDisplay('matches')
    }

    return (
    <Layout>
        <h2>Torneo...</h2>
        {(challengeInfo && display==='one') 
        &&  
        <div>
            <GameMatch match={match} position={index}/>                       
            <button className='
                                bgsec
                                text-white
                                rounded-md
                                px-1
                                ml-2'
                    onClick={handleClick2}>TERMINAR
            </button>
        </div> }


        {/* Partidos */}
        {(challengeInfo && display==='matches')
        ?
        <div>
        {challengeInfo.matches.map((teamMatch,index)=>{
            return <div key={`${teamMatch.teamA.id}${teamMatch.teamB.id}`}
                        className='flex justify-between ml-8 mr-8 mb-2'>
                        {teamMatch.teamA.teamName} vs {teamMatch.teamB.teamName} 
                        <button className='
                                            bgsec
                                            text-white
                                            rounded-md
                                            px-1
                                            ml-2
                                            '
                                onClick={handleClick}
                                index={
                                    index
                                }>Jugar
                        </button>
                </div>
        })}
    </div>
        :
        <p>prueba</p>
        } 
    </Layout>
    )
}

export default Tournament