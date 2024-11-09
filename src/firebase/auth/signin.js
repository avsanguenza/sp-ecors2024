import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebase_app)
let err = auth.FirebaseAuthException;
let result = null,
errorMsg ;

export default async function signIn(email, password) {
 
        try{
            const result = await signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
                const user = usercredential.user;
            });
        
        } catch(error){
            errorMsg = error.code
        }
    return { result, errorMsg};
}
