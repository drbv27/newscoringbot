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
            console.log(scores[0]
                )
            
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

function sortBy(ar) {
    return ar.sort((a, b) => a.points === b.points 
        ? b.gd-a.gd
        : b.points-a.points
  )}

const tabla = scores[0].teams.map((team)=>puntos(scores[0].matches.matches,team.teamName))
console.log(tabla)

const order = sortBy(tabla)
console.log(order)


const Disney = puntos(scores[0].matches.matches,"Disney")
console.log(Disney)




  return (
    <Layout>
{/*         {scores && scores.filter((score)=> score.stage==="scoring").map((score)=>{
        return <p>{score.tournamentName}</p>
})} */}
        <table className='border-collapse border border-slate-500 hover:border-collapse'>
            <tr>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>Equipo</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>Puntos</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GD</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GF</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GC</th>
            </tr>
        {order && order.map((team)=>{
            return      <tr>
                            <td className='border border-slate-700 px-1'>{team.team}</td>
                            <td className='border border-slate-700 text-center'>{team.points}</td>
                            <td className='border border-slate-700 text-center'>{team.gd}</td>
                            <td className='border border-slate-700 text-center'>{team.gf}</td>
                            <td className='border border-slate-700 text-center'>{team.gc}</td>
                        </tr>
        })}
        </table>
    </Layout>
  )
}

export default Scores