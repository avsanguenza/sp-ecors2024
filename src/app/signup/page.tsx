//TODO: Change localStorage > sessionStorage

'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import  userDBClass from '@/firebase/data/userDB';
import NavBar from "../navBar";
import Footer from "../footer";


const auth = getAuth(firebase_app);

function getRole(userType){
    if(userType=="eOrganizer"){
        return "recruit talents"
    }
    else{
        return "find opportunities"
    }
}
function normalize(userType){
    if(userType=="eOrganizer"){
        return "Event Organizer"
    } 
    else{
        return "Event Concessionaire"
    }   
}
function reverse(userType){
    if(userType=="eOrganizer"){
        return "eConcess"
    }
    else{
        return "eOrganizer"
    }
}
function getTypeOfEmail(userType){
    if(userType=="eOrganizer"){
        return "Work E-mail Address:"
    }
    else{
        return "E-mail Address:"
    }
}
function Page() {
    var userType = localStorage.getItem('fromSUPage');
    //name, location, name of company, email, address, contact number
    const [accType,setAccType]= React.useState(userType)
    const[role,setRole] = React. useState(getRole(userType))
    const [readableName, setReadableName] = React.useState(normalize(userType));
    const [reverseName, setReverseName] = React.useState(reverse(userType));
    const[typeOfEmail, setTypeOfEmail] = React.useState(getTypeOfEmail(userType));

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()
  //  console.log(localStorage.getItem('SUType'))
    const handleForm = async (event) => {
        event.preventDefault()
       try{
        const result= await signUp(accType,name,email, password).then(() =>{

          var udbc = new userDBClass(auth.currentUser);
           udbc.setAccValues()
           }
    
            ).catch((err)=>{console.log(err)})
           ;
       }
        catch(error){
            return console.log(error);

        }

       return router.push("/dashboard")
        
    }

const onOptionChange = (f)=>{
 
    setAccType(f.target.value)
    setReadableName(normalize(f.target.value))
    setRole(getRole(f.target.value))
    setReverseName(reverse(f.target.value))
    setTypeOfEmail(getTypeOfEmail(f.target.value))
   localStorage.setItem('fromSUPage',f.target.value);
}
return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="form-wrapper">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to {role}</h2>
                <form onSubmit={handleForm} className="space-y-6 mt-16" >
                    
                    <div>
                        
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                Name:             
                        </label>

                        <div className="mt-4">
                            <input onChange={(e)=> setName(e.target.value)} 
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                        
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                               {typeOfEmail}                
                        </label>

                        <div className="mt-4">
                            <input onChange={(e)=> setEmail(e.target.value)} 
                        id="email"
                        name="email"
                        required type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                            <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                Password:               
                    </label>

                        <div className="mt-4">
                            <input onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                    </div>
                     <div>

               <div>
               <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#387478] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#243642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
               </div>


             
              </div>
                </form>
                <div>
                    Register as  <button type="reset" onClick={onOptionChange} value = {reverseName} className="mt-10 text-[#387478] underline underline-offset-1">  {normalize(reverseName)}</button> instead
                </div> 
            </div>
        </div>
    
       
    );
}

export default Page;