import React,{useState,useEffect} from 'react'
import { collection, getDocs,getFirestore } from "firebase/firestore";
import Layout from '../components/Layout'
import app from '../firebase';

const firestore = getFirestore(app)

const Scores = () => {
    const [scores,setScores] = useState([])

useEffect(()=>{
    const fetchEventChall = async () => {
        /* try{ */
            const querySnapshot = await getDocs(collection(firestore, "eventchallenge"));
            let scoresArray = []
/*             if (querySnapshot){
                setScores(querySnapshot.data())
            }else{
                console.log("no se pudo")
            }
        }catch(error){
            console.log(error)
        } */
           
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                scoresArray = [...scoresArray,doc.data()]
                /* console.log(doc.id, " => ", doc.data()); */
                setScores(scoresArray)
            });
            console.log(scores[0].matches.matches)
            
/*             const docRef = doc(firestore,'events',`${eventId}`)
            const docSnap = await getDoc(docRef) */
    }
    fetchEventChall()
},[])

const puntos = function(partidos,equipo){
    const puntos=partidos.filter((partido)=> partido.teamA.teamName===equipo || partido.teamB.teamName===equipo).map((partido)=>{
        if(partido.teamA.teamName===equipo){
            return partido.pointsA
        }
        return partido.pointsB
    }).reduce((prev,next)=>prev+next)

    const golesFavor=partidos.filter((partido)=> partido.teamA.teamName===equipo||partido.teamB.teamName===equipo).map((partido)=>{
        if(partido.teamA.teamName===equipo){
            return partido.goalsA
        }
        return partido.goalsB
    }).reduce((prev,next)=>prev+next)

    const golesContra=partidos.filter((partido)=> partido.teamA.teamName===equipo||partido.teamB.teamName===equipo).map((partido)=>{
        if(partido.teamA.teamName===equipo){
            return partido.goalsB
        }
        return partido.goalsA
    }).reduce((prev,next)=>prev+next)

    return {team:equipo,
            points:puntos,
            gf:golesFavor,
            gc:golesContra,
            gd:golesFavor-golesContra}
}

const Disney = puntos(scores[0].matches.matches,"Disney")
console.log(Disney)




  return (
    <Layout>
        {scores && scores.filter((score)=> score.stage==="scoring").map((score)=>{
        return <p>{score.tournamentName}</p>
})}
    </Layout>
  )
}

export default Scores