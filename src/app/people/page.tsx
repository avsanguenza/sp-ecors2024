'use client'
import { useEffect,useState} from "react";
import NavBar from "../navBar";
import { userData } from "@/firebase/data/userDB";
import { eventData } from "@/firebase/data/event";
import Footer from "../footer";
import UserInfoContainer from "@/assets/userInfoContainer";

export default function peoplePage(){
const [orgData, orgSetData] = useState([])
const [concessData, setConcessData] = useState([])
    useEffect(()=>{
        const getEventOrganizers = async()=>{
            let user = new userData()
            await user.getData('users','isOrganizer','==',true).then(()=>{
            orgSetData(user.userDataObj)
            })
        }
        getEventOrganizers()
    },[])
    useEffect(()=>{
        const getEventOrganizers = async()=>{
            let user = new userData()
            await user.getData('users','isConcess','==',true).then(()=>{
            setConcessData(user.userDataObj)
            })
        }
        getEventOrganizers()
    },[])
    
            return(
            <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow font-bold">
            <h2 className="text-4xl font-bold py-4  ml-6 mb-3 text-center">ECORS Users </h2>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

           <div role="tablist" className="py-4 tabs tabs-bordered tabs-lg space-x-8 [--tab-border-color:pink] items-center" >
  <input type="radio" name="my_tabs_1" role="tab" className="tab ml-8 border-pink-500" aria-label="Organizers" defaultChecked />
  <div role="tabpanel" className="tab-content p-10">
  <div className="grid grid-cols-5 gap-3">
                {rollData(orgData)}
          </div>
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Concessionaires"  />
  <div role="tabpanel" className="tab-content p-10">
  <div className="grid grid-cols-5 gap-3">
  {rollData(concessData)}

  </div>
  </div>
</div>
            </div>
       
            </div>

            
            )
            }


function rollData(data){
    return(
        <>
          {data.map((d)=>{
        return(
            <div className="mt-10 ml-5  max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={()=>(document.getElementById(d.uid) as HTMLDialogElement).showModal()}>
    <img className="h-48 w-48 rounded-full mx-auto" src={d.userImage}/>

  <a href="#">
    
  <h5 className="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.displayName}</h5>
  </a>
  <h2 className="mt-2">{(d.isOrganizer==true)? 'Event Organizer': 'Event Concessionaire'}</h2>

 <UserInfoContainer d={d}/>
  </div>
        )
    })}
        </>
    )
}
