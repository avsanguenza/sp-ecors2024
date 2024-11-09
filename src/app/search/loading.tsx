export default function Loading(){
    return(
        <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 ml-4 mt-2">
              <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
              </div>
            </div>
            <div>
              <div className="font-bold">
              </div>
            </div>
          </div>
        </td>
        <td>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>          </td>
        <th>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>        </th>
        <th>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>        </th>
        <th>
        <button className="btn btn-ghost btn-xs">
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
        </button>
        </th>
      </tr>
    )
}

