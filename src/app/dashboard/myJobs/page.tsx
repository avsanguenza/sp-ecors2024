'use client'
import {Fragment, useState,useEffect, useRef} from 'react';
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/navigation";

import {eventData,eventFormData} from '@/firebase/data/event'
import userData from '../user';
import jobAppList from './jobApplications';
import EditPage from './editJobPosted/editPage';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
const auth = getAuth(firebase_app);

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
  const[activeIndex, setActiveIndex] = useState(0);
  const [data,setData] = useState([])
  const [appFormData, setAppFormData] = useState([])

 
  var obj = localStorage.getItem('currentUser')
  var accInfo = JSON.parse(obj)
  
  var udata = new userData()
  udata.parseData()
  var edata = new eventData();
  var edfata = new eventFormData()
  var results = new Array;

  useEffect(()=>{
    edata.getData('events','userid','==', accInfo.uid).then(()=>{
      var output = edata.dataobjMap
     output.forEach((v,k)=>{
      var temp = JSON.parse(v)
      temp['appCount']= edfata.getEntryCount(temp.eventid);
      results.push(temp)
     })
       setData(results)
       setActiveIndex(1)

    }
    ).catch((err)=>{
      alert(err)
    })
    

  },[])

    return (
    
       <div className="min-h-screen flex flex-col justify-between">
       <div className="flex-grow font-bold">
       <div className='mt-4 mx-auto '>
        <button type="button" className="mb-10 text-white bg-[#629584] hover:bg-[#243642] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"  onClick={()=>window.location.href="/dashboard/myJobs/createJob"}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 me-2">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
</svg>
  Create Event
</button>

        </div>
        {
          eventDataTabs(data,appFormData)
        } 
        </div>
    
          <Toaster/>
          </div>

    );

}

function eventApplicationTabs(){
  return(
    <div className='px-3 mt-8 flex flex-wrap mx-auto text-center'>
      

      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
              <a href="#" aria-current="page" className="inline-block p-4 text-[#8aa192] bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">All</a>
          </li>
          <li className="me-2">
              <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Active</a>
          </li>
          <li className="me-2">
              <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Inactive</a>
          </li>
          <li className="me-2">
              <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Archived</a>
          </li>
      </ul>

    </div>
  )
}

function eventDataTabs(data, appFormData){
  const[activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [isAppOpen, setIsAppOpen] = useState(false)

  const [dialogTitle, setDialogTitle] = useState('')
  const [date, setDate] = useState('');
  const [desc,setDesc] = useState('')
  const [location,setLocation] = useState('')
  const [eventWT, setEventWT] = useState('')
  const [eventWTVal, setEventWTVal] = useState('')
  const [eventUID, setEventUID] = useState('')
  const [eventAppData, setEventAppData] = useState([])
  const [isChecked, setIsChecked] = useState()
  
  const[loading, setLoading] = useState(false)
  var edata = new eventData();
  var udata = new userData();
  
  udata.parseData();
  useEffect(()=>{
      setActiveIndex(1)
  },[])

  function closeModal(){
    setIsOpen(false)
 }
 function openModal(){
   setIsOpen(true)
 }

 function closeAppModal(){
  setIsAppOpen(false)
}

function openAppModal(){
 setIsAppOpen(true)
}

function viewAppForm(eventid){
  let efd = new eventFormData(udata.getUserUID,eventid);
  let formResults = new Array();
  efd.getData().then(()=>{
    let res = efd.eventDataObj;
    res.forEach((v,k)=>{
      var temp = JSON.parse(v)
      formResults.push(temp)
    })
    return(
      formResults
    )
  }).then((res)=>{
    setEventAppData(res)
    setEventUID(eventid)
    const eventidapp =   document.getElementById(eventid+'app') as HTMLDialogElement
    eventidapp.showModal()
  })
}

function update(uid,value){ 
  checkHandler()
  //console.log(isChecked)
  const stat= edata.updateAttribute(uid,'isOpen',!value)
  toast.promise(stat,{
    loading:'Updating event',
    success:'Event successfully updated!',
    error:'An error has occured please try again later.'
  }).then(()=>{
    window.location.replace('/dashboard/myJobs')
  })
 // window.location.replace('/dashboard/myJobs')
}
const checkHandler = () =>{
  //setIsChecked(!isChecked)
}

function tableHeaders(){
  return(
    <thead className="text-xs text-white uppercase bg-[#629584] dark:bg-gray-700 dark:text-gray-400">
    <tr>
    <th scope="col" className="px-6 py-3">
           
        </th>
    <th scope="col" className="px-6 py-3">
           Status
        </th>
        <th scope="col" className="px-6 py-3">
           Event name
        </th>
        <th scope="col" className="px-6 py-3">
            Location
        </th>
        <th scope="col" className="px-6 py-3">
            Wage Type
        </th>
        <th scope="col" className="px-6 py-3">
            Wage Posted
        </th>
        <th scope="col" className="px-6 py-3">
            Applications Received
        </th>
        <th scope="col" className="px-6 py-3">
            Action
        </th>
        
    </tr>
</thead>
  )
}

function statusTag(status){
  if(!status){
   return( 
    <span className="bg-gray-300 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</span>
  )
  }
  else{
    return(
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>
    )
  }
}

function returnCheckID(eventuid){
  return ("checkbox-"+eventuid)
}

function fetchButton(state){
  if(state){
    return( <button type='button' className=" w-48 text-center rounded-md bg-[#629584] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#243642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " > 
     {spinnerButton()}
     Saving Event Data </button>)
 }
 else{return(
 <button type='button'
   className="w-48 text-center rounded-md bg-[#629584] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#243642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  >
  Confirm Event 
 </button>)
 }
}
function actualEditDialog(d){
  return(
     <dialog id={d.eventid} className="modal modal-top overflow-y-auto rounded-lg">
                    <div className="modal-box bg-white w-10/12 mx-auto  ">
                   <div className='text-center'>
                  <form method='dialog'>
                  <div className='border border-white bg-white'>
                  <p className='text-start ml-20 text-4xl font-bold py-4  ml-6'>  Editing Event : {d.eventName}</p>
                  </div>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 overflow-y-visible"/>
                    
                     <EditPage data={d}/>
                  <div className='mx-auto'>
                 
                  </div>
                  </form>
                   </div>
                    <div className="modal-action">
                    <form method="dialog" className='' >
                    <button className="btn absolute top-0 right-0 rounded-lg">X </button>
                    </form>
                    </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
                    </dialog>
  )
}

function viewPositionRequests(d){
  return(
    <dialog id={d.eventid+'app'} className="modal modal-top ">
    <div className="modal-box bg-white w-10/12 mx-auto">
   <div className='text-center'>
  <form method='dialog'>
  <div className='border border-white bg-white'>
  <p className='text-start ml-20 text-4xl font-bold py-4  ml-6'>  Job Application Requests : {d.eventName}</p>
  </div>
  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
  
     {jobAppList(eventAppData,d.eventid)}
  <div className='mx-auto'>
 
  </div>
  </form>
   </div>
    <div className="modal-action">
    <form method="dialog">
    <button className="btn absolute top-0 right-0 rounded-lg">X </button>
    </form>
    </div>
    </div>
    <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
    </dialog>
  )
}
  return(
    <div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">

      {tableHeaders()}
        
        <tbody id='tablebody'>
          <Panel isActive={activeIndex===0}>
            {
  
           data.map((d)=>{ 
            return(
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className='px-5'>
                            
              <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" id={d.eventid+'check'} value="" className="sr-only peer" defaultChecked={d.isOpen} onChange={()=>update(d.eventid,d.isOpen)}/>
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#495c50] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#8aa192]"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"/>
              </label>
              </th>
              <th>

              {statusTag(d.isOpen) }

              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {d.eventName}
              </th>
              <td className="px-6 py-4">
                  {d.eventLocation}
              </td>
              <td className="px-6 py-4">
                  {d.eventWageType}
              </td>
              <td className="px-6 py-4">
              &#8369; {d.eventWageTypeVal}
              </td>
              <td className="px-6 py-4 space-x-2" >
              {d.appCount}
              </td>
              <td className="px-6 py-4 space-x-2" >
                
              <button type="button" className="text-white bg-[#629584] hover:bg-[#243642] focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-[#243642] dark:focus:ring-[#243642]" onClick={()=>viewAppForm(d.eventid)}>View Applications</button>  |  
              <button type="button" className="text-white bg-[#8aa192] hover:bg-[#495c50] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#8aa192] dark:hover:bg-[#8aa192] dark:focus:ring-[#495c50]" onClick={()=>(document.getElementById(d.eventid) as HTMLDialogElement).showModal()}> Edit</button>
            
              </td>
              {viewPositionRequests(d)}
              {actualEditDialog(d)}
          </tr>
            )
           })
        }
        
          </Panel>
        </tbody>
    </table>

    <Transition appear show={isAppOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeAppModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>


              <Dialog.Panel className='w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>      
                <div className="text-center">
                <Dialog.Title as="h3">{dialogTitle}</Dialog.Title>
                </div>
                
             
                  {
                    jobAppList(eventAppData,eventUID)
                  }
                
              
                  
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
</div>

    </div>
  )
}

const spinnerButton = ()=>{
  return(
      <svg aria-hidden="true" className="w-4 h-4 mt-1 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
  )
}


function Panel({
  children,
  isActive
}){
  return(
    <>
        {isActive ? skeleton() : (children) }
    </>
  )
}

function skeleton(){
  return(
       <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </th>
                <td className="px-6 py-4">
                <div className="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </td>
                <td className="px-6 py-4">
                <div className="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
                <td className="px-6 py-4">
                <div className="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
                <td className="px-6 py-4">
                <div className="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
            </tr>
  )
}



