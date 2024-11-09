import eventData from './event'
import userDBClass from './userDB'

export default class searchClass{
    constructor(type,value){
        this.type = type
        this.value = value
        this.dataObjMap = new Map();
    }

    async getDatafromType(){
        if(this.type =='Events'){
            console.log('value '+this.value)
            await this.getEventData().then((res)=>{
               console.log(res)
            })
            //fetch from events
        }
        else if(this.type=='People'){
            //fetch from people
        }
        else{
            //fetch fromboth
        }
    }
    async getEventData(){
     let e = new eventData(); 
    e.getData('events','eventName','>=',this.value).then(()=>{
        return e.dataObjMap
    })
    }

     appendToResults(newResults){
        if(!this.dataObjMap.size==0){
            newResults.forEach((v,k)=>{
                if(!this.dataObjMap.includes(v)){
                    this.dataObjMap.set(k,v)
                }
            })
        }
    }


}
