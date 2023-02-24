import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import app from '../firebase';
import { collection,getDocs,getFirestore } from 'firebase/firestore'
import TeamsList from '../components/TeamsList'

const firestore = getFirestore(app)


const Teams = () => {

  const [teams,setTeams] = useState([])
  
  useEffect(() => {
    const fetchTeams = async () => {
      let list = [];
      try{
          const querySnapshot =  await getDocs(collection(firestore, "teams"));
          querySnapshot.forEach((doc) => {
            list.push(doc.data())})
            setTeams(list)
            /* console.log(list) */
      }catch (err){
          console.log(err);
      }
    }
    fetchTeams();
  }, [])


  return (
    <Layout>
      <h1 
      className='text-3xl text-center font-bold txtppal'>
        EQUIPOS
      </h1>
      <div className='mt-4 mb-4 ml-12 flex gap-4 justify-end mr-4'>
        <h2 className='text-xl sm:text-2xl'>Agregar equipo:</h2>
        <Link to='/teams/addteams' className='bgazulapp text-white p-2  rounded text-xl sm:text-2xl'>
          <AiOutlineUsergroupAdd />
        </Link>
      </div>
      <TeamsList teamsArray={teams}/>
    
    </Layout>

)
}

export default Teams