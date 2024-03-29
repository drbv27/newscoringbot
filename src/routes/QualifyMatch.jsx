import React, { useState,useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout';
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc,getDoc,updateDoc } from 'firebase/firestore'

const firestore = getFirestore(app)

const QualifyMatch = () => {

    const [challengeInfo,setChallengeInfo] = useState(null)
    const [challengeTeams,setChallengesTeams] = useState(null)
    const [pairMatches,setPairMatches] = useState(null)
    const [tournament, setTournament] = useState('ligue')
    const [seeMatches,setSeeMatches] = useState(false)

    const {eventId,matchId} = useParams()
    const navigate = useNavigate();

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
        if(challengeTeams  && (tournament==="ligue")){
            const parejas = shuffle(pairMatch(challengeTeams))
            setPairMatches(parejas)
            //console.log("uno")
          }
        if(challengeTeams  && (tournament==="elimination")){
            const parejas = aleatoryElimination(challengeTeams)
            setPairMatches(parejas)
            console.log("dos")
          }
    },[tournament])
    
    const pairMatch = (list)=> {
        let pairs = new Array((list.length * (list.length - 1)) / 2),
        pos = 0;
        for (let i = 0; i < list.length; i++) {
            for (let j = i + 1; j < list.length; j++) {
                pairs[pos++] = {teamA:list[i],pointsA:null,goalsA:null, teamB:list[j],pointsB:null,goalsB:null};
            }
        }
        return pairs;
    }

    function aleatoryElimination(arr){
        const randomList = shuffle(arr);
        //console.log(randomList);
        let pairList = [];
        for(let i = 0; i <= ((randomList.length-2)/2); i++){
            //pairList.push([randomList[i],randomList[randomList.length-i-1]]);
            pairList.push({teamA:randomList[i],pointsA:null,goalsA:null,teamB:randomList[randomList.length-i-1],pointsB:null,goalsB:null});
        }
        return pairList;
    }

    const doubleLigue = (list) => {
        let middle = Math.floor(list.length/2);
        let first = list.slice(0,middle);
        let last = list.slice(middle)
        console.log(pairMatch(first))
        console.log(pairMatch(last))
    }

    function shuffle(array) {
        let m = array.length,
          t, i;
        // While there remain elements to shuffle...
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      }

    const selTournament = async(e)=>{
        e.preventDefault()
        setSeeMatches(true)
        setTournament(e.target.value)
        console.log(e.target.value)
        if(tournament==="ligue" ||tournament==="elimination"){
            const obj = {
                stage:"scoring",
                tournament:tournament,
                matches:pairMatches
            }
            await updateDoc(doc(firestore,"eventchallenge",`${eventId}${matchId}`),obj)
            console.log(obj)
        }
 /*        await updateDoc(doc(firestore,"eventchallenge",`${eventId}${matchId}`),{
            stage:'scoring',
            tournament:'ligue',
            matches: pairMatches
        }) */
         //navigate('/activeevents/:eventId/match/:matchId/tournament') 
    }
    //console.log(tournament)

    const handleChange = (e)=>{
        //console.log(e.target.value)
        setTournament(e.target.value)
        
    }
    if(tournament==='double'){
        doubleLigue(challengeTeams)
    }

    //console.log(challengeTeams)
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
                    {challengeTeams && challengeTeams.map((team)=><li key={team.id}>{team.teamName}</li>)}
                </ul>
            </div>
            {(challengeInfo && challengeInfo.stage==='scoring')
            ?
            <div>
                <h3>El torneo está en curso</h3>
                <Link to={`/activeevents/${eventId}/match/${matchId}/tournament`}>Ir al torneo</Link>
            </div>
            :
            <div>
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
                        <option value="ligue">Liga</option>
                        <option value="playoff">Liga + Playoffs</option>
                        {(challengeTeams && challengeTeams.length%2 ===0) && <option value="double">Liga Doble</option> }
                        {(challengeTeams && challengeTeams.length%2 ===0) && <option value="elimligue">Eliminación + Liga</option> }
                        {(challengeTeams && (Math.log(challengeTeams.length)/Math.log(2))%1 ===0) && <option value="elimination">Eliminación</option> }
                    </select>
                    <input type="submit" value='Sortear'/>
                </form>
            </div>
            }
    </Layout>
    )
}

export default QualifyMatch