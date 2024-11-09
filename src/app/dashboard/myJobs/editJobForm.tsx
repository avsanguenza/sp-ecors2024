import {Fragment, useState,useEffect, useRef} from 'react';
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import {imageData} from '@/firebase/data/storage'
import {eventData} from '@/firebase/data/event'
import { select } from '@material-tailwind/react';


function editForm(eventUID,eName, eventDate, eventLoc, eventDesc, eventWT, eventWTVal){
    const eventName = useRef(eName);
    const createDate = useRef(eventDate);
    const createLoc = useRef(eventLoc);
    const createDescription = useRef(eventDesc)
    const createWageType = useRef(eventWT)
    const createWageTypeVal = useRef(eventWTVal)
  
    const [isOpen, setIsOpen] = useState(false)
  
    const [selectedFile, setSelectedFile] = useState({src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9hZ_fn1p0GQsP8Ehynpd7sNAHWz0CZXiMNLGo0b0RA&s',blob:'',name:''})
    const [uploaded, setUploaded] = useState(null)
    const imageRef = useRef(null)

    let e = new eventData()
  
function closeModal(){
    setIsOpen(false)
}

function openModal(){
    setIsOpen(true)
}
  
const handleSubmit = (event) =>{
      event.preventDefault();
       sessionStorage.setItem('eventName',eventName.current.value)
       sessionStorage.setItem('createLoc',createLoc.current.value);
       sessionStorage.setItem('createDate', createDate.current.value)
       sessionStorage.setItem('createDesc', createDescription.current.value)
       if(document.querySelector('input[name="jobWageType"]:checked')==null){
        sessionStorage.setItem('createWageType',eventWT)
       }
       else{
        sessionStorage.setItem('createWageType',(document.querySelector('input[name="jobWageType"]:checked') as any).value)
       }
      if(sessionStorage.getItem('createWageType')=='hourly'){
        sessionStorage.setItem("createWageTypeVal",( document.getElementById('jobWageHourly') as any).value)
      }
      else{
        sessionStorage.setItem("createWageTypeVal",( document.getElementById('jobWageSum') as any).value)
  
      }
       setIsOpen(true)
}

function handleUpload () {
  const folderName = 'event'
  let imgup = new imageData(folderName);
//  console.log(selectedFile)
  imgup.uploadImage(selectedFile,eventName.current.value).then(()=>
    alert("File uploaded.")
  ).catch((err)=>{
    console.log(err)
  })
}

function handleUploadChange(e){
  setSelectedFile({
    ...selectedFile,
    src: URL.createObjectURL(e.target.files[0]),
    blob: e.target.files[0],
    name: e.target.name
  })
}
function eventPlaceHandler(){
    var cities = ['Caloocan', 'Manila','Malabon','Makati']
    const select = document.getElementById('eventWork')

    return(
    <div>
        <select id="eventWork" className='bg-white rounded px-5 py-4 border border-pink-500 disabled:bg-pink-500 disabled:text-white disabled:opacity-70' ref={createLoc} disabled>
        <option selected={eventLoc}>{eventLoc}</option>
        <option value='Caloocan'> Caloocan </option>
        <option value='Manila'> Manila</option>
        </select>
    </div>
    )
}
  
  function radioHandler(){
    if(eventWT=='hourly'){
      return(
        <>
          <li>
                  
                  <input defaultChecked type='radio' id='jobWTypeH' name='jobWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')}  ref={createWageType}></input>
                  <label className="ml-3"  >Hourly Rate:</label>
            
                  <input type="number" 
                  min="0" 
                  step="1"
                  id="jobWageHourly"
                  name ='jobWageValue'
                  className="ml-3 w-24 ring-2 disabled:bg-pink-500 disabled:text-white disabled:opacity-70" 
                  placeholder={getInitialRadioValue(eventWT) ? eventWTVal : 0} 
                  defaultValue={getInitialRadioValue(eventWT) ? eventWTVal : 0}
                  onClick={()=> document.getElementById}
                  required 
                  ref={createWageTypeVal.current}
                  disabled />
                  <label> per Hour</label>
                  </li>
                  <li>
                  <input type='radio' id='jobWTypeF' name='jobWageType' value='fixed' onClick={()=> fieldHandler('jobWageHourly','jobWageSum') }  ref={createWageType}>
                  </input>
                  <label className="ml-3">Fixed Rate:</label>
                  
                  <input type="number" 
                  min="0"
                  step="1"
                  id="jobWageSum" 
                  name ='jobWageValue' 
                  className="ml-3 mt-4 w-24 ring-2 disabled:bg-pink-500 disabled:text-white disabled:opacity-70" 
                  placeholder={getInitialRadioValue(eventWT) ? 0 : eventWTVal} 
                  defaultValue={getInitialRadioValue(eventWT) ? 0 : eventWTVal}
                  required
                  ref={createWageTypeVal.current}
                 disabled/>
            
                  <label className='ml-3'>PHP</label></li>
        </>
      )
    }
    else{
      return(
        <>
        <li>
                
                <input type='radio' id='jobWTypeH' name='jobWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')} ref={createWageType}></input>
                <label className="ml-3"  >Hourly Rate:</label>
          
                <input type="number" min="0" id="jobWageHourly" name ='jobWageValue' className="ml-3 w-24 ring-2 disabled:bg-pink-500 disabled:text-white disabled:opacity-70"  placeholder={eventWTVal}  required ref={createWageTypeVal} defaultValue={getInitialRadioValue ? 0: eventWTVal} disabled />
                <label> per Hour</label></li>
                <li>
                <input defaultChecked type='radio' id='jobWTypeF' name='jobWageType' value='fixed' onClick={()=> fieldHandler('jobWageHourly','jobWageSum') } ref={createWageType}>
                </input>
                <label className="ml-3">Fixed Rate:</label>
                <input type="number" min="0" id="jobWageSum" name ='jobWageValue' className="ml-3 mt-4 w-24 ring-2 disabled:bg-pink-500 disabled:text-white disabled:opacity-70" placeholder={eventWTVal}  defaultValue={ eventWTVal} required ref={createWageTypeVal} disabled/>
          
                <label className='ml-3'>PHP</label></li>
      </>
    )
      
    }
  }

  async function updateData(eventUID,eName, eventDate, eventLoc, eventDesc, eventWT, eventWTVal){
    e.updateData(eventUID, eName, eventDate, eventLoc, eventDesc, eventWT, eventWTVal).then(()=>{
    })
  }

  function updateAll(eventUID, eName, eventDate, eventLoc, eventDesc, eventWT,eventWTVal){
    updateData(eventUID,eName, eventDate, eventLoc, eventDesc, eventWT,eventWTVal).then(()=>
      handleUpload()
    ).then(()=>{
      closeModal()
      alert("Entry Sueccessfully Updated!")
     window.location.replace('/dashboard/myJobs')
    })
  }
  function form(){
    return(
        <form onSubmit={handleSubmit}>
        <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-2">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" > Event Image: </label>
        <img src={selectedFile.src} className="mx-auto h-32 max-w-lg rounded-lg border border-pink-500 mb-4"></img>  

        <input id="file_input" type="file" className='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700'  onChange={handleUploadChange} ref={imageRef}/>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
     
        </div>
        <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Event Name: </label>
        
        <input className="appearance-none block w-full bg-white text-gray-700 border border-pink-500 focus: border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white disabled:bg-pink-500 disabled:text-white disabled:opacity-70" id="eventName" placeholder={eName} defaultValue={eName} ref={eventName} disabled></input>
        
        </div>
        <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-first-name"> Event Date</label>
           
        <input type='date' id='eventDate' className='mt-3 mb-4 rounded py-3 px-4  bg-white border border-pink-500 focus:ring-pink-500 focus: border-pink-500 disabled:bg-pink-500 disabled:text-white disabled:opacity-70' defaultValue={eventDate} onChange={()=>(dateHandler(document.getElementById('eventDate')))}  ref={createDate} disabled></input>
        </div>
        <div>
      
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="file_input">Event Location</label>
          {eventPlaceHandler()}
        </div>
        <div>
          
        <label className="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="file_input">Event Job Description</label>

        <textarea  rows={4} id='jobDescription' className=" text-gray-900 bg-white rounded-lg border border-pink-500 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 focus:border-pink-500 disabled:bg-pink-500 disabled:text-white disabled:opacity-70" placeholder={eventDesc} ref={createDescription} disabled></textarea>
    
        </div>
        <div>
          <label className=" mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Wage</label>
          <ul>
          {radioHandler()}
          </ul>
        </div>      
        <button  type='submit' className="mx-auto mt-4 text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Next</button>
     
    </form>
    )
  }
  function confirmDetails(){
    return(
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-96 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
            
                <div className="text-center">
                <Dialog.Title as="h2"  className="text-lg font-medium leading-6 text-gray-900"> Confirm Details</Dialog.Title>
                </div>
                <div className='mt-8 text-center space-x-2'>
                     <p> Event Name: {sessionStorage.getItem("eventName")}</p>
                      <p>Event Date: {sessionStorage.getItem("createDate")}</p>
                      <p>Event Location: {sessionStorage.getItem("createLoc")}</p>
                      <p>Event Description: {sessionStorage.getItem("createDesc")}</p>
                      <p>Event Wage Type : {sessionStorage.getItem("createWageType")}</p>
                      <p>Event Wage Type Val: {sessionStorage.getItem("createWageTypeVal")}</p>
                      
                      <div className='mt-8'>
                        
                    <button type="button" className="text-white bg-pink-400 hover:bg-pink-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>closeModal()}>
              
                 Cancel
                </button>
                <button type="button" className="text-white bg-pink-400 hover:bg-pink-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"  onClick={()=>updateAll(eventUID,sessionStorage.getItem("eventName"),sessionStorage.getItem("createDate"),sessionStorage.getItem('createLoc'),sessionStorage.getItem('createDesc'),sessionStorage.getItem('createWageType'),sessionStorage.getItem('createWageTypeVal'))}>


                              Confirm
                </button>
                                  </div>
                            </div>
                            

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
    )
  }
  
    return(
      <>
      
      <div className='flex items-start'>
  
      <button type="button" className="text-white bg-pink-400 hover:bg-pink-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>editButton()}>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-4">
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
  </svg>   Edit information
      </button>
      </div>
      {form()}

      {confirmDetails()}
      
      </>
    )
  }
  
export default editForm;
  
  
function fieldHandler(id1, id2){
    (document.getElementById(id1) as any).disabled=true;
    (document.getElementById(id1) as any).placeholder="";
   ( document.getElementById(id1) as any).value='';
   (document.getElementById(id2) as any).disabled=false;
}

function dateHandler(eventDate){
    const date  = new Date();
    let currDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    if(Date.parse(eventDate) < Date.parse(currDate)){
      alert('You cannot set an event in the past.')
    }
    return currDate
}

function editButton(){
    (document.getElementById('eventName') as HTMLButtonElement).disabled=false;
    (document.getElementById('eventDate') as HTMLButtonElement).disabled=false;
    (document.getElementById('jobDescription') as HTMLButtonElement).disabled=false;
    (document.getElementById('eventWork') as HTMLButtonElement).disabled=false;
    (document.getElementById('jobWTypeH') as HTMLButtonElement).disabled=false;
    (document.getElementById('jobWageHourly') as HTMLButtonElement).disabled=false;
    (document.getElementById('jobWTypeF') as HTMLButtonElement).disabled=false;
    (document.getElementById('jobWageSum') as HTMLButtonElement).disabled=false;
  
  
  
  } 
  
function getInitialRadioValue(eventWT){
    if(eventWT =='hourly'){
      return true
    }
    else{
      return false
    }
  }
  