import React, {useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import { ActionCableContext, useDataStore } from "../../UserContext";
import './index.scss';


const ChatroomListItem = ({chatroom, viewOnly}) => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  
  useEffect ( () => {
    if (!viewOnly){
      const channel =  cable.subscriptions.create( 
                        { channel: "ChatroomMessagesChannel", id: chatroom.id },
                          { received: (data) => {
                              console.log("received!!!", JSON.stringify(data))
                              setTimeout(() => {
                              if (store.currentChatroom.chatroomId === parseInt(data.chatroomId))
                                store.currentChatroom.messages.push(data);
                                localStorage.setItem("userStore", JSON.stringify(store));
                              }, 100)
                            },
                          },
                        )

      //return () => {
      //  channel.unsubscribe();
      //}
      console.log("viewOnly", viewOnly);
    }
  } , [chatroom])
  
  

 return (
  <div>
    <Link to={`chatrooms/${chatroom.id}`}>
    
        <div className={"single-conversation-wrapper "}>
            <div className="conversation-subject">
              {chatroom.name}
            </div>
          <hr></hr>
        </div>
    </Link>
  </div>
 )
}

export default ChatroomListItem;