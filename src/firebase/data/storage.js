import { getDoc } from "firebase/firestore";
import { storage } from "../config";
import { ref,uploadBytesResumable,getDownloadURL, getStorage, uploadString,getMetadata,listAll } from "firebase/storage";
import toast from "react-hot-toast";

export default class storageData{
    constructor(){
        this.storage = storage
    }
    async uploadFile(file, fileName){

    }
}

export class imageData extends storageData{
    constructor(folderName){
        super()
        this.imageFolder = folderName+'Image/'
        this.metadata = {contentType: 'image/jpeg'}
        this.eventURL =''
    }
    async uploadImage(file, fileName){
        //fix the storage
      // type: e.target.files[0].name.split(".").pop(),
     //  this.metadata = this.getMetadata(this.getMetadata(file.type))
        const imageRef = ref(this.storage, this.imageFolder+fileName,this.getMetadata(file.type))
         return uploadBytesResumable(imageRef, file.blob).then((snapshot)=>{
            return getDownloadURL(snapshot.ref).then((sn)=>{
                return sn
            })
        }).catch((err)=>{
            toast.error(err)
        }) 
        
    }
    async getURL(data){
       
    }
    async getFile(path){
        try{
        const fileRef = ref(this.storage,path);
        getDownloadURL(fileRef).then((url)=>{
            console.log(url)
                this.eventURL = url
        })
    }
        catch(err){
            console.log(err)
        }
    }
    getEventURL(){
        return this.eventURL;
    } 
    getMetadata(type){
        if(type=='jpg' || type=='jpeg'){
            return({  contentType: 'image/jpeg'})
        }
        else if( type =='png'){
            return({ contentType: 'image/png'})
        }
       
    }
}

export class adminData extends storageData{
  constructor(){
        super()
        this.folderName = 'carousel/'
        this.metadata=''
        this.imageDataObj= new Array()
        this.imageDataObjMap = new Map()
  }

  async uploadAssets(file){
    const imageRef = ref(this.storage, this.folderName+file.name,this.getMetadata(file.type))
    return uploadBytesResumable(imageRef, file.blob).then((snapshot)=>{
       return getDownloadURL(snapshot.ref).then((sn)=>{
           return sn
       })
   }) 
   
  }
  async getFiles(){
    var storageRef = ref(this.storage,'carousel/')
    listAll(storageRef).then((res)=>{
        res.items.forEach((f)=>{
            getMetadata(f).then((val)=>{
                return val.name
            }).then((name)=>{
                getDownloadURL(f).then((sn)=>{
                    if(!this.imageDataObj.includes(sn)){
                        var data={
                            'name': name,
                            'link':sn
                        }                        
                        this.imageDataObj.push(sn)
                    }
                   })
            })
          
        })
    }).catch((err)=>{
        console.log(err)
    })
  }

  getMetadata(type){
    if(type=='jpg' || type=='jpeg'){
        return({  contentType: 'image/jpeg'})
    }
    else if( type =='png'){
        return({ contentType: 'image/png'})
    }
   
}
}

export class fileData extends storageData{
    constructor(eventid){
        super()
        this.dataFolder = 'eventApplicationForms/'+eventid
        this.folder = eventid
        this.metadata= '';
    }
    async uploadFile(file){
        console.log(file.type)
        this.metadata = this.getMetadata(file.type)
        const docUploadRef = ref(this.storage,this.dataFolder+"/"+file.name,this.metadata)
        return uploadBytesResumable(docUploadRef,file.b64).then((snapshot)=>{
            return getDownloadURL(snapshot.ref).then((sn)=>{
                return sn
            })
        })

    
    }

    getMetadata(type){
        if(type=='pdf'){
            return({  contentType: 'application/pdf'})
        }
        else if( type =='doc'){
            return({ contentType: 'application/msword'})
        }
        else{
            return ({ contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})
        }
    }
}