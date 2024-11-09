import { eventData } from "@/firebase/data/event"
import { userData } from "@/firebase/data/userDB"
import userdash from '../dashboard/user'
import UserInfoContainer from "@/assets/userInfoContainer"
import EventInfoContainer from "@/assets/eventInfoContainer"
import toast from "react-hot-toast"
let uState = new userdash()
uState.parseData()


export default async function Results(type,data,query){
    
    let results = await getEventResults(type,data,query)
  return(
    (type=='Events')? events(results) : people(results)

      
  )

}

function events(results){
  return(
<>
{results.map((d)=>{
      if(results.length>0){
        if(uState.name!=null){
          return(
            <tr onClick={()=>(document.getElementById(d.eventid) as HTMLDialogElement).showModal()} className="hover:bg-gray-50">
            <td>
              <div className="flex items-center gap-3 ">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={d.eventImageURL} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{d.eventName}</div>
                  <div className="text-sm opacity-50">{d.eventLocation}</div>
                </div>
              </div>
            </td>
            <td>
              {d.eventCreatorName}
              <br/>
            </td>
            <th hidden={uState.name==null}>
              {returnWageType(d.eventWageType)}
            </th>
            <th hidden={uState.name==null}>
              {d.eventWageTypeVal}
            </th>
            <th>
            </th>
            {
            //eventInfoContainer(d)
            }
            <EventInfoContainer d={d}/>
          </tr>
          
        )
        }else{
          if(d.postVisibility=='Public'){
            return(
              <tr onClick={()=>(document.getElementById(d.eventid) as HTMLDialogElement).showModal()} className="hover:bg-gray-50">
              <td>
                <div className="flex items-center gap-3 ">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={d.eventImageURL} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{d.eventName}</div>
                    <div className="text-sm opacity-50">{d.eventLocation}</div>
                  </div>
                </div>
              </td>
              <td>
                {d.eventCreatorName}
                <br/>
              </td>
              <th hidden={uState.name==null}>
                {returnWageType(d.eventWageType)}
              </th>
              <th hidden={uState.name==null}>
                {d.eventWageTypeVal}
              </th>
              <th>
              </th>
              {
              //eventInfoContainer(d)
              }
              <EventInfoContainer d={d}/>
            </tr>
            
          )
          }
        }
      
      }
  })}
</>
  )
}

function people(results){
  return(
<>
{results.map((d)=>{
      if(results.length>0){
          return(
          <tr onClick={()=>(document.getElementById(d.uid)as HTMLDialogElement).showModal()} className="hover:bg-gray-50">
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={d.userImage}/>
                </div>
              </div>
              <div>
                <div className="font-bold">{d.displayName}</div>
                <div className="text-sm mt-1">  {returnRole(d.isOrganizer)}</div>
              </div>
            </div>
          </td>
          <td>
           {d.userProvince+", "+d.userCity}
            <br/>
          </td>
          <th>
            {returnProfBadge(d.userCat)}
          </th>
          <th>
          <button type="button" className="text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:ring-pink-500 focus:outline-pink-500 font-medium rounded-full text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"> Details</button>

          </th>
          <UserInfoContainer d={d}/>
        </tr>
      )
      }
  })}
</>
  )
}
async function getEventResults(type,data,query){
 let e = new eventData()
 let u = new userData()
 let tempResults = new Array()
 var conditions = []
try{
  if(data.length>0){
    switch(type){
        case 'Events':  e.getMultipleFieldData('events',data)
        await new Promise ((resolve)=> setTimeout(resolve,2000));
        var obj= e.dataobjMap
        obj.forEach((v,k)=>{
           var temp = JSON.parse(v)
           if(temp.eventName.includes(query) || temp.eventCreatorName.includes(query)|| temp.eventLocation.includes(query)){
            tempResults.push(temp)

           }
    
       })
       break;
       case 'People' : u.getData('users','displayName','>=',query)
       await new Promise ((resolve)=> setTimeout(resolve,2000));
      let Uobj = u.userDataObj
       Uobj.forEach((v)=>{
     var temp = v.displayName
        if(v.displayName.includes(query)){
            tempResults.push(v)
    
        }
    })
       break;
       default: break;
    }
 }
} catch(err){
toast.error('An error has occured please try again.')
}
return tempResults
}

function returnRole(role){
  if(role){
    return(
      <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-700 dark:text-pink-400 border border-pink-400">Organizer</span>

    )
  }
  else{
    return(
      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Concessionaire</span>

    )
  }
}

function returnProfBadge(prof){
  switch(prof){
    case 'Arts':
    return(
      <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{prof}</span>

    )
    case 'Consumer Goods': 
    return(
      <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{prof}</span>

    )
    case 'Entertainment': 
    return(
      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{prof}</span>

    )
    case 'Media and Communication':
      return(
        <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{prof}</span>

      )
    case 'Recreation and Travel': 
    return(
      <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{prof}t</span>
    )
    case 'Transportation and Logistics': return(
      <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{prof}</span>

    ) 
    default: break;
  }
}

function returnWageType(role){
  if(role=='hourly'){
    return(<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Hourly</span>)
  } else{
    return(
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Fixed</span>

    )
  }
}