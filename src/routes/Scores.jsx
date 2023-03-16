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
                /* console.log(scores) */
            });
            
/*             const docRef = doc(firestore,'events',`${eventId}`)
            const docSnap = await getDoc(docRef) */
    }
    fetchEventChall()
},[])




  return (
    <Layout>
        {scores && scores.filter((score)=> score.stage==="scoring").map((score)=>{
        return <p>{score.tournamentName}</p>
})}
    </Layout>
  )
}

export default Scores