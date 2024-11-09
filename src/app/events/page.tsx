'use client'

import { useEffect, useState } from "react"
import NavBar from "../navBar"
import Footer from "../footer"
import { eventData } from "@/firebase/data/event"
import eventInfoContainer from "@/assets/eventInfoContainer"
import userData from "../dashboard/user"
import EventInfoContainer from "@/assets/eventInfoContainer"
let edata = new eventData()
let udata = new userData
udata.parseData()
export default function eventsPage(){
    const [data, setData] = useState([])
    let results = new Array()
    const [loading, setLoading] = useState(false)
   useEffect(()=>{
    if(udata.name!=null){
      edata.getData('events','isOpen','==',true).then(async()=>{
        var res = edata.dataobjMap
        res.forEach((v,k)=>{
          var temp = JSON.parse(v)
          results.push(temp)
        })
        setData(results)
        setLoading(true)
   })
    }
},[])
useEffect(()=>{
 if(udata.name==null){
  edata.getData('events','isOpen','==',true).then(async()=>{
    var res = edata.dataobjMap
    res.forEach((v,k)=>{
      var temp = JSON.parse(v)
     if(temp.postVisibility=='Public'){
      results.push(temp)
     }
    })
    setData(results)
    setLoading(true)
})
 }
  
},[])
 return(
 <div className="min-h-screen flex flex-col justify-between">
  <div className="flex-grow font-bold">
  <h2 className="text-4xl font-bold py-4 mb-3 text-center">Newest Events </h2>
    <hr className="h-px w-full bg-gray-200 border-0 dark:bg-gray-700"/>

         <div className='grid grid-cols-5 gap-3 items-center'>
 {
    data.map((d)=>{
      return(
        <Panel isActive={loading ===true}>
           <div className="mt-10   max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50" onClick={()=> ( document.getElementById(d.eventid) as HTMLDialogElement).showModal()}>
            <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL} />

          <a href="#">
          <h5 className="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
          </a>
          <h2 className="mt-2">        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline'fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 10.5a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M17.4 8.4C17.4 5.4 15 3 12 3 9 3 6.6 5.4 6.6 8.4c0 1.3.5 2.4 1.2 3.4C9 13.2 12 18 12 18s3-4.8 4.1-6.3c.7-.9 1.3-2.1 1.3-3.3zM16 18c2.4.3 4 .8 4 1.4 0 .9-3.6 1.6-8 1.6s-8-.7-8-1.6c0-.6 1.6-1.1 4-1.4"></path></svg>{d.eventLocation}</h2>
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <ul className="flex items-center w-full me-4">
          <li className='flex items-start'>
          <svg xmlns="http://www.w3.org/2000/svg"  className='w-6 h-6 inline' fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 11.73a2.97 2.97 0 100-5.94 2.97 2.97 0 000 5.94zm0 1.89c-2.88 0-5.31 2.34-5.31 5.31v.36C8.22 20.37 10.02 21 12 21c1.98 0 3.78-.63 5.31-1.71v-.36c0-2.88-2.43-5.31-5.31-5.31z"></path></svg>
          <p className='font-medium'>:</p>
          <p className=" ml-2 text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
        
          </ul>
          </div>
          <EventInfoContainer d={d}/>

        </Panel>
      )
    })
  }
 </div>
  </div>
 </div>
 )
}

function infoModal(eventName,eventLocation){
  return(
    <dialog id={eventName} className="modal">
    <div className="modal-box">
    <form method='dialog'>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
      <h3 className="font-bold text-lg">{eventName}</h3>
      <p className="py-4">{eventLocation}</p>
    </div>
  
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
      
    </form>
  
  </dialog>
  )
}
function Panel({
    children,
    isActive
  }){
    return(
      <div className='text-center'>
               {isActive ?  (children) : null}
      </div>
    )
  }
  