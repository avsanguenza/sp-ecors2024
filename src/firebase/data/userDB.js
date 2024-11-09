import firebase_app from "../config";
import {getFirestore,doc, getDocs,updateDoc,setDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';
import toast from "react-hot-toast";
import province from '@/assets/provinces.json'
const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

export default class userDBClass{
  constructor(auth){
    this.uid = auth.uid
    this.name = auth.displayName
    this.email = auth.email
    this.photoURL = auth.photoURL
    this.phoneNum=''
    this.address =''
    this.db = db
  }
  async setAccValues (){
   try{
    const unsub = onSnapshot(doc(db,"users",this.uid),(doc)=>{
      console.log(doc.data())
      const userData = doc.data()
      let data = (doc.data().isOrganizer== true ? 'Event Organizer' : 'User');
      if(doc.data().isAdmin==true){
        data = 'Admin'
      }
      this.address = doc.data().address
      this.phoneNum=doc.data().contactNumber
      var obj = {
        'name' : this.name,
        'uid' : this.uid,
        'accountType' : data,
        'email': this.email,
        'userProvince': doc.data().userProvince,
        'userCity': doc.data().userCity,
        'userJob': doc.data().userJob,
        'userCat':doc.data().userCategory,
        'photoURL':this.photoURL,
        'contactNumber': doc.data().contactNumber
      }
      var toJSON = JSON.stringify(obj);
      localStorage.setItem('currentUser', toJSON);
  })
   }
   catch(err){
  }
}
async updateAtrribute(attrName, value,uid){
  const docRef = doc(this.db,"users",uid)
  await setDoc(docRef,{
    [attrName]:value
  },{merge:true})
  .catch((err)=>{
  })
}

  async getUsers(arg0, queryOp, arg1){  
    const q = query(collection(db,'users'),where(arg0,queryOp,arg1))
    const qsnapshot = await getDocs()
  }
  }

export class userData{
  constructor(){
    this.db = db
    this.displayName = ''
    this.userDataObj = new Array();
  }
  async getData(collectionRef, arg0,queryOp,arg1){
    const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
    const qsnapshot= await getDocs(q)
    qsnapshot.forEach((doc)=>{
      var data={
        'uid': doc.id,
            'displayName': doc.data().displayName,
            'isActive': doc.data().isAccountActive,
            'isConcess': doc.data().isConcess,
            'isOrganizer':doc.data().isOrganizer,
            'userProvince': this.getNormalName(doc.data().userProvince),
            'userCity': doc.data().userCity,
            'userCat': doc.data().userCategory,
            'userJob': doc.data().userJob,
            'userImage': doc.data().userImage
      }
      this.userDataObj.push(data)

    })
  }
  
  getNormalName(data){
    var temp=''
    province.map((v,k)=>{
      if(v.key==data){
        temp= v.name
      }
    })
    return temp
  }
  async getAllData(){
    const q= query(collection(this.db,'users'))
    const qSnapshot = await getDocs(q)
    qSnapshot.forEach((doc)=>{
        if(!doc.data().isAdmin == true){
          var data={
            'uid': doc.id,
            'displayName': doc.data().displayName,
            'isActive': doc.data().isAccountActive,
            'isConcess': doc.data().isConcess,
            'isOrganizer':doc.data().isOrganizer,
            'userImage': doc.data().userImage
          }
          this.userDataObj.push(data)
        }
    })
  }
  async updateAttribute(uid,attrName,value){
    try{
      const docRef = doc(this.db,'users',uid)
    await updateDoc(docRef,{
        [attrName]: value
    },{merge:true})
    }catch(err){
      toast.error('Something has occurred. Please try again.')
    }
}
}

export class userComplaint{
  constructor(){
    this.db = db
    this.dataObj = new Array()
  }

  async setComplaint(eventName, eventuid, eventOrganizer, userid, userName, complaint){
    const docRef = doc(collection(this.db, 'userComplaints'))
    await setDoc(docRef,{
      complaintEventUID: eventuid,
      complaintEventName: eventName,
      complaintEventCreator : eventOrganizer,
      complaintUser: userid,
      complaintText: complaint,
      isResolved: false
    })
  }
  async updateAtrribute(uid, attr,value){

  }
  async getComplaint(){
    const q = query(collection(this.db,'userComplaints'))
    const qSnap = await getDocs(q)
    qSnap.forEach((doc)=>{
      var str =  doc.data().complaintText
      str = str?.substring(0,10)+"..."
      var data={
        'complaintid': doc.id,
        'complaintEventUID': doc.data().complaintEventUID,
        'complaintEventName': doc.data().complaintEventName,
        'complaintEventCreator': doc.data().complaintEventCreator,
        'complaintUser': doc.data().complaintUser,
        'complaintPeek': str,
        'complaint': doc.data().complaintText, 
        'isResolved': doc.data().isResolved
      }
      this.dataObj.push(data)
    })
  }
}
