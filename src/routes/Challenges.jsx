import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import ChallengesList from '../components/ChallengesList'
import Layout from '../components/Layout'
import app from '../firebase';
import { collection,getDocs,getFirestore } from 'firebase/firestore'

const firestore = getFirestore(app)

const Challenges = () => {
  const [challenges,setChallenges] = useState([])
  
/*   const challengeQuery = async () =>{
    let challengesList = []
    const querySnapshot = await getDocs(collection(firestore, "challenges"));
    querySnapshot.forEach((doc) => {
      challengesList.push(doc.data())
    });
  }
  challengeQuery() */

  useEffect(() => {
    const fetchChallenges = async () => {
      let list = [];
      try{
          const querySnapshot =  await getDocs(collection(firestore, "challenges"));
          querySnapshot.forEach((doc) => {
           list.push(doc.data())})
           setChallenges(list)
           /* console.log(list) */
      }catch (err){
          console.log(err);
      }
    }
    fetchChallenges();

  }, [])

  /* console.log(challenges) */

  return (
        <Layout>
        <h1 
        className='text-3xl text-center font-bold text-blue-900'>
          RETOS
        </h1>
        <div className='mt-4 mb-4 ml-12 flex gap-4'>
          <h2 className='text-2xl'>Agregar reto:</h2>
          <Link to='/challenges/addtaskchallenge' className='bg-blue-900 text-white p-2  rounded'>
            Tareas
          </Link>
          <Link to='/challenges/addmatchchallenge' className='bg-blue-900 text-white p-2  rounded'>
            Partido
          </Link>
        </div>
        <ChallengesList challengesArray={challenges}/>
    </Layout>
  )
}

export default Challenges