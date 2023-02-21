import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import app from '../firebase';
import { collection,getDocs,getFirestore } from 'firebase/firestore'
import EventsList from '../components/EventsList';

const firestore = getFirestore(app)


const Events = () => {

  const [events,setEvents] = useState([])
  
  useEffect(() => {
    const fetchEvents = async () => {
      let list = [];
      try{
          const querySnapshot =  await getDocs(collection(firestore, "events"));
          querySnapshot.forEach((doc) => {
            list.push(doc.data())})
            setEvents(list)
            /* console.log(list) */
      }catch (err){
          console.log(err);
      }
    }
    fetchEvents();

  }, [])

  return (
    <Layout>
      <h1 className='
                    text-3xl
                    text-center 
                    font-bold 
                    text-blue-900'
                    >EVENTOS
      </h1>
      <div className='mt-4 mb-4 ml-12 flex gap-4'>
        <h2 className='text-xl sm:text-2xl'>Agregar evento:</h2>
        <Link to='/events/addevent' className='bg-blue-900 text-white p-2  rounded text-xl sm:text-2xl'>
          <MdOutlineEmojiEvents />
        </Link>
      </div>
      <EventsList eventsArray={events}/>
    </Layout>
  )
}

export default Events