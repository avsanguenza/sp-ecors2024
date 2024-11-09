'use client'

import React from 'react'
import signIn from "@/firebase/auth/signin";
import {useRouter} from 'next/navigation';
import firebase_app from '@/firebase/config';
import { getAuth, sendPasswordResetEmail, } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import  userDBClass from '@/firebase/data/userDB';
import { useState } from 'react';
import NavBar from '../navBar';
import Footer from '../footer';
import { checkIfDisabled } from '@/firebase/admin/manageAdmin';
import signOutPage from '../signout/page';
const auth = getAuth(firebase_app);


const top= () =>{
  return(
    <>
    
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 mx-auto fill-[#387478]' viewBox="0 0 24 24"><path d="M19 5c-2.321 0-4.025 2.127-5 3.779a2.952 2.952 0 0 0-4 0C9.025 7.127 7.32 5 5 5a3.718 3.718 0 0 0-3.52 2.053A4.711 4.711 0 0 0 1 9a6.549 6.549 0 0 0 .753 3A6.549 6.549 0 0 0 1 15a4.711 4.711 0 0 0 .48 1.947A3.718 3.718 0 0 0 5 19c2.32 0 4.025-2.127 5-3.779a2.952 2.952 0 0 0 4 0C14.975 16.873 16.679 19 19 19a3.888 3.888 0 0 0 4-4 6.549 6.549 0 0 0-.753-3A6.549 6.549 0 0 0 23 9a3.888 3.888 0 0 0-4-4zM5 17a1.881 1.881 0 0 1-2-2 3.927 3.927 0 0 1 .707-2.3 1 1 0 0 0 0-1.414A3.918 3.918 0 0 1 3 9.008 1.884 1.884 0 0 1 5 7c1.71 0 3.288 2.657 3.909 4H7a1 1 0 0 0 0 2h1.909C8.288 14.343 6.71 17 5 17zm7-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm8.293-1.293A3.918 3.918 0 0 1 21 14.992 1.885 1.885 0 0 1 19 17c-1.711 0-3.288-2.657-3.909-4H17a1 1 0 0 0 0-2h-1.909c.621-1.343 2.2-4 3.909-4a1.882 1.882 0 0 1 2 2 3.927 3.927 0 0 1-.707 2.3 1 1 0 0 0 0 1.407z"/></svg>
            
              
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
    </>
  )
};



function Page(){

  const [email, setEmail] = React.useState('')
  const [forgorEmail, setForgorEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const handleForm = async (event) => {
      event.preventDefault()
      setLoading(true)
        await signIn(email, password).then(async(res)=>{
        
        try{
          
          if(auth.currentUser!=null){
            var udbc = new userDBClass(auth.currentUser);
            udbc.setAccValues()
      
              await new Promise ((resolve)=> setTimeout(resolve,2000));
              setLoading(false)
              toast.success('Login success')
              window.location.replace('/')
          }
          else{
            
            setLoading(false)
            throw 'Login failed.'
          }
          
        }catch(err){
          toast.error(err)
        }
      
    }).catch((e)=>{
      toast.error(e)
    })}


  const handleForgor = async (e)=>{
      e.preventDefault()
      const sendForgorEmailReset = sendPasswordResetEmail(auth,forgorEmail)
      toast.promise(sendForgorEmailReset,{
        loading:'Preparing email reset link...',
        success : 'Reset link sent to your email! Please check your inbox.',
        error: 'Something has occured. Please try again'

      })   
  }
    
  return (
  
          <div className="flex min-h-full flex-1 flex-col justify-center py-20 lg:px-8">

          <Toaster
          containerStyle={{zIndex:99999}}
          />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleForm} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address:             
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password:
                  </label>
                  <div className="text-sm">
                    <a href="#forgorPassword" className="font-semibold text-[#387478] hover:text-[#387478]" onClick={()=>(document.getElementById('forgorModal') as HTMLDialogElement).showModal()}>
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                {fetchButton(loading,'Sign in')}
              </div>
            </form>

            <dialog id="forgorModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                    <h3 className="font-bold text-lg text-center ">Forgot Password </h3>
                    <p className="py-4 text-center">Enter the email you have used during registration:</p>
                   <div className='text-center'>
                   <form  onSubmit={handleForgor}>
                    <input
                    id="forgorEmail"
                    name="forgorEmail"
                    type="email"
                    defaultValue={forgorEmail}
                    onChange={(e)=> setForgorEmail(e.target.value)}
                    placeholder='something@mail.com'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5 text-center "
                  />
                   {fetchButton(false, 'Send password recovery email')}
                    </form>
                   </div>
                    <div className="modal-action">
                    <form method="dialog">
                    <button className="btn absolute top-0 right-0">X </button>
                    </form>
                    </div>
                    </div>
                    </dialog>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signUpPrompt" className="font-semibold leading-6 text-[#387478] hover:text-[#387478]">
                Sign up!
              </a>
            </p>
          </div>
        </div>
          
);
  }
    export default Page;

function fetchButton(state,message){
      if(state){
         return( <button type="submit" className="flex w-full inline justify-center rounded-md bg-[#387478] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#243642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " > 
          {spinnerButton()}
          {(message=='Sign in')? 'Signing In' : 'Sending Password Recovery'} </button>)
      }
      else{return(<button
        type="submit"
        className="flex w-full justify-center rounded-md bg-[#387478] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#243642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {message}
      </button>)
      }
  }
  
  const spinnerButton = ()=>{
      return(
          <svg aria-hidden="true" className="w-4 h-4 mt-1 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
      )
  }

  