import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import app from '../firebase';
import { doc,getDoc,getFirestore } from 'firebase/firestore'
import Layout from '../components/Layout';

const firestore = getFirestore(app)

const QualifyEvent = () => {

    const [eventDetail,setEventDetail] = useState(null)
    const { eventId } = useParams()
    console.log(eventId)



    useEffect(()=>{
        const fetchEvent = async () => {
            try{
                const docRef = doc(firestore,'events',`${eventId}`)
                const docSnap = await getDoc(docRef)
    
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setEventDetail(docSnap.data())
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
            }catch (error){
                console.log(error)
            }
        }
        fetchEvent()
        console.log(eventDetail)
    },[])
    console.log(eventDetail)

/*     const fetchEvent = async () => {
        try{
            const docRef = doc(firestore,'events',`${eventId}`)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setEventDetail(docSnap.data())
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
        }catch (error){
            console.log(error)
        }
    }
    fetchEvent() */

    /* console.log(eventDetail.challenges) */

    /* const [challenges,setChallenges] = useState([]) */
  
/*     useEffect(() => {
      const fetchChallenges = async () => {
        let list = [];
        try{
            const querySnapshot =  await getDocs(collection(firestore, "challenges"));
            querySnapshot.forEach((doc) => {
              list.push(doc.data())})
              setChallenges(list)
              
        }catch (err){
            console.log(err);
        }
      }
      fetchChallenges();
  
    }, []) */
    /* console.log(challenges) */

  return (
    <Layout>
        <h1 className='
            text-3xl
            text-center 
            font-bold 
            txtppal'
            >{eventDetail?eventDetail.eventName:null}
        </h1>
        <div>
            <Link to={'/activeevents'}>atras</Link>
        </div>
        <div>Retos:</div>
            {/* {eventDetail ? <p>Ok</p> : null} */}
            {eventDetail ? eventDetail.challenges.map((chall)=>
                                            <div key={chall.id}>
                                                <div>
                                                    <p>{chall.name}</p>
                                                </div>
                                                <div>
                                                    <Link to={`/activeevents/${eventId}/${chall.id}`}>Ir a Calificar:</Link>
                                                </div>
                                            </div>
                                            )
                                        :null}
    </Layout>
  )
}

export default QualifyEvent