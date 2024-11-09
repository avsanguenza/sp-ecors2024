'use client'
import React, { useEffect } from "react";
import { useState,useRef } from "react";
import { create } from "domain";
import NavBar from "@/app/navBar";
import jobRegistrationForm from './forms'
import { Toaster } from "react-hot-toast";
function userSetupPage(currentUID){
//actually restructure this page into this: THIS page is to check if authorized user, main header GET THE DAMN UID
//jobForm = own .tsx file 
const [formData, setFormData] = useState({eventid:'',eventName:'',createDateStart:'',createDateEnd:'',createJob0:'',createJob1:'', createLoc0:'',createLoc:'', createWageType:'',createWageTypeVal:'',createDescription:'',eventImageURL: ''})
  return(
    <>
   <NavBar/>
   <div className="bg-white">
   <Toaster/>
   <div className="rounded-t-lg bg-white w-72 h-12 ml-6"> <h2 className="text-4xl font-bold py-4  ml-6">Create Event </h2></div>
   <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
   <div>
          <span className='ml-36 mt-8 text-xl text-start font-semibold text-red-500'>&#42; are required fields.</span>
          </div>
    <div className=" text-center py-8 ">
     
    {
    jobRegistrationForm(formData,'new')}
    </div>
  </div>

  </>

      )
}

export default userSetupPage;

function Panel({
  title,
  children,
  isActive,
  onShow
}){
  return(
    <div className="text-center space-x-2">
    
      {isActive?(children):null}
    </div>

  )
}
