
function eventCards(data){
    data.forEach((d)=>{
        return(
            <div className="mt-10 ml-5  max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL}/>

          <a href="#">
          <h5 className="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
          </a>
          <h2 className="mt-2">{d.eventLocation}</h2>
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <ul className="flex items-center w-full me-4">
          <li><p className="mt-2  text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
          <li>
          <a href="#" className='mt-3 inline-flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-24 w-8 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /> 5
          </svg>
              4.0
          </a>
          </li>
          </ul>
          <button type="button" onClick={() =>{}} className="mt-4 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Apply</button>
          </div>
        )
    })
}

export default eventCards;