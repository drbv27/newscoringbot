import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import app from '../firebase';
import { doc,getDoc,getFirestore } from 'firebase/firestore'
import Layout from '../components/Layout'

const firestore = getFirestore(app)

const QualifyMatch = () => {

    const [challengeInfo,setChallengeInfo] = useState(null)
    const [challengeTeams,setChallengesTeams] = useState(null)
    const [pairMatches,setPairMatches] = useState(null)

    const {eventId,matchId} = useParams()
    
/*     console.log(eventId)
    console.log(matchId) */

    useEffect(()=>{
        const fetchTeams = async () => {
            try{
                const docRef = doc(firestore,'qualify',`${eventId}${matchId}`)
                const docSnap = await getDoc(docRef)
    
                if (docSnap.exists()) {
/*                     console.log("Document data:", docSnap.data()); */
                    setChallengeInfo(docSnap.data())
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
            }catch (error){
                console.log(error)
            }
        }
        fetchTeams()
    },[])

    useEffect(() => {
      try{
        if(challengeInfo){
            setChallengesTeams(challengeInfo.teams)
        }
      }catch{
        console.log("error")
      }

    }, [challengeInfo])

    useEffect(()=>{
        if(challengeTeams){
            const parejas = pairMatch(challengeTeams)
            setPairMatches(parejas)
          }
    },[challengeTeams])

/*     console.log(challengeInfo)
    console.log(challengeTeams) */
    if(pairMatches){
        pairMatches.map((pair)=>console.log(pair[0],"vs",pair[1]))
    }
    
    const pairMatch = (list)=> {
        let pairs = new Array((list.length * (list.length - 1)) / 2),
        pos = 0;
        for (let i = 0; i < list.length; i++) {
            for (let j = i + 1; j < list.length; j++) {
                pairs[pos++] = [list[i], list[j]];
            }
        }
        return pairs;
    }

/*    if(challengeTeams){
       const parejas=  pairMatch(challengeTeams.teams)
       console.log(parejas)
       setPairMatches(parejas)
    }   */


  return (
    <Layout>
        <div>qualify</div>
        <div>
            <Link to={`/activeevents/${eventId}`}>atras</Link>
        </div>
        <div>
            {challengeTeams ? <p>existen</p>:<p>no existen</p>}
        </div>
        <div>
            {pairMatches
            && <div>{pairMatches.map((pair)=>{
                return(<p>{`${pair[0]} vs ${pair[1]}`}</p>)
            })}</div>
            /* :<p>no falla</p> */}
        </div>
    </Layout>
  )
}

export default QualifyMatch