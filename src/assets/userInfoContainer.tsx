import userData from "@/app/dashboard/user";
import { useEffect,useState } from "react";
import { eventData, eventFormData } from "@/firebase/data/event";
let udata = new userData();
udata.parseData()
function UserInfoContainer({d}){
  let edata = new eventData()
  const [userExp, setUserExp] = useState([])
  const {isOrganizer } = d

  useEffect(()=>{
    const {uid } = d
    if(isOrganizer){
    try{  edata.getData('events','userid','==',uid).then(()=>{
      var temp = edata.dataobjMap
      var newArray = new Array()
      temp.forEach((v,k)=>{
        var tempRes = JSON.parse(v)
        newArray.push(tempRes)
      })
      setUserExp(newArray)
    })}catch(err){
      console.log(err)
    }
    }
    else{
      let efdata = new eventFormData(udata.getUserUID,'')
      efdata.getSpecificData('userid','==',uid).then(async()=>{
        await new Promise ((resolve)=> setTimeout(resolve,2000));
            var tempData = efdata.applicantFileObj
          
          setUserExp(tempData)
      })
    }
  },[])
    return(
        <dialog id={d.uid} className="modal">
        <div className="modal-box">
        <form method='dialog'>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h5 className="font-bold text-2xl mb-4">User Details</h5>
        <div className="flex items-start">
        <img src={d.userImage} className="h-12 w-12 rounded-full"></img>
        <h3 className="font-regular text-lg ml-4 mt-3">{d.displayName}</h3>
        <h2 className="text-lg font-medium ml-8 mt-3">Member Since:  {d.creationDate}</h2>
        </div>
        <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <p className="py-4 font-bold text-2xl mb-4">Recent Events Participated</p>
        {userExp.map((d)=>{
         if(udata.name==null){
            if(d.postVisibility=='Public'){
              return( <p className="font-medium text-xl mb-1">{d.eventName} - {d.eventDateStart}</p>)
            }
         }
         else{
          return( <p className="font-medium text-xl mb-1">{d.eventName} - {d.eventDateStart}</p>)
         }
        })
        
        }
        <div className="text-center">
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" hidden={udata.name==null}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 inline">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

          Contact user</button>
        </div>
        </div>
    
        <form method="dialog" className="modal-backdrop">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        
        </form>
    
    </dialog>
    )
}
export default UserInfoContainer;