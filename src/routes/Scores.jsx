import React,{useState,useEffect} from 'react'
import { collection, getDocs,getFirestore } from "firebase/firestore";
import Layout from '../components/Layout'
import app from '../firebase';

const firestore = getFirestore(app)

const Scores = () => {
    const [scores,setScores] = useState([])
    const [count,setCount] = useState(0)

/* useEffect(()=>{
    const fetchEventChall = async () => {
            const querySnapshot = await getDocs(collection(firestore, "eventchallenge"));
            let scoresArray = []
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>",doc.data())
                scoresArray = [...scoresArray,doc.data()]
                console.log(scoresArray)
                setScores(scoresArray)
                console.log(scores)
            });
            setScores(scoresArray)
            console.log(scores[0])
    }
    fetchEventChall()
},[]); */

useEffect(()=>{
    const fetchEventChall = async () => {
         try{ 
            const querySnapshot = await getDocs(collection(firestore, "eventchallenge"));
            if(querySnapshot){
                let scoresArray = []
                querySnapshot.forEach((doc)=>{
                    console.log(doc.data())
                    scoresArray.push(doc.data())
                    setScores(scoresArray)
                })
                /* scoresArray = [...scoresArray,querySnapshot.docs[0].data()] */
                //setScores([...scores,querySnapshot.docs[0].data()])
            }else{
                console.log("no pude")
            }
         }catch(error){
            console.log(error)
         }  
    }
    fetchEventChall()
/*     const interval = setInterval(()=>{
        fetchEventChall()
    },15000);
    return () =>clearInterval(interval) */
},[]);

console.log(count)

 console.log(scores) 

/* const puntos = function(partidos,equipo){
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
} */

/* function sortBy(ar) {
    return ar.sort((a, b) => a.points === b.points 
        ? b.gd-a.gd
        : b.points-a.points
  )}

  let order = null
if(scores.length > 0){
    const tabla = scores[0].teams.map((team)=>puntos(scores[0].matches.matches,team.teamName))
    order = sortBy(tabla)
    const Disney = puntos(scores[0].matches.matches,"Disney")
} */
/* console.log(tabla) */

//const order = sortBy(tabla)
/* console.log(order) */


//const Disney = puntos(scores[0].matches.matches,"Disney")
/* console.log(Disney) */




  return (
    <Layout>
        {scores && scores.filter((score)=> score.stage==="scoring").map((score)=>{
        return <p>{score.tournamentName}</p>
})}
        <table className='border-collapse border border-slate-500 hover:border-collapse'>
            <thead>
            <tr>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>Equipo</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>Puntos</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GD</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GF</th>
                <th className='border border-slate-600 bg-slate-600 text-white px-2'>GC</th>
            </tr>
            </thead>
            <tbody>
{/*         {order && order.map((team,index)=>{
            return      <tr key={index}>
                            <td className='border border-slate-700 px-1'>{team.team}</td>
                            <td className='border border-slate-700 text-center'>{team.points}</td>
                            <td className='border border-slate-700 text-center'>{team.gd}</td>
                            <td className='border border-slate-700 text-center'>{team.gf}</td>
                            <td className='border border-slate-700 text-center'>{team.gc}</td>
                        </tr>
        })} */}
        </tbody>
        </table>
    </Layout>
  )
}

export default Scores