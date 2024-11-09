'use client'
import { useEffect, useRef, useState } from "react";
import NavBar from "../navBar";
import { Suspense } from "react";
import Loading from "./loading";
import MessageListLoading from "./messageListLoading";
import ChatBubbles from "./messaging";
import messagePreviewList from "./messageList";
import Messages from '@/firebase/messaging/message'
import userData from "../dashboard/user";
import toast from "react-hot-toast";
var messageArray = new Array()
function messagePage(){ 
    let udata = new userData()
    udata.parseData()
    const [sender0, setSender0] = useState({uid:udata.getUserUID(), name:udata.getName()})
    const [sender1, setSender1] = useState({uid:sessionStorage.getItem('sender1uid'), name:sessionStorage.getItem('sender1name')})
    const [messageHistory, setMessageHistory] = useState([])
    const [messageList, setMessageList] = useState([])
    const [messageSig, setMessageSig] = useState(false)
    const ref = useRef(true)
    var n_msg = new Messages(udata.getUserUID(),udata.getName(),sender1.uid,sender1.name)

    const handleMessageSend= async (e)=>{
      e.preventDefault()
      var n_msg = new Messages(udata.getUserUID(),udata.getName(),sender1.uid,sender1.name)
      console.log(sender1)
       console.log(n_msg.sender0Name+"  -  "+n_msg.sender1Name)
       console.log(n_msg.sender0uid+"  -  "+n_msg.sender1uid)

      n_msg.newMessage=''
      console.log(n_msg.checkExistingConvo())
 try{ 
   if (await n_msg.checkExistingConvo() && sender1.uid!=null){
    await  n_msg.createT((document.getElementById('chatMsg') as any).value).then(()=>{
      sessionStorage.removeItem('sender1name')
      setMessageSig(!ref.current);
      (document.getElementById('chatMsg') as any).value=''

    })
    }
    else{
      await  n_msg.updateConvo((document.getElementById('chatMsg') as any).value).then(()=>{
         n_msg.updateMessageListener()
      }).then(()=>{
        console.log('Setting sig as '+!(ref.current))
        setMessageSig(!ref.current);
        (document.getElementById('chatMsg') as any).value=''
        
      })
      }
}catch(err){
  toast.error(err)
}
  

  }
useEffect(()=>{
  ref.current = messageSig
},[messageSig])

useEffect(()=>{
  var newMsg = new Messages(udata.getUserUID(),udata.getName(),sender1.uid,sender1.name)
  const waitMessage = async()=>{
    await newMsg.getData().then(async()=>{
      setMessageHistory(newMsg.messageHistory)    
    })
  }
  waitMessage()
},[sender1.name,messageSig])

useEffect(()=>{  
  var msg = new Messages(udata.getUserUID(),udata.getName(),sender1.uid,sender1.name)
  msg.fetchUserMessage().then(()=>{
    setMessageList(msg.userConvos)
  })
},[])
function fetchMessage(senderuid,sendername){
 setSender1({
  ...sender1,
  uid:senderuid,
  name:sendername
 })

}
async function convoButton(name,time,uid){
  let udata = new userData()
  await udata.fetchPhotoURL(uid)
  let url = udata.photoURL
  let displayName = await udata.fetchName(uid)
  return(
      <>
     <div>
     <button className='border border-gray-50 w-full rounded-lg px-3 py-5 hover:bg-gray-100' onClick={()=>fetchMessage(uid,displayName)}>
     <div className="flex items-center grid-rows">
                <img className="bg-left rounded-full h-10 w-10  " src={url}/>
                <div className="ml-3">
                <span className="-mt-4 text-xl font-medium">{displayName}</span>
                <p>{time} </p>
              
                </div>
                </div>
              
      </button>
     </div>
      </>
  )
}

  return(
                  
        
        <div className="">
        <div className="grid grid-rows-6 grid-flow-col h-dvh divide-x-1">
            <div className="row-start-1 row-end-7 col-span-1 bg-transparent space-y-2">
            <h2 className="ml-7 px-2 py-4 text-3xl font-bold">Messages</h2> 
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <Suspense fallback={<MessageListLoading/>} >

                  {
        messageList.map((d)=>{
          var viewer = udata.getUserUID()
          if(viewer == d.sender0 ){
            var currs1 = (d.sender0 == udata.getUserUID()) ?   d.sender1 : d.sender0
            var sName1 = (currs1 ==udata.getUserUID()) ?   d.sender0Name: d.sender1Name
              return(
                  convoButton(sName1,d.timeSent,currs1)
            
              )
          }else{
            var currs1 = (d.sender0 == udata.getUserUID()) ?   d.sender1 : d.sender0
            var sName1 = (d.sender0Name ==udata.getUserUID()) ?   d.sender1Name: d.sender0Name
            console.log(currs1)
              return(
                  convoButton(sName1,d.timeSent,currs1)
              )
          }
    
        })
    }
            </Suspense>

            </div>
  <div className="grid grid-rows-subgrid row-span-4 col-span-2 bg-white">
    <div className="row-end-1 bg-white px-5 py-8 font-semibold text-3xl"> {sender1.name} </div>
    <div id='messageWindow'className=" ml-4 row-start-2 row-end-5 bg-white overflow-y-auto">
<Suspense fallback={<Loading/>}>{
    ChatBubbles(messageHistory,udata.getUserUID(),sender1.uid)
}</Suspense>
  </div>
  </div>
  <div className="row-start-5 row-end-6 col-span-2 bg-white ">

    
  <form >
              <input type="text" id="chatMsg" className=" w-full p-4 ps-10 text-sm text-gray-900 border border-[#387478] rounded-full bg-gray-50  focus:border-pink-500" placeholder="Send a message" required />
                  <div className="static -mt-[50px] mr-3 flex-1 text-end ">
                  <button type="submit" className=" text-white bg-[#387478] hover:bg-[#243642] focus:ring-4 focus:outline-none focus:ring-[#387478] font-medium rounded-full text-sm px-8 py-3 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-[#387478]" onClick={handleMessageSend}>Send</button>
                  </div>
        </form>
  </div>
</div>
        </div>
    )
}
export default messagePage;
                                                        