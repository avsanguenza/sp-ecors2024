'use client'
import Loading from './loading';
import Results from './results';
import { Suspense } from 'react';
import { eventData } from '@/firebase/data/event';
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { where } from 'firebase/firestore';
import userData from '../dashboard/user';
let u = new userData()
u.parseData()
function searchPage({
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  })
  {
    const sParams = useSearchParams()
    const query = sParams.get('query')
    const currentPage = Number (searchParams?.page) || 1 
    const [data,setData] = useState([])
    const [filter, setFilter] = useState(false)
    let e = new eventData()
    var results = new Array();
    var conditions = []
    conditions.push(where('eventName','>=',sParams.get('query')))
    const [queryCond, setQueryCond] = useState(conditions)

   const  addCondition= async (e)=>{
     // e.preventDefault()
  
      const {name,value} = e.target
      if(value=='hourly'){
      (  document.getElementById('fixed-checkbox') as any).checked=false
      }
      else{
        
        (  document.getElementById('hourly-checkbox') as any).checked=false
      
      }
 
      var tempCond = where(name,'==',value)
      conditions[1] = tempCond
       setQueryCond(conditions)
      
      }

    function sideSearchRadio(){
      return(
        <div> 
    <h3 className="mb-4 ml-2 font-semibold text-gray-900 dark:text-white">Search Options</h3>
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center ps-3">
                <input id="hourly-checkbox" type="checkbox" name='eventWageType'value="hourly" className="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={addCondition}/>
       
                <label htmlFor="fixed-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hourly</label>
            </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
                <input id="fixed-checkbox" type="checkbox" name='eventWageType'value="fixed" className="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={addCondition}/>
       
                <label htmlFor="fixed-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fixed</label>
            </div>
        </li>
       
    </ul>
    <div className='mt-4 w-48 text-sm font-medium  bg-white mx-auto rounded-lg dark:bg-gray-700 dark:border-gray-600'>
    <button type="button" className="btn-primary" onClick={()=>setFilter(!filter)}> Filter Search</button>
        </div>
        </div>
      )
    }
   
     useEffect(()=>{
     // setQueryCond(conditions)
     setQueryCond(conditions)
     console.log(conditions)
    },[filter])

    return(
      <div>
          <Toaster/>
        <div className=" grid grid-row-4 grid-col-4 gap-1">
          <div className="ml-4 row-end-5 col-end-1 h-full  h-[40rem]" hidden={u.name==null}>
            {sideSearchRadio()}
          </div>
          <div className="col-start-1">
            Search results relating to <h3 className="text-2xl font-semibold">{query}</h3>
          </div>
          <div className="row-end-5 col-start-1 col-end-5 bg-white h-full">
          <div role="tablist" className="tabs tabs-bordered bg-white ">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Events" defaultChecked/>
  <div role="tabpanel" className="tab-content p-10">
  <div className='overflow-x-auto'>
    <table className='table'>
    {searchBodyHeaderEvent()}
    <tbody>
            <Suspense fallback={<Loading/>}>{Results('Events',queryCond,sParams.get('query'))}</Suspense>
            </tbody>
            </table>
            </div>
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="People"/>
  <div role="tabpanel" className="tab-content p-10">
    <table className='table'>
      {searchBodyHeaderUser()}
      <tbody>
      <Suspense fallback={<Loading/>}>{Results('People',queryCond, sParams.get('query'))}</Suspense>
      </tbody>
    </table>
    </div>

</div>
          </div>
        </div>
   
      </div>
    )
}


function searchBodyHeaderEvent(){
  return(
    <thead>
    <tr>
      <th>Event Name</th>
      <th>Event Organizer</th>
      <th hidden={u.name==null}>Type of Wage</th>
      <th hidden={u.name==null}>Wage</th>
      <th></th>
    </tr>
  </thead>
  )
}
function searchBodyHeaderUser(){
  return(
    <thead>
    <tr>
      <th>User</th>
      <th>Location</th>
      <th>Profession</th>
      <th></th>
    
    </tr>
  </thead>
  )
}
export default searchPage;