'use client'

import NavBar from "@/app/navBar"
import Footer from "@/app/footer"
import { useState } from "react"
import userData from "../../user"
import { Transition,Dialog } from "@headlessui/react"
import { Fragment } from "react"
import toast from "react-hot-toast"
let udata = new userData()

udata.parseData();
export default function Page(){

 return(
        <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow font-bold">
        {settingTabs()}
        </div>
        </div>
  
 )
}
function settingTabs(){

    const [isAppOpen, setAppOpen] = useState(false)
    const [newCred, setNewCred] = useState({p0:'',pw1:'',pw2:''})
    function closeAppModal(){
        setAppOpen(false)
    }
    function openAppModal(){
        setAppOpen(true)
    }

    const handleInput = (e)=>{
      const {name, value} = e.target

      setNewCred({
      ... newCred,
       [ name]:value,
      })
    }
    
    const updatePassword = ()=>{
    try{const message= udata.changePassword(newCred.p0,newCred.pw1,newCred.pw2)
    toast.promise(message,{
      loading: 'Updating password',
      success: 'Password successfully updated',
      error:'An error has occurred. Please try again later.'
    }
    )}catch(err){
      toast.error(err)
    }
    }
    return(
        
<>

<div className="ml-10 mt-10 md:flex">
        <ul className="flex-column space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
        <a href="/dashboard/settings" className="inline-flex items-center px-3 py-5 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-[#E2F1E7] w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" aria-current="page">
        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        Profile Settings
        </a>
        </li>
        <li>
        <a href="#" className="inline-flex items-center px-3 py-5 text-white bg-[#387478] rounded-lg active w-full dark:bg-pink-600">
        <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/></svg>
        Account Settings
        </a>
        </li>
        </ul>
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-[2rem]">Account Settings</h3>
        <hr className="h-px my-full bg-gray-200 border-0 dark:bg-gray-700 mb-4"/>

        <p className="mt-8 text-center mr-[15rem] mb-3 text-2xl font-semibold text-gray-800">Change Password</p>
        <div className="mt-2 max-w-md mx-auto border border-gray-300 rounded-lg p-4 ">
          
        <form>
        <label htmlFor='currpw' className="block mb-2">Current Password:</label>
        <input type="password" name="p0" id="floating_email" className="mb-4 block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border border-gray-500 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#387478] focus:outline-none focus:ring-0 focus:border-pink-600 peer" onChange={handleInput} />
        <div className="inline-block space-y-2">
        <div>
        <label htmlFor='pw' className="mr-2">New Password: </label>

          <input type="password" name="pw1" id="floating_email" className="ml-6 py-2 px-0 w-59 text-sm text-gray-900 bg-transparent border border-gray-500 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#387478] focus:outline-none focus:ring-0 focus:border-pink-600 peer"  onChange={handleInput}/></div>
      <div>
      <label htmlFor='pw2 ' className="mr-2">Confirm password: </label>

        <input type="password" name="pw2" id="floating_email" className="py-2 px-0 w-59 text-sm text-gray-900 bg-transparent border border-gray-500 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#387478] focus:outline-none focus:ring-0 focus:border-pink-600 peer" onChange={handleInput}/>

      </div>
        </div>
        <button type="button" className="text-center text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex  text-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mt-10" onClick={()=>updatePassword()}>
      
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>


 Change Password      </button>
        </form>
        </div>
        <hr className="mt-4 h-px my-full bg-gray-200 border-0 dark:bg-gray-700"/>

        {/**<div className="text-center mt-10">
        <p className="mt-8 text-center mr-[13rem] mb-3 text-2xl font-semibold text-gray-800">Account Deactivation</p>
        <div className="mt-2 max-w-md mx-auto border border-gray-300 rounded-lg p-4 ">

        <button type="button" className="text-white bg-red-700 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>openAppModal()}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
Deactivate Account
</button>
        </div>
     
        </div>
        */}
        </div>
        
        </div>
     
        <Transition appear show={isAppOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeAppModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>


              <Dialog.Panel className='w-96 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>      
                <div className="text-center">
                <Dialog.Title as="h3" className="text-2xl font-semibold mb-10">Deactivating Account
                </Dialog.Title>
                </div>
                <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

            <div className="mb-15 text-center">
                Are you sure you would like to deactivate your account?
            </div>
            <hr className="h-px w-full my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <div className=" mt-5 mx-auto text-center">
                    <button type="button" className="text-white bg-gray-200 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>closeAppModal()} >
    
Cancel        </button>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" >
   Continue 
        </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
</>
    )
}
const spinnerButton = ()=>{
    return(
        <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    )
}