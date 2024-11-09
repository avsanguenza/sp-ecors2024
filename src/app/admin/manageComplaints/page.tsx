'use client'
import { useEffect, useState } from "react";
import { userComplaint } from "@/firebase/data/userDB";
import { eventData } from "@/firebase/data/event";
import toast from "react-hot-toast";
export default function manageComplaints(){
const [complaintData, setComplaintData] = useState([])
useEffect(()=>{
 let ucomp = new userComplaint()
 const getComplaints = async()=>{
  ucomp.getComplaint().then(()=>{
      setComplaintData(ucomp.dataObj)
  })
 }
 getComplaints()
},[])
function disableEvent(uid){
  let edata = new eventData()
  const eventupdate = edata.updateAttribute(uid, 'isOpen', false)
  toast.promise(eventupdate,{
    loading:'Updating event',
    success:'Event successfully updated',
    error:'An error has occured please try again'
  })
}
return(
      <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Unresolved" defaultChecked/>
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
            {tableHeaders()}
            {
              complaintData.map((d)=>{
              if(!d.isResolved){
                return(
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
                  even:dark:bg-gray-800 border-b dark:border-gray-700 hover:opacity-90" onClick={()=>(document.getElementById(d.complaintid+'modal') as HTMLDialogElement).showModal()} >
          
        
                                    <th scope="row" className="px-6 py-4">
                                       {d.complaintUser}
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {d.complaintEventName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {d.complaintEventCreator}
                                    </td>
                                    <td className="px-6 py-4">
                                          {d.complaintPeek}  
                                    </td>
                                     <td className="px-6 py-4 space-x-2" >
                                     <button className="text-center bg-red-500 hover:bg:red-700 text-white font-bold text-medium px-4 py-3 rounded-full" onClick={()=> disableEvent(d.complaintEventUID)}  hidden={d.isResolved} > Remove Event</button>
                                    </td>
                                    {zoomComplaint(d)}
                  </tr> 
                )
              }
              })
            }
            </table>
  </div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Resolved"/>
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
            {tableHeaders()}
            {
              complaintData.map((d)=>{
                if(d.isResolved){
                  return(
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
                    even:dark:bg-gray-800 border-b dark:border-gray-700 hover:opacity-70" onClick={()=>(document.getElementById(d.complaintid+'modal') as HTMLDialogElement).showModal()}>
            
          
                                      <th scope="row" className="px-6 py-4">
                                         {d.complaintUser}
                                      </th>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {d.complaintEventName}
                                      </td>
                                      <td className="px-6 py-4">
                                          {d.complaintEventCreator}
                                      </td>
                                      <td className="px-6 py-4">
                                            {d.complaintPeek}  
                                      </td>
                                       <td className="px-6 py-4 space-x-2" >
                                       <button className="text-center bg-red-500 hover:bg:red-700 text-white font-bold text-medium px-4 py-3 rounded-full" onClick={()=> disableEvent(d.complaintEventUID)}  hidden={d.isResolved}> Remove Event</button>
                                      </td>
                                      {zoomComplaint(d)}
                    </tr> 
                  )
                }
              })
            }
            </table>
  </div>
 
</div>
          
)
}
function zoomComplaint(d){
  return(
<dialog id={d.complaintid+'modal'} className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Complaint Details</h3>
    <ul>
          <li className='text-lg font-semibold'> Event Name <text className='text-lg font-normal'>{d.complaintEventName}</text></li>
          <li className='text-lg font-semibold'> Event Organizer:<text className='text-lg font-normal'>{d.complaintEventCreator}</text></li>
         
          <li className='text-lg font-semibold'> Complaint: <text className='text-lg font-normal'>{d.complaint}</text></li>
         
        
        </ul>
  </div>
</dialog>
  )
}
function tableHeaders(){
    return(
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" className="px-6 py-3">
             Complainant 
          </th>
          <th scope="col" className="px-6 py-3">
          Event Name
          </th>
          <th scope="col" className="px-6 py-3">
            Event Organizer
          </th>
          <th scope="col" className="px-6 py-3">
            Complaint
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
      </tr>
  </thead>
    )
  }
