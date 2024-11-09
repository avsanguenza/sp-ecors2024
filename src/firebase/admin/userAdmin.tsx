'use server'
import { getFirestore } from "firebase-admin/firestore"
import {firebase_admin} from '@/firebase/lib/firebase-admin'
import {getAuth} from 'firebase-admin/auth'

const adminAuth = getAuth(firebase_admin)

export async function getUserData(uid){
    getAuth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
     console.log(`Successfully fetched user data:`+userRecord.displayName)
      return userRecord.displayName
      
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });

}

 function  ActuallyGetData (uid){
   const data =  getUserData(uid).then((res)=>{
       console.log(res)
   })
    return(
     data
    )
}

export default ActuallyGetData;

export async function test(){
    console.log('here')
}