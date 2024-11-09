'use client'
import React from "react";
import { useState } from "react";
import { eventFormData } from "@/firebase/data/event";
import userData from "../dashboard/user";
import { fileData } from "@/firebase/data/storage";
import { pdf } from "@react-pdf/renderer";
function userSetupPage(eventmodalid){
const [activeIndex, setActiveIndex] = useState(0);
const [userEntryData,setUserEntryData] = useState({eventID:'',applicantID:'',emailAddress:'', phoneNumber:''})

let u = new userData();

const [selectedFile,setSelectedFile] = useState({src:'',b64:null,type:'',name:''})

function handleUpload (eventID) {
  const folderName = eventID
  console.log(eventID+" "+selectedFile.src)
  let dataup = new fileData(folderName);

 return( dataup.uploadFile(selectedFile).then((sn)=>{
   // alert("File Uploaded")
   return sn
  }).catch((err)=>{
    console.log('handle upload '+ err)
  })
 )
}
function setEntry(){
  let e = new eventFormData(userEntryData.applicantID,userEntryData.eventID);
 handleUpload(userEntryData.eventID).then((sn)=>{
  console.log(sn)
  e.setData(userEntryData.phoneNumber,userEntryData.emailAddress,sn).then(()=>{
     alert('Succesfully applied')
     window.location.replace('/dashboard')
   }).catch((err)=>{
     console.log("setEntry" +err)
   })
 })

}
function uploadForm(){

  const handleUploadChange= (e)=>{
    e.preventDefault();

      setSelectedFile({
        ...selectedFile,
        src: URL.createObjectURL(e.target.files[0]),
        b64: e.target.files[0],
        type: e.target.files[0].name.split(".").pop(),
        name: userEntryData.applicantID
      })
  }
  return(
<>
<label className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="file_input">Work Experience</label>
      <input className='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf" onChange={handleUploadChange}/>
  <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input" >DOCX or PDF (2MB)</p>
  
  </>
  )
}
function professionalForm(textPlaceholder, isDisabled){

          const handleInputChange =  (e )=>
          {
          const {name,value} = e.target
          setUserEntryData({
            ...userEntryData,
            [name]:value,
          })  
          }
          const handleFormSubmit = (e)=>{
          e.preventDefault();
          u.parseData()
      //    console.log(eventmodalid + " "+ u.getUserUID())
          setUserEntryData({
            ...userEntryData,
            applicantID : u.getUserUID(),
            eventID : eventmodalid
          })
         // console.log(userEntryData)
          setActiveIndex(1)
          }

function workExpHandler(){
    var cities = ['Caloocan', 'Manila','Malabon','Makati']
    const select = document.getElementById('eventWorkExp')

    return(
    <div>
        <select id="eventWorkExp" className='bg-white rounded px-5 py-4 border border-pink-500 disabled:bg-pink-500 disabled:text-white disabled:opacity-70'>
        <option value='Catering'> Catering </option>
        <option value='Music'>Music</option>
        </select>
    </div>
    )
}
  return(
  <form>
  <div id= "jobExperienceForm">
      
    <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Contact Email address: </label>
          <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='eventAppEmail' ></input>
          </div>
          <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Contact Information: </label>
          <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='eventAppPhone' type='number'></input>
          </div>
          <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Cover Letter: </label>
      <input className='bg-white border text-gray-900 border-pink-500 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf" />
        </div>
  <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input" >DOCX or PDF (2MB)</p>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Email address </label>
    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="emailAddress"
     type="email" placeholder="something@mail.com"
     defaultValue={userEntryData.emailAddress} name="emailAddress"
     onChange={handleInputChange} 
     disabled={isDisabled} required></input>
    </div>
    <div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Phone number </label>
    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="something@mail.com"
    name='phoneNumber' defaultValue={userEntryData.phoneNumber} onChange={handleInputChange} disabled={isDisabled}></input>
    </div>
      
    </div>
    
    <div>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"></label>
    </div>
  </div>
  <button type="submit" className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleFormSubmit} hidden={isDisabled}>Next</button>
</form>


)
}

function userForm1(textPlaceholder, isDisabled){
  //send everything to session storage
  //review with disabled input + whatever's stored in sessionstorage
  return(
      <form>
    <div>
      <div>
        
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Profile Picture</label>
        <input className="mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

      </div>
      <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
        <div className="flex items-center mb-5 space-x-10">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name" > First Name</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder} disabled={isDisabled} onChange={(e)=> sessionStorage.setItem("firstName",e.target.value)}></input>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Last Name</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder}></input>
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Home Address (Lot No./Street/Barangay)</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text"placeholder={textPlaceholder}></input>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Phone Number</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder}></input>
      </div>

    </div>
  </form>
  )
}

  return(
    <>
 
      <div className="ml-4 w-5/6 text-center">
      <Panel title="User Information" isActive={activeIndex===0} onShow={()=>setActiveIndex(0)}>
      <div className="w-5/6 text-center">
      <ol className=" mt-10 flex items-center w-full p-3 space-x-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500">
      <li className="flex items-center text-pink-500 dark:text-pink-500">
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-pink-500">
            1
        </span>
        Professional <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li className="flex items-center">
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
            2
        </span>
        Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li className="flex items-center">
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
            3
        </span>
        Review
      </li>
      </ol>
      </div>
      
     <div className="mt-10  mx-auto">
     {professionalForm(" ", false)}
      
     </div>
      </Panel>

      <Panel title="Company Information" isActive={activeIndex===1} onShow={()=>setActiveIndex(1)}>
    
      <div className="mx-auto">
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 ">
          <li className="flex items-center text-pink-500 dark:text-pink-500">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                  1
              </span>
              Professional<span className="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>

          <li className="flex items-center text-pink-500 dark:text-pink-500">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                2
              </span>
              Personal<span className="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
         
          <li className="flex items-center">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
              </span>
              Review 
          </li>
      </ol>
      
      </div>
      <div>
      <div className="mt-10  mx-auto">
          {uploadForm()}
        <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back</button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(2)}>Next</button>
      </div>
      </div>
      </Panel>

      <Panel title="Company Information" isActive={activeIndex===2} onShow={()=>setActiveIndex(2)}>
    
    <div className="mx-auto">
    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 ">
        <li className="flex items-center text-pink-500 dark:text-pink-500">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                1
            </span>
            Professional <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>

        <li className="flex items-center text-pink-500 dark:text-pink-500">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
              2
            </span>
            Personal<span className="hidden sm:inline-flex sm:ms-2">Info</span>
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
       
        <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                3
            </span>
            Review 
        </li>
    </ol>
    
    </div>
    <div>
    <div className="mt-10  mx-auto">
        <div className="flex flex-wrap">
          <div className='w-1/2 ml-auto border-border-gray-200'>
            {professionalForm('',true)}
          </div>
          <div className="w-1/2 ml-auto border-border-gray-200">
            {"here"}
          </div>
        </div>
      <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back to Start</button>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setEntry()}>Confirm</button>
    </div>
    </div>
    </Panel>



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



function userForm2(){
return(
  <form>
  <div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Company Name</label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-5 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="First Name"></input>
    
    </div>

  </div>
</form>
)
}
