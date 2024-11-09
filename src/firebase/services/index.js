import {addDoc, collection, Timestamp} from 'firebase/firestore/lite';
import {firestore} from "@/firebase/config";

export const saveInitialInfo = async({name, phoneNum}) => {
    try{
        const ref = collection(firestore, "sp-ecors-db");
        await addDoc(ref,{
            name,
            phoneNum
        }

        );
        return 0;
    }
    
    catch(e){
        console.log(e)
        return -1;
    }
}

//update info 
