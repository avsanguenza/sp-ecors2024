function Footer(){
    return(
    

        <footer className="bg-[#387478] rounded-lg shadow m-4 dark:bg-gray-800 z-999  ">
          <div className='sm:absolute left-0 ml-16 md:flex'> 
          <span className=" text-sm text-white dark:text-gray-400 py-4">
            </span>
          </div>
            <div className="w-full mx-auto p-4 md:flex items-end md:justify-end -ml-16">
        
            <ul className="flex items-end mt-3 text-sm font-medium text-white sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="mailto:avsanguenza@up.edu.ph" className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
        </footer>
        
)
}
export default Footer;

//create modal for About 