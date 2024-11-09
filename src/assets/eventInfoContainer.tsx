import userData from "@/app/dashboard/user"
import EventAppDialog from '@/app/events/eventApp/eventAppDialog'
import { userComplaint } from "@/firebase/data/userDB"
import { useState } from "react"
import toast from "react-hot-toast"
let udata = new userData()
udata.parseData()

function EventInfoContainer({d}){
  function reportDialog(d){
    const [uComplaint, setUComplaint] = useState({eventName:d.eventName,eventuid:d.eventid, eventCreator: d.eventCreatorName, userComplaint:udata.getUserUID(),userComplaintName: udata.getName(),complaint:''})
    const handleReport = (e)=>{
      const {name,value} = e.target
      setUComplaint({
        ...uComplaint,
        [name]: value
      })
    }
    async function sendComplaint(){
      let uComp = new userComplaint
      const sendComplaint = uComp.setComplaint(uComplaint.eventName,uComplaint.eventuid,uComplaint.eventCreator,uComplaint.userComplaint,uComplaint.userComplaintName,uComplaint.complaint)
      toast.promise(sendComplaint,{
        loading:'Sending report',
        success:'Report sent successfully',
        error:'An error has occured. Please try again later.'
      })
    }
    return(
<dialog id={d['eventid']+'report'} className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Report this event</h3>
      <label className="text-start ml-4 mb-2 block text-gray-700 text-xl font-semibold "> Event Name:</label>
      <input className="appearance-none block w-96 bg-gray-50 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ml-4 disabled:bg-gray-200" id='eventName' name="eventNameReport" defaultValue={d.eventName} type='text' disabled/>
      <label className='text-start ml-4 mb-2 block text-gray-700 text-xl font-semibold '> Event Organizer:</label>

      <input className="appearance-none block w-96 bg-gray-50 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ml-4 disabled:bg-gray-200" id='eventName' name="eventNameReport" defaultValue={d.eventCreatorName} type='text' disabled/>
      <label className='text-start ml-4 mb-2 block text-gray-700 text-xl font-semibold '> Complaint:</label>
   <div className="text-start">
   <textarea id="message" rows={4} name='complaint'className="ml-4 w-96 text-gray-900 bg-gray-50 rounded-lg border border-pink-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleReport}></textarea>
   </div>
      <div className="text-center mt-8">
        <button className="text-center bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" onClick={()=>sendComplaint()}> Submit report</button>
      </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    )
  }

  function eventAppFormDialog(d){
    (document.getElementById(d.eventid+'eventapp') as HTMLDialogElement).showModal()
  }
    return(
       <>
        <dialog id={d.eventid} className="modal">
        <div className="modal-box">
        {/*<form method='dialog'>
        <button id='closebtn' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        */}
        <details className="dropdown-right text-end mr-4 mb-2 btn-white w-36" hidden={udata.name==null}>
  <summary className="m-1 btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
</svg></summary>
  <ul className="p-2 shadow menu dropdown-content z-30 rounded-box w-36">
    <button className="text-center hover:bg-gray-100" onClick={()=>( document.getElementById(d.eventid+'report') as HTMLDialogElement).showModal()}>Report event</button>
      </ul>
</details>
{reportDialog(d)}
<img src={d.eventImageURL} className="rounded-lg w-60 h-96 mx-auto mb-2"></img>
          <h2 className="font-bold text-xl text-center">{d.eventName}</h2>
        <div className=" p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline'fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 10.5a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M17.4 8.4C17.4 5.4 15 3 12 3 9 3 6.6 5.4 6.6 8.4c0 1.3.5 2.4 1.2 3.4C9 13.2 12 18 12 18s3-4.8 4.1-6.3c.7-.9 1.3-2.1 1.3-3.3zM16 18c2.4.3 4 .8 4 1.4 0 .9-3.6 1.6-8 1.6s-8-.7-8-1.6c0-.6 1.6-1.1 4-1.4"></path></svg>
          <span className="py-4 text-center font-medium">{d.eventLocation}</span> 
        </div>    
      
        <svg xmlns="http://www.w3.org/2000/svg"  className='w-6 h-6 inline' fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 11.73a2.97 2.97 0 100-5.94 2.97 2.97 0 000 5.94zm0 1.89c-2.88 0-5.31 2.34-5.31 5.31v.36C8.22 20.37 10.02 21 12 21c1.98 0 3.78-.63 5.31-1.71v-.36c0-2.88-2.43-5.31-5.31-5.31z"></path></svg>
        <span className='font-bold inline' >:</span>
          <p className=" ml-2 font-normal text-center inline dark:text-gray-400">{d.eventCreatorName}</p>
          <div hidden={udata.name==null}>
            <p className="font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline" fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.17 3H21v7.83L10.83 21 3 13.17 13.17 3z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.63 11.51a1.86 1.86 0 00.3 2.56 1.86 1.86 0 002.56.3 1.51 1.51 0 00.27-1.68c-.25-.54-.87-1.56-1.08-2.12A1.4 1.4 0 0112 9.12a1.84 1.84 0 012.55.31 1.84 1.84 0 01.33 2.57m-.31-2.57l.81-.81m-6.26 6.26l.81-.81m7.94-7.39a.55.55 0 100-1.1.55.55 0 000 1.1z"></path></svg>: <text className="font-medium mr-2">&#8369; {d.eventWageTypeVal}</text>  {returnWageType(d.eventWageType)}</p>
          </div>     
          <p className="mt-4 font-bold ">Description:</p>
          <p className="mb-4">{d['eventDescription'].substring(0,150)+'...'}</p>

          <div className="text-center">
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <button className="text-white btn-primary" hidden={udata.name==null} onClick={()=>(udata.getUserType()=='User')? eventAppFormDialog(d): messageButton(d.userid, d.eventCreatorName)}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 inline">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

          {(udata.getUserType() =='Event Organizer')? 'Contact Organizer' : 'Apply'}</button>
        </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
          
        </form>
      
 
      </dialog>
      <dialog id={d.eventid+'eventapp'} className="modal">
      <div className="modal-box">
      <form method='dialog'>
        <button id='closeBtn'className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h2 className="font-bold text-xl text-center">{d.eventName} Application</h2>
        <div className=" p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline'fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 10.5a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M17.4 8.4C17.4 5.4 15 3 12 3 9 3 6.6 5.4 6.6 8.4c0 1.3.5 2.4 1.2 3.4C9 13.2 12 18 12 18s3-4.8 4.1-6.3c.7-.9 1.3-2.1 1.3-3.3zM16 18c2.4.3 4 .8 4 1.4 0 .9-3.6 1.6-8 1.6s-8-.7-8-1.6c0-.6 1.6-1.1 4-1.4"></path></svg>
          <span className="py-4 text-center font-medium">{d.eventLocation}</span> 
        </div>
        <EventAppDialog d={d}/>

      </div>
      
      <form method="dialog" className="modal-backdrop">
          <button >close</button>
          
        </form>
       
      </dialog>
       </>
    )
}
export default EventInfoContainer


function returnWageType(role){
    if(role=='hourly'){
      return(<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Hourly</span>)
    } else{
      return(
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Fixed</span>
  
      )
    }
  }

  function messageButton(appID,appName){
    sessionStorage.setItem('sender0uid',udata.getUserUID())
    sessionStorage.setItem('sender0name',udata.getName())
    sessionStorage.setItem('sender1uid',appID)
    sessionStorage.setItem('sender1name',appName)
    window.location.replace('/messages')
   // messagePage(udata.getUserUID(),udata.getName(),appID,appName)
}