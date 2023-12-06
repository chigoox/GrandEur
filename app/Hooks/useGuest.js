'use client'
import app from "@/Firebase"
import { getAuth, signInAnonymously } from "firebase/auth"
import { useEffect, useState } from "react"
import { getRand, getRandTN } from "../myCodes/Util"
import { fetchDocument } from "../myCodes/Database"




 export const useGuest = () => {
     const [GID, setGID] = useState(getRandTN(17))
     
     const checkGID = async () => { 

    await fetchDocument('User', GID)
    .then((data) => {
        if(data == undefined){
          typeof window !== "undefined" ?  localStorage.setItem("GuestID", JSON.stringify(GID)) : null;
            

        }
    })
           
    }


   useEffect(()=>{
    if(typeof window !== "undefined"){
        if (JSON.parse(localStorage.getItem("GuestID"))) { 
    } else{
     checkGID()
    }
    }
    
   }, []) 
    return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("GuestID")) : null
}

