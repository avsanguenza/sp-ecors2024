import { firebase_admin } from "../lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
export default class userAdmin{
    constructor(){

    }

   getUserData(uid){
        getAuth(firebase_admin).getUser(uid).then((rec)=>{
            console.log(rec)
        }).catch((err)=>{
            console.log(err)
        })
}

}