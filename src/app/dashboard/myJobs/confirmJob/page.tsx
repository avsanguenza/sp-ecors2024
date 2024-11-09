

function confirmPage(createEventName, createDate,createLocation,createDescription,createWageType, createWageTypeValue){
    return (
        <div className="mt-4">
        <ul>
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Event Name :  {createEventName}</label>
          </li>
  
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Event Date :{createDate} </label>
      
          </li>
  
          
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Event Location: {createLocation} </label>
      
          </li>
          
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Description: {createDescription}</label>
      
          </li>
          
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Event Wage Type: {createWageType}</label>
      
          </li>
          
          <li>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name"> Event Wage: {createWageTypeValue} PHP </label>
      
          </li>
        </ul>
      </div>
    )
}

export default confirmPage;