'use client'
import { Suspense, useEffect, useState } from 'react';
import { eventData } from '@/firebase/data/event';
import { adminData } from '@/firebase/data/storage';
import LoadingFeature from './loadingFeature';
import { CarouselLoadingSkeleton } from './loadingFeature';
import EventInfoContainer from '@/assets/eventInfoContainer';

let edata = new eventData()
let adata = new adminData()

export default function Page() {
  const [data, setData] = useState([])
  const [imageData, setImageData] = useState([])
  const [loading, setLoading] = useState(false)
  let dataImageMap = new Map()
  let results = new Array()
  useEffect(()=>{
    edata.getData('events','isFeatured','==',true).then(async()=>{
      var res = edata.dataobjMap
      res.forEach((v,k)=>{
        var temp = JSON.parse(v)
        results.push(temp)
      })
      setData(results)
      setLoading(true)
    })
  },[])
  useEffect(()=>{
    adata.getFiles().then(async()=>{
      await new Promise ((resolve)=> setTimeout(resolve,1000));
       setImageData(adata.imageDataObj)
     
    })
},[])
  return (
  <>
  <div className="min-h-screen flex flex-col justify-between">
  <Suspense fallback={<CarouselLoadingSkeleton/>}>{carousel(imageData)}</Suspense>
  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
  <h2 className='text-2xl font-bold text-center'>Featured Events</h2>
 <div className='ml-8 mr-8 mb-8 grid grid-cols-5 gap-3'>
 {
    data.map((d)=>{
      return(
        <Panel isActive={loading ===true}>
        <div className="mt-10   max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-[#E2F1E7]" onClick={()=>  (document.getElementById(d.eventid) as HTMLDialogElement).showModal()}>
         <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL} />

       <a href="#">
       <h5 className="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
       </a>
       <h2 className="mt-2">{d.eventLocation}</h2>
       <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

       <ul className="flex items-center w-full me-4">
       <li className='flex items-start'>
       <p className='font-medium'>Posted by:</p>
       <img src={d.eventImageURL} className=' ml-3 h-5 w-5 mt-1 inline rounded-full'/>  
       <p className=" ml-2 text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
     
       </ul>
       </div>
        <EventInfoContainer d={d}/>
     </Panel>
      )
    })
  }
 </div>   
  </div>
  </>
  )

function infoModal(eventName,eventLocation){
  return(
    <dialog id={eventName} className="modal">
    <div className="modal-box">
    <form method='dialog'>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
      <h3 className="font-bold text-lg">{eventName}</h3>
      <p className="py-4">{eventLocation}</p>
    </div>
  
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
      
    </form>
  
  </dialog>
  )
}
function carousel(dataMap){
  return(
    <>
    <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={dataMap[0]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id='slide2' className="carousel-item relative w-full">
    <img src={dataMap[1]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={dataMap[2]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 
</div>
    </>
  )
}
}

function Panel({
  children,
  isActive
}){
  return(
    <div className='text-center'>
             {isActive ?  (children) : <LoadingFeature/>}
    </div>
  )
}
