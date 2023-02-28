import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import app from '../firebase';
import { collection,getDocs,getFirestore } from 'firebase/firestore'
import EventsList from '../components/EventsList';

const firestore = getFirestore(app)

const ActiveEvents = () => {
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
                    txtppal'
                    >EVENTOS
        </h1>
        <div className='mt-4 mb-4 ml-12 flex gap-4 justify-end mr-4'>
  
        </div>

            {events && events.filter((event)=>event.available===true)
                            .map((event)=>{return(
                                <div key={event.id} className='mr-3'>
                                    <div className='flex justify-between py-2'>
                                        <div>
                                            {event.eventName}
                                        </div>
                                        <div>
                                            <Link to={`/activeevents/${event.id}`}>Ir a Evento</Link>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )})}
  </Layout>
  )
}

export default ActiveEvents