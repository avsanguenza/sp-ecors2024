'use server'
import { firebase_admin } from "../lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import {getFirestore} from 'firebase-admin/firestore'
let authAdmin = getAuth(firebase_admin)
let adminDB  = getFirestore(firebase_admin)
export async function admin_updateUser(uid, value){
   getAuth().updateUser(uid, {
    //displayName: ,
   // email: 'modifiedUser@example.com',
   // phoneNumber: '+11234567890',
   // emailVerified: true,
   // password: 'newPassword',
   // displayName: 'Jane Doe',
   // photoURL: 'http://www.example.com/12345678/photo.png',
   // disabled: true,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.displayName);
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });

}
export async function checkIfDisabled(uid){
  const val = getAuth().getUser(uid).then((rec)=>{
    console.log("========="+uid+"  is   "+rec.disabled+"=========")
      return rec.disabled
  })
  return val
}
export async function admin_changeStateUser(uid,value){
  getAuth().updateUser(uid, {
   //displayName: ,
  // email: 'modifiedUser@example.com',
  // phoneNumber: '+11234567890',
  // emailVerified: true,
  // password: 'newPassword',
  // displayName: 'Jane Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',
   disabled: value
 })
 .then((userRecord) => {
   // See the UserRecord reference doc for the contents of userRecord.
   console.log('---------- Successfully updated user', userRecord.displayName+"==="+userRecord.disabled+"-----");
 })
 .catch((error) => {
   console.log('Error updating user:', error);
 });

}
export async function admin_getUser(uid){
    getAuth().getUser(uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
   // console.log(`Successfully fetched user data: `+ userRecord.displayName);
   fillUserDB(uid,userRecord.displayName)
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}

export async function fillUserDB(uid,value){
const doc = adminDB.collection('users').doc(uid).update(
    {
        'displayName': value
    },{merge:true}
).then(()=>{
    console.log("updated:"+ value)
})
}