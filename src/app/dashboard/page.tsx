'use client'
import {Fragment, useState,useEffect} from 'react';
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect, useRouter } from "next/navigation";

import {eventData} from '@/firebase/data/event'
import userSetupPage from '../userSetup/page';
import NavBar from '../navBar';
import { imageData } from '@/firebase/data/storage';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Loading from './loading-dashboard';
import { Redirect } from 'next';
const auth = getAuth(firebase_app);
import userData from './user';
let udata = new userData()
udata.parseData()
const navigation = [
    { name: 'Browse Work', href: '/dashboard', current: true },
    { name: 'My Jobs', href: '/dashboard/myJobs', current: false },
    { name: 'Profile', href: '#', current: false },
    { name: '', href: '#', current: false },
  ]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function currUser(){
  const router = useRouter()
  var activeUser = ""
 auth.onAuthStateChanged((auth) =>{
  if (auth){
  }
    else{
      router.push("/");
      alert("Please log-in to continue!");
  }
 }

 );
} 




export default function Page(){

  //currUser(); //DISABLED BECAUSE TESTING
  //var obj = localStorage.getItem('currentUser')
  //var accInfo = JSON.parse(obj)
  var edata = new eventData();
  var results = new Array;


  useEffect(()=>{
    //fetch all possible eventUID ->procedurally create cards -> update states
  //edata.getData('events','isOpen','==',true).then(async()=>{
   ///  var output = edata.dataobjMap
    /*   // output.forEach((v,k)=>{
      // var temp = JSON.parse(v)
        //add appcount here
     // results.push(temp)
      })
  setData(results)
    await new Promise ((resolve)=> setTimeout(resolve,1000));

     setActiveIndex(true)
   }).catch(()=>{
    setActiveIndex(false)
    toast.error('Something went wrong. Please try again.')
   })*/
  },[])

    return (
      (udata.getUserType()=='User'? redirect('dashboard/myApps'):redirect('dashboard/myJobs'))
    )

}


