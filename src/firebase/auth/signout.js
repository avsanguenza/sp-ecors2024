
import { signOut, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { useRouter } from "next/router";
const auth = getAuth(firebase_app);

export default  async function signOutUser(){
    let result = null,
        error=null ;
    try{
        console.log("here")
        signOut(auth).then((result) => {
            const router = useRouter()
            router.replace('/')
        })
    } catch (e){
        error=e;
    }

   return {result,error}
}

export function getCurrentUser(){
    return this.auth.currentUser;
}