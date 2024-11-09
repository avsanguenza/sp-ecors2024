'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import NavBar from '../navBar';
const auth = getAuth(firebase_app);



function currUser(){
  const router = useRouter()
  var activeUser = "";
 auth.onAuthStateChanged((auth) =>{
  if (auth){
  }
    else{
      router.push("/error");
      
  }
 }

 );
} 

export default function Page(){
return (
     <>
     
     </>
     

    );

}