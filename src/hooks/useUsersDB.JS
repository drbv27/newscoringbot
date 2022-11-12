import { useState,useEffect} from "react";

import app from "../firebase";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";

const firestore = getFirestore(app);

const useUsersDB = (user)=>{

    const [userDetails,setUserDetails] = useState({});
  
  if(user){
    const userEmail = user.email;
    /* console.log("correo usuario",correoUsuario) */
    /* console.log(usuario.email); */
    
    
    async function searchDocOrCreateDoc(docId){
      //crear referencia sl documento
      const docuRef = doc(firestore,`usersArray/${docId}`)
      //buscar documento
      const query = await getDoc(docuRef);
      //revisar si existe
      if (query.exists()){
        //si si existe
        const infoDoc = query.data();
        /* console.log(infoDoc) */
        return infoDoc;
      }else{
        //si no existe
       /*  await setDoc(docuRef,{activities:[...fakeData]}); */
        const query = await getDoc(docuRef);
        const infoDocu = query.data();
        console.log(infoDocu)
        return infoDocu;
      }
    }

 
  
    useEffect(()=>{
      async function fetchDetails(){
        const queriedDetails= await searchDocOrCreateDoc(userEmail);
        
        setUserDetails(queriedDetails);
       
      }
      fetchDetails();
      },[userEmail]);


    return {
    userDetails,setUserDetails
    }
  }else{
    const fakeData = {
        name:"N",
        lastname:"N",
        email:"N",
        isAdmin:false,
        workArea:"N",
      }
    setUserDetails(fakeData)
    return{
        userDetails,setUserDetails
    }
  }


}

export default useUsersDB;