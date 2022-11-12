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
        {usersArray.map((user)=>{
            return(
                <div className='columns-3'>
                    <p>{user.name}</p>
                    <p>{user.lastname}</p>
                    <div>
                        <button>editar</button>
                        <button>BORRAR</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default UsersList