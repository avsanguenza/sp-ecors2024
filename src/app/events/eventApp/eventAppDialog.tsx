'use client'

import { useState } from "react"
import userData from "@/app/dashboard/user"
import { eventFormData } from "@/firebase/data/event"
import storageData, { fileData } from "@/firebase/data/storage"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
function EventAppDialog({d}){
  let udata = new userData()
  udata.parseData()
const [loading, setLoading] = useState(false)
const [selectedFile,setSelectedFile] = useState({src:'',b64:null,type:'',name:''})
const [userEntryData,setUserEntryData] = useState({eventID:'',applicantID:'',emailAddress:'', phoneNumber:''})

    function handleUserApplication(){
      setLoading(true)
      const folderName = d.eventid
      let dataup = new fileData(folderName)
      let e = new eventFormData(udata.getUserUID(),d.eventid)
      const uploadApp = dataup.uploadFile(selectedFile).then((sn)=>{
        e.setData(udata.getName(),udata.photoURL,userEntryData.phoneNumber,userEntryData.emailAddress,sn).then(()=>{
          setLoading(false)
        window.location.replace('')
        })
      })
      toast.promise(uploadApp,{
        loading: 'Sending in your application',
        success: 'Application sent successfully!',
        error:'An error has occured please try again. '
      })
    }    

    function handleInputErrors(){
     try{
      if(userEntryData.emailAddress=='' || userEntryData.phoneNumber==''|| selectedFile.src==''){
      
        throw 'Please try again.'
      }
     else{
      const confirmDialog =   document.getElementById(d.eventName+'confirm') as HTMLDialogElement
      confirmDialog.showModal()
     }
     }catch(err){
      toast.error(err)
    }
    }

    function checkPhoneNumbers(number){
      const numStarts63 = number.slice(0,2)
      const numStart09 = number.slice(0,2)
      if(number==''){
        return false
      }else{
        if(number.length <=12){
          if(number.length<12 && numStarts63=='63'){
            return false
          }
          if(number.length<11 && numStart09=='09'){
            return false
          }
          return true
        }
        else{
          return false
        }
      }

    }
    const handleUploadChange= (e)=>{
      e.preventDefault();
      console.log(e.target.files[0])
        setSelectedFile({
          ...selectedFile,
          src: URL.createObjectURL(e.target.files[0]),
          b64: e.target.files[0],
          type: e.target.files[0].name.split(".").pop(),
          name: udata.getUserUID()
        })
    }

    const handleStateChange = (e)=>{
      e.preventDefault()
      const {name, value} = e.target
      setUserEntryData({
        ...userEntryData,
        [name] :value,
      })
    }
    function confirmDialog(d){
    return(
        <dialog id={d.eventName+'confirm'} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
       <div className='text-center'>
      <form method='dialog'>
      <div className='border border-white bg-white'>
      <h3 className="font-bold text-lg text-center ">Application Confirmation</h3>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

        <ul>
          <li className='text-lg font-semibold'> Event Name <text className='text-lg font-normal'>{d.eventName}</text></li>
          <li className='text-lg font-semibold'> Event Date:<text className='text-lg font-normal'>{d.eventDateStart} to {d.eventDateEnd} </text></li>
          <li className='text-lg font-semibold'> Event Location:<text className='text-lg font-normal'>{d.eventLocation} </text></li>
          <li className='text-lg font-semibold'> Contact Email Address: <text className='text-lg font-normal'>{userEntryData.emailAddress}</text></li>
          <li className='text-lg font-semibold'> Phone Number: <text className='text-lg font-normal'>{userEntryData.phoneNumber}</text></li>
        
        </ul>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      <div className='mx-auto mt-4 '>
      {fetchButton(loading)}

      </div>
      </form>
       </div>
        <div className="modal-action">
        <form method="dialog">
        <button className="btn absolute top-0 right-0 rounded-lg">X </button>
        </form>
        </div>
        </div>
        </dialog>
    )
    }
    function fetchButton(state){
        if(state){
          return( <button type='button' className=" w-48 text-center rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " > 
           {spinnerButton()}
                Sending application...
      </button>)
       }
       else{
        return(
        <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" onClick={()=>handleUserApplication()}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2 inline">
<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"  />
</svg>


     Submit Application</button>)
       }
      }
      const spinnerButton = ()=>{
        return(
            <svg aria-hidden="true" className="w-4 h-4 mt-1 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        )
      }
      
    return(
        
                <>
              <div>
            <form>
            <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Contact Email address: </label>
          <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='emailAddress' defaultValue={udata.email} onChange={handleStateChange}/>
          </div>
          <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Contact Information: </label>
          <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventAppEmail" name='phoneNumber' type='number' defaultValue={udata.phoneNumber} onChange={handleStateChange}></input>
          </div>
          <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="eventCreatorName">Cover Letter: </label>
      <input className='bg-white border text-gray-900 border-pink-500 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf" onChange={handleUploadChange} />
        </div>
            </form>
          </div>     
          
          <div className="text-center">

          <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" onClick={()=>handleInputErrors()}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2 inline">
<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"  />
</svg>


     Submit </button>        </div>
        {confirmDialog(d)}
                </>
    )
}
export default EventAppDialog

