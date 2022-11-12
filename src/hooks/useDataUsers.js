import { useState,useEffect} from "react";

import app from "../firebase";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const firestore = getFirestore(app);

const useDataUsers = (user)=>{
    const [usersArray,setUsersArray] = useState(null);
  
  

    const userEmail = user.email;
    /* console.log("correo usuario",correoUsuario) */
    /* console.log(usuario.email); */
    /*const fakeData = [
        {
          id:1,
          dateMade:"2022-08-28",
          activitieStarted:"8:00",
          activitieFinished:"9:00",
          Macroprocess:"Gerencia",
          Process:"Gobierno",
          Subprocess:"Asamblea General",
          description:"Acompañar asamblea falsa1",
          activitieDuration:"1"
        },
        {
          id:2,
          dateMade:"2022-08-28",
          activitieStarted:"9:00",
          activitieFinished:"10:00",
          Macroprocess:"Ingeniería",
          Process:"Investigacion aplicada y desarrollo",
          Subprocess:"Desarrollo de Software",
          description:"Estados software productividad",
          activitieDuration:"1"
        },
        {
          id:3,
          dateMade:"2022-08-28",
          activitieStarted:"10:00",
          activitieFinished:"11:30",
          Macroprocess:"Gerencia",
          Process:"Gobierno",
          Subprocess:"Asamblea General",
          description:"Acompañar asamblea",
          activitieDuration:"1.5"
        },
      ]*/
    
    async function searchDocOrCreateDoc(docId){
      //crear referencia sl documento
      const docuRef = doc(firestore,`usersArray`)
      //buscar documento
      const query = await getDoc(docuRef);
      //revisar si existe
      if (query.exists()){
        //si si existe
        const infoDoc = query.data();
        return infoDoc.activities;
      }/* else{
        //si no existe
        await setDoc(docuRef,{activities:[...fakeData]});
        const query = await getDoc(docuRef);
        const infoDocu = query.data();
        return infoDocu.activities;
      } */
    }

 
  
    useEffect(()=>{
      async function fetchUsers(){
        const queriedUsers= await searchDocOrCreateDoc(userEmail);
        
        setTasksArray(queriedUsers);
       
      }
      fetchTasks();
      },[userEmail]);

      /* console.log("correo",userEmail); */
      console.log("arreglo",usersArray);

    return {
        usersArray,setUsersArray
    }
}

export default useDataUsers;