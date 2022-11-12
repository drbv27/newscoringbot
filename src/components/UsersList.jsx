import React, {useState,useEffect} from 'react'
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
console.log(usersArray);




  return (
    <div>
        <div className='columns-4 bg-gray-800 py-4 text-xl text-white text-center'>
            <p>Nombre Completo</p>
            <p>Email</p>
            <p>Rol</p>
            <p>Acciones</p>

        </div>
        {usersArray.map((user)=>{
            return(
                <>
                <div className='columns-4 text-center mt-3'>
                    <p>{user.name} {user.lastname}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                    <div>
                        <button>editar</button>
                        <button>BORRAR</button>
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