import React,{useState,useEffect} from 'react'
import uuid from 'react-uuid';
import {Link} from 'react-router-dom'
import Layout from '../components/Layout'
import { CategoriesType } from '../helpers/categories'
import app from '../firebase';
import { collection,getDocs,getFirestore,doc,setDoc,updateDoc, arrayUnion } from 'firebase/firestore'
import UserTeamForm from '../components/UserTeamForm'
import UsersTableForm from '../components/UsersTableForm';

const firestore = getFirestore(app)

const initialState = {
    teamName: "",
    country: "",
    city: "",
    institution:"",
    teamEvent:"",
    teamChallenge:"",
    members:[],
    available: true,
    id:""
  };

const AddTeam = () => {
    const [eventList,setEventList] = useState([])
    const eventsOptions = eventList.map((elm, index) => ({
        value: index,
        label: elm.eventName,
      }));
    const [selectedEvent, setSelectedEvent] = useState([])

    const [formData, setFormData] = useState(initialState);

    const {
        teamName,
        country,
        city,
        institution,
        teamEvent,
        teamChallenge,
        members,
        available,
        id,
      } = formData;

    const idGnerator = () =>{
        const fullId = uuid()
        const firstId = fullId.substring(0,8)
        const secondId = fullId.slice(9,13)
        return `${firstId}${secondId}`
    }

    useEffect(() => {
    const fetchEvents = async () => {
        let list = [];
        try{
            const querySnapshot =  await getDocs(collection(firestore, "events"));
            querySnapshot.forEach((doc) => {
            /*  console.log(doc.data().id)  */
            list.push(doc.data())
            })
            setEventList(list)
            /* console.log(list) */
        }catch (err){
            console.log(err);
        }
    }
    fetchEvents();
    }, [])

    async function saveTeam(e){
        e.preventDefault();
        await setDoc(doc(firestore,"teams",id),formData)
        await updateDoc(doc(firestore,"eventchallenge",`${teamEvent}${teamChallenge}`),{
            teams:arrayUnion(formData)
        })
        cleanForm(e)
    }

    const cleanForm = (e) => {
        e.target.available.checked=true
        setFormData(initialState)
    }

    const addMember = (member) => {
        setFormData({ ...formData, members: [...members, member] });
    };

    const deleteMember = (e,index) => {
        e.preventDefault()
        const copyMember= [...members]
        copyMember.splice(index,1)
        setFormData({ ...formData, members: [...copyMember] });
    };

    const handleAssign = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            id: idGnerator()})
    }

    const handleChange = (e)=>{
        setFormData({...formData,
            [e.target.name]:
            ('maxTurns'===e.target.name
            ||'maxTeams'===e.target.name
            ||'finalTeams'===e.target.name
            ||'maxTime'===e.target.name
            ||'topMaxTurns'===e.target.name)
            ? parseInt(e.target.value)
            :e.target.type === 'checkbox'
            ? e.target.checked 
            : e.target.value})
    };

    return (
        <Layout>
            <div className='py-4'>
                <Link to="/teams" className='bgoscurostem text-white p-2 mt-8 ml-10 rounded'>Atrás</Link>
            </div>
            <form className='w-10/12 mx-auto bggrisclaro p-5 rounded-xl mb-5' onSubmit={saveTeam}>
                <div className='mb-4 flex'>
                    <h1 className='text-2xl md:text-4xl font-bold txtoscurostem'>Agregar Equipo</h1>
                    <div className='ml-auto flex gap-2'>
                        <label htmlFor="available" className='text-lg txtsec font-bold md:text-xl'>Habilitar equipo:</label>
                        <input type="checkbox" className='
                                                        mt-1
                                                        form-input 
                                                        block 
                                                        h-6
                                                        rounded-md 
                                                        border-gray-300 
                                                        shadow-sm
                                                        focus:border-indigo-300 
                                                        focus:ring 
                                                        ocus:ring-indigo-200 
                                                        focus:ring-opacity-50'
                                                id="available"
                                                name="available"
                                                defaultChecked={true}
                                                checked={available.check}
                                                value={available}
                                                onChange={() =>
                                                    setFormData({
                                                    ...formData,
                                                    available: !formData.available,})}/>
                    </div>
                    <hr className='text-black'/>
                </div>
                <label htmlFor="teamName">Nombre Equipo (*):</label>
                <input type="text" className='
                                            mt-1
                                            form-input 
                                            block 
                                            w-full 
                                            rounded-md 
                                            border-gray-300 
                                            shadow-sm
                                            focus:border-indigo-300 
                                            focus:ring 
                                            focus:ring-indigo-200 
                                            focus:ring-opacity-50'
                                    id="teamName"
                                    name="teamName"
                                    value={teamName}
                                    onChange={handleAssign}
                                    required/>
                <label htmlFor="country">País (*):</label>
                <input type="text" className='
                                            mt-1
                                            form-input 
                                            block 
                                            w-full 
                                            rounded-md 
                                            border-gray-300 
                                            shadow-sm
                                            focus:border-indigo-300 
                                            focus:ring 
                                            focus:ring-indigo-200 
                                            focus:ring-opacity-50'
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="city">ciudad(*):</label>
                <input type="text" className='
                                            mt-1
                                            form-input 
                                            block 
                                            w-full 
                                            rounded-md 
                                            border-gray-300 
                                            shadow-sm
                                            focus:border-indigo-300 
                                            focus:ring 
                                            focus:ring-indigo-200 
                                            focus:ring-opacity-50'
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="institution">Institución(*):</label>
                <input type="text" className='
                                            mt-1
                                            form-input 
                                            block 
                                            w-full 
                                            rounded-md 
                                            border-gray-300 
                                            shadow-sm
                                            focus:border-indigo-300 
                                            focus:ring 
                                            focus:ring-indigo-200 
                                            focus:ring-opacity-50'
                                    id="institution"
                                    name="institution"
                                    value={institution}
                                    onChange={handleChange}
                                    required/>
                <label htmlFor="events">Evento (*): </label>

                <select name="teamEvent"
                        value={teamEvent} 
                        id="teamEvent" 
                        onChange={handleChange}
                        className='mt-1
                                form-input 
                                block 
                                w-full 
                                rounded-md 
                                border-gray-300 
                                shadow-sm
                                focus:border-indigo-300 
                                focus:ring 
                                focus:ring-indigo-200 
                                focus:ring-opacity-50'>
                    <option value="">Seleccione evento</option>
                    {eventList.filter((evt)=>(evt.available===true)&&(evt.stage==="registration")).map((evt)=><option value={evt.id}>{evt.eventName}</option>)}
                </select>


                <label htmlFor="teamChallenge">Reto (*): </label>
                <select name="teamChallenge"
                        value={teamChallenge} 
                        id="teamChallenge" 
                        onChange={handleChange}
                        className='mt-1
                                form-input 
                                block 
                                w-full 
                                rounded-md 
                                border-gray-300 
                                shadow-sm
                                focus:border-indigo-300 
                                focus:ring 
                                focus:ring-indigo-200 
                                focus:ring-opacity-50'>
                    <option value="">Seleccione reto</option>
                    {teamEvent!=="" && eventList
                                        .filter((event)=>event.id===teamEvent)[0].challenges
                                        .map((challenge)=><option value={challenge.id}>{challenge.name}</option>)}
                </select>

                <div>
                    <hr className='mt-5'/>
                    <h2 className='text-xl font-bold'>Participantes:</h2>
                    <UsersTableForm membersArray={members} deleteMember={deleteMember}/>
                    <UserTeamForm addMember={addMember} textButton="Añadir"/>
                    

                </div>
                <hr className='mt-4'/>
                <div className='inline-block mt-3 w-full pl-1 text-right'>
                    <button type="submit" className=' p-2 text-white rounded mr-2' style={{backgroundColor:'#1097d5'}}>Guardar</button>
                    <button type="reset" className='border borderppal p-2 txtppal rounded'>Cancelar</button>
                </div>
            </form>
        </Layout>
    )
}

export default AddTeam