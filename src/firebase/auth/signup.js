import firebase_app from "../config";
import { createUserWithEmailAndPassword, updateProfile,getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { collection, doc, setDoc } from "firebase/firestore"; 


const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(type,name,email, password) { //name,email,password
    let result = null,
        error = null;
  
    try {
        await createUserWithEmailAndPassword(auth, email, password).catch((err)=>
        console.log(err)
    );
        await updateProfile(auth.currentUser,{displayName: name}).then(()=>{
            var isOrganizerValue = (type=="eOrganizer")? true : false
            var isConcessValue = (type=="eConcess") ? true : false
            
            setDoc(doc(db,'users',auth.currentUser.uid),{
                isAdmin: false,
                isConcess: isConcessValue,
                isOrganizer: isOrganizerValue,
                displayName: auth.currentUser.displayName,
                userImage: 'https://i.pinimg.com/736x/8d/03/f2/8d03f2be7f0f9b111b2a94558a099ca8.jpg',
                isAccountActive:true
            })
         
        }).catch((err)=>
            console.log(err)
        );
        //console.log(auth.currentUser.displayName);
    } catch (e) {
        error = e;
    }
    localStorage.setItem('fromSUPage',null)
    return { result };
}

function setUserData(db,userid,accName){
    try{
        result = setDoc(doc(db, 'users', userid),{
            displayName:accName
        });
        
    }
    catch(e){
        console.log(e);
    }

}

//setdefault picture
//set 


