import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import {Fragment, useState,useEffect} from 'react';


function AppDialog ({children}, isTrue){
  const [data,setData] = useState('')
  const [eData, setEData] = useState('');
  const [isOpen, setIsOpen] = useState(isTrue)
    
  function closeModal(){
     setIsOpen(false)
  }
  
  function openModal(){
    setIsOpen(true)
  }
    return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <div className='inset-x-0'> <button type='button' onClick={()=>closeModal()} className=" rounded-md border"> x </button></div>

                <div className="text-center">
                <Dialog.Title as="h3"> Dialog Title</Dialog.Title>
                </div>
                <div className='mt-8 text-center space-x-2'>
                { children}

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
    )
}
export default AppDialog