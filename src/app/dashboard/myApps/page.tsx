'use client'

import userData from "../user";
import { eventData } from "@/firebase/data/event";
import { eventFormData } from "@/firebase/data/event";
import { useEffect, useState } from "react";
import '../dashboard-style.css'
var udata = new userData()
udata.parseData()
var edata = new eventData()
var efdata = new eventFormData(udata.getUserUID(),'')
let userApplData = new Array()

function manageApplications(){
    const [data,setData] = useState([])
    useEffect(()=>{
        efdata.getSpecificData('userid','==',udata.getUserUID()).then(async()=>{
          await new Promise ((resolve)=> setTimeout(resolve,2000));
              var tempData = efdata.applicantFileObj
            
            setData(tempData) 
        })
    },[])
    return(
      <div>
    {
  tableApps(data)
    }
  
     
      </div>
    )
}
export default manageApplications;

function tableApps(data){
  const [updateFormData, setUpdateFormData] = useState({newEmail:'',newPhone:''})
  const handleUpdate = (e)=>{
    const {name, value} = e.target
    setUpdateFormData({
      ...updateFormData,
      [name]:value
    })
  }
function submitUpdate(d,updateFormData){
  var nEmail = (updateFormData.newEmail=='')? d.emailAddress : updateFormData.newEmail
  var nPhone = (updateFormData.newPhone =='')? d.phoneNumber : updateFormData.newPhone
  updateApplication(d,nPhone,nEmail)

  //toast here
}
function returnButtonMode(d,mode){
  if(!mode){
      return(
          
      <button className="btn-primary" onClick={()=>(document.getElementById(d.applicantFormID+'confirm') as HTMLDialogElement).showModal()}> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"  />
      </svg>
  
  
      Submit Changes</button>  
      )
  }
  else{
      return(
          
      <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" onClick={()=>submitUpdate(d,updateFormData)} > 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2 inline">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"  />
      </svg>
  
  
     Confirm Changes</button>  
      )
  }
}

function returnDialog(d,mode){
  if(!mode){
    return(
     <div className="modal-box">
     <form method="dialog">
     {/* if there is a button in form, it will close the modal */}
     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
     </form>
     <h3 className="font-bold text-lg">{mode == true ? 'Confirm change in' : 'Edit'} Application : {d.eventName}</h3>
     <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
 
     <div>
     <form>
     <div className='text-start ml-4 mb-6'>
     <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName" >Contact Email address: </label>
     <input className="textbox-primary" id="eventAppEmail" name='newEmail' aria-placeholder={d.emailAddress} defaultValue={(mode==true)?updateFormData.newEmail:d.emailAddress} disabled={mode} onChange={handleUpdate}/>
     </div>
     <div className='text-start ml-4 mb-6'>
     <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName" defaultValue={d.phoneNumber}>Contact Information: </label>
     <input className="textbox-primary" id="eventAppEmail" name='newPhone' type='number' aria-placeholder={d.phoneNumberhon} defaultValue={(mode==true)?updateFormData.newPhone:d.phoneNumber} disabled={mode} onChange={handleUpdate}></input>
     </div>
     <div className='text-start ml-4 mb-6'>
     <div className="grid grid-cols-2">
     <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Cover Letter: </label>
     <label className="inline  -ml-[5rem] mt-1">{udata.getName()+'.pdf'}</label>
     </div>
     <input className='disabled:opacity-60 uploadbox-primary  file:block-mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#387478] file:text-white hover:file:bg-pink-700
     ' id="file_input" type="file" accept=".doc,.docx,.pdf" disabled />
 
     </div>
     </form>
     </div>     
     <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
 
     <div className="text-center">
 
     {returnButtonMode(d,mode)}     </div>
     </div>
   )
 }
   else{
     return(
       <div className="modal-box">
       <form method="dialog">
       {/* if there is a button in form, it will close the modal */}
       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
       </form>
       <h3 className="font-bold text-lg">{mode == true ? 'Edit': 'Confirm change in'} Application : {d.eventName}</h3>
       <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
   
       <div>
       <form>
       <div className='text-start ml-4 mb-6'>
       <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName" >Contact Email address: </label>
       <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='newEmail' aria-placeholder={d.emailAddress} defaultValue={(mode==true)?updateFormData.newEmail:d.emailAddress} disabled={mode} onChange={handleUpdate}/>
       </div>
       <div className='text-start ml-4 mb-6'>
       <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName" defaultValue={d.phoneNumber}>Contact Information: </label>
       <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='newPhone' type='number' aria-placeholder={d.phoneNumberhon} defaultValue={(mode==true)?updateFormData.newPhone:d.phoneNumber} disabled={mode} onChange={handleUpdate}></input>
       </div>
       <div className='text-start ml-4 mb-6'>
       <div className="grid grid-cols-2">
       <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Cover Letter: </label>
       <label className="inline  -ml-[5rem] mt-1">{udata.getName()+'.pdf'}</label>
       </div>
       <input className='disabled:opacity-60 bg-white border text-transparent border-pink-500 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
       file:block-mb-2 file:mr-4 file:py-2 file:px-4
       file:rounded-full file:border-0
       file:text-sm file:font-semibold
       file:bg-pink-500 file:text-white
       ' id="file_input" type="file" accept=".doc,.docx,.pdf" disabled />
   
       </div>
       </form>
       </div>     
       <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
   
       <div className="text-center">
   
       {returnButtonMode(d,true)}     </div>
       </div>
     )
   }
  }

function editDialog(d,mode){
    return(
      <dialog id={(mode==true)? d.applicantFormID+"confirm":d.applicantFormID+"editWindow"} className="modal">
      {returnDialog(d,mode)}
  </dialog>
    )
  }
    return(
        <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
        {tableHeaders()}
        {
            data.map((d)=>{
                return(
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
                    even:dark:bg-gray-800 border-b dark:border-gray-700">
                     
                     <th className='px-5'> {d.eventName}</th>
                     <th className='px-5'> {d.eventCreatorName}</th>
                     <th className='px-5'> {d.eventLocation}</th>
                     <th className='px-5'> {returnWageType(d.eventWageType)}</th>
                     <th className='px-5'> {returnStatus(d.applicationStatus.toString())}</th>
                     <th className='px-5'>   <button type="button" className="text-white btn-primary" onClick={()=>(document.getElementById(d.applicantFormID+'editWindow') as HTMLDialogElement).showModal()}>Edit application</button> 
                      
                      {editDialog(d,false)}
                      {editDialog(d,true)}
                     
                     | 
                     <button type="button" className="ml-2 text-white bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-800" onClick={()=>(document.getElementById((d.applicantFormID+'cancelWindow')) as HTMLDialogElement).showModal()}>Cancel application</button>
           
                     {confirmDialog(d)}

                     </th> 
                     </tr>
                     
                )
            })
        }
        </table>
    )
}

function submitUpdate(d,attr,value){
  let updateEF = new eventFormData(udata.getUserUID,d.eventuid)
  updateEF.updateAttribute(d.applicantFormID,attr,value)

}
function updateApplication(d, newPhone, newEmail){
  let updateEF = new eventFormData(udata.getUserUID,d.eventuid)
  updateEF.updateAttribute(d.applicantFormID,'phoneNumber',newPhone).then(async()=>{
      updateEF.updateAttribute(d.applicantFormID,'emailAddress',newEmail)
  })
  
  //add toast here
}

function confirmButton(d,value){
  return(
  <>
    <button type="button" className="text-white bg-gray-500 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" >
   
   Cancel</button> 
    <button type="button" className="text-white bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"  onClick={()=>submitUpdate(d,'isPresent',value)} >

   Confirm</button> 
  </>
  )
}

function confirmDialog(d){
  console.log(d)
  return(
    <dialog id={d.applicantFormID+"cancelWindow"} className="modal" >
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Cancel Application:  {d.eventName}</h3>
    <hr className="h-px my-8 text-lg bg-gray-200 border-0 dark:bg-gray-700"/>

          Are you sure you would like to cancel your application?
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
    {confirmButton(d,false)}
  </div>
</dialog>
                     
  )
}


function tableHeaders(){
    return(
      <thead className="table-design">
      <tr>
  
      <th scope="col" className="px-6 py-3">
             Name of Event
          </th>
          <th scope="col" className="px-6 py-3">
            Event Organizer
          </th>
          <th scope='col'  className="px-6 py-3">
            Event Location 
          </th>
          <th scope="col" className="px-6 py-3">
          Wage 
          </th>
          <th scope="col" className="px-6 py-3">
          Application Status          </th>
          <th scope="col" className="px-6 py-3">
          Actions

             </th>
      </tr>
  </thead>
    )
  }

  function returnWageType(role){
    if(role=='hourly'){
      return(<span className="bg-green-200 text-green-800 text-medium font-medium me-2 px-4 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Hourly</span>)
    } else{
      return(
        <span className="bg-yellow-200 text-yellow-800 text-medium font-medium me-2  px-4 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Fixed</span>
  
      )
    }
  }
  function returnStatus(role){
    if(role=='true'){
      return(<span className="bg-green-300 text-green-900 text-medium font-bold me-2 px-4 py-1   rounded-full dark:bg-green-900 dark:text-green-300">Accepted</span>)
    } 
    if(role=='false'){
      return(
        <span className="bg-red-300 text-red-900 text-medium font-bold me-2 px-4 py-1  rounded-full dark:bg-red-900 dark:text-red-300">Rejected</span>
  
      )
    }
    else{
      return(
        <span className="bg-gray-300 text-gray-900 text-medium font-bold me-2 px-4 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">Pending</span>
  
      )
    }
  }