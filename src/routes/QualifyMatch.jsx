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
    const [tournament, setTournament] = useState('ligue')

    const {eventId,matchId} = useParams()
    
/*     console.log(eventId)
    console.log(matchId) */

    useEffect(()=>{
        const fetchTeams = async () => {
            try{
                const docRef = doc(firestore,'eventchallenge',`${eventId}${matchId}`)
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
/*     if(pairMatches){
        pairMatches.map((pair)=>console.log(pair[0],"vs",pair[1]))
    } */
    
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

    //console.log(challengeInfo)

/*    if(challengeTeams){
       const parejas=  pairMatch(challengeTeams.teams)
       console.log(parejas)
       setPairMatches(parejas)
    }   */

    if(challengeTeams){
        console.log(challengeTeams)
    }

    const selTournament = (e)=>{
        e.preventDefault()
        
        console.log('enviando',tournament)
    }


    const handleChange = (e)=>{
        console.log(e.target.value)
        setTournament(e.target.value)
        
    }

  return (
    <Layout>
        <div>qualify</div>
        <div>
            <Link to={`/activeevents/${eventId}`}>atras</Link>
        </div>
        <div>
            {challengeTeams && <p>{challengeTeams.length} equipos inscritos</p>}
        </div>
        <div>
            <ul>
                {challengeTeams && challengeTeams.map((team)=><li>{team.teamName}</li>)}
            </ul>
        </div>
            <h3 className='text-center'>Selecciona el tipo de torneo</h3>
            <form onSubmit={selTournament} className='text-center'>
                <select
                  className="mt-1
                            ml-auto
                            mr-auto
                            form-input
                            block
                            w-1/2
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300 
                            focus:ring 
                            focus:ring-indigo-200 
                            focus:ring-opacity-50"
                  name="tournament"
                  id="tournament"
                  value={tournament}
                  onChange={handleChange}
                >
                    <option value="ligue">liga</option>
                    <option value="playoff">Liga + Playoffs</option>
                    <option value="double">Liga Doble</option>
                    <option value="elimination">Eliminación</option>
                    <option value="elimligue">Eliminación + Liga</option>
                </select>
                <input type="submit" value='Sortear'/>
            </form>
        <div>
            {pairMatches
            && <div>{pairMatches.map((pair)=>{
                return(<p>{`${pair[0].teamName} vs ${pair[1].teamName}`}</p>)
            })}</div>
            }
        </div>
    </Layout>
  )
}

export default QualifyMatch