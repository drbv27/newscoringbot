import React, {useState,useEffect} from 'react'
import { FaUserEdit,FaRegTrashAlt,FaKey,FaUserAlt } from 'react-icons/fa'
import { GiWhistle } from 'react-icons/gi';
import { getFirestore,collection, getDocs } from "firebase/firestore";
import app from '../firebase';
const firestore = getFirestore(app)

const UsersList = () => {

    const [usersArray,setUsersArray] = useState([])
    const usuarios = []
    async function queryUsers(){
        const querySnapshot = await getDocs(collection(firestore, "usersArray"));
            querySnapshot.forEach((doc) => {
            usuarios.push(doc.data())
        /* setUsersArray(usuarios) */
        /* console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data()); */
        });
        /* console.log(usuarios); */
        
        setUsersArray(usuarios)
    }
useEffect(() => {queryUsers()},[])
/* console.log(usersArray); */




  return (
    <div className='mr-1.5 border-4 rounded-t-lg'>
        <div className='columns-4 bg-sky-800 py-4 text-xl text-white text-center rounded-t-lg'>
            <p>Nombre Completo</p>
            <p>Email</p>
            <p>Rol</p>
            <p>Acciones</p>

        </div>
        {usersArray.map((user)=>{
            return(
                <>
                <div className='columns-4 text-center mt-3' key={user.email}>
                    <p>{user.name} {user.lastname}</p>
                    <p>{user.email}</p>
                    <p>{user.role==="admin"
                            ?<FaKey className='mx-auto text-2xl text-sky-700'/>
                            :user.role==="judge"
                                ?<GiWhistle className='mx-auto text-2xl text-sky-700'/>:
                                <FaUserAlt className='mx-auto text-2xl text-sky-700'/>}</p>
                    <div>
                        <button><FaUserEdit className='bg-amber-500 p-1 text-3xl text-white rounded border border-amber-800 mr-1'/></button>
                        <button><FaRegTrashAlt className='bg-red-600 p-1 text-3xl text-white rounded border border-red-800'/></button>
                    </div>
                </div>
                <hr />
                </>
            )
        })}
    </div>
  )
}

export default UsersList