'use client'

import React from 'react'
import signOutUser from '@/firebase/auth/signout';
import {useRouter} from 'next/navigation';

async function Page(){
    const router = useRouter();
   await signOutUser().then(()=>{
        var obj={'name':null, 'accountType':null}
        var value = JSON.stringify(obj)
        localStorage.setItem('currentUser',value)
        router.refresh()
    }).then(()=>{
        window.location.replace('/')
    }).catch((e)=>{
        console.log(e)
    })
   

    return(
       
       <h1>Logging off user</h1>
    
    );

}

export default Page;