import userData from "../dashboard/user";


async function ChatBubbles(messageHistory,sender0,sender1){
  await new Promise ((resolve)=> setTimeout(resolve,3000));

    var msgHistory = messageHistory.reverse().sort()
    var sender_end = sender0
    var sender_star = sender1
    return (
        <>
        {
            msgHistory.map((d)=>{
              const {message} = d
              const {timeSent} = d
              const {senderID} = d
              if(senderID == sender_end){
                return(
                    sender0Bubble(message,timeSent,sender0)
                )
               }
               else{
                return(
                  sender1Bubble(message,timeSent,sender1)
                )
               }
            })
        }
        </>
    )

}

export default ChatBubbles

async function sender0Bubble(message,time,uid){
  let uphoto = new userData()
  await uphoto.fetchPhotoURL(uid)
    const date = time.toDate().toDateString() //too fast
    return(
      <div className="chat chat-end">
    <div className="chat-header text-start ">
      {
      //sessionStorage.getItem('sender0name').split(' ')[0]
      }
    </div>
   <div className="inline-flex">
   <time className="text-xs opacity-50 mt-4 pr-4">{date} </time>
    <div className="chat-bubble bg-[#629584] text-white ">
    {message}
  </div>
  <img src={uphoto.photoURL} className="w-10 h-10 ml-4 rounded-full"/>

   </div>
    <div className="chat-footer opacity-50">
     {
      //status here
     }
    </div>
    </div>
     
    )
  }

async function sender1Bubble(message,time,uid){
  let uphoto = new userData()
  await uphoto.fetchPhotoURL(uid)
    const date = time.toDate().toDateString() //too fast throw 
    return(
      <div className="chat chat-start">
    <div className="chat-header text-start ">
      {
      //sessionStorage.getItem('sender0name').split(' ')[0]
      }
    </div>
   <div className="inline-flex">
   <img src={uphoto.photoURL} className="w-10 h-10 mr-4 rounded-full"/>

    <div className="chat-bubble bg-grey-300 text-white ">
    {message}
  </div>
  <time className="ml-3 mt-4 inline text-xs opacity-50 pr-4">{date} </time>

   </div>
    <div className="chat-footer opacity-50">
     {
      //status here
     }
    </div>
    </div>
     
    )
  
  }