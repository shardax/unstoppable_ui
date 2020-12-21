import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import axios from "axios";
import './index.scss';



const ChatroomListItem = ({chatroom, viewOnly}) => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  
  useEffect ( () => {
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
  } , [chatroom])
  
 return (
  <div>
    <Link to={`chatrooms/${chatroom.id}`}>
      {chatroom.name}
    </Link>
  </div>
 )
}

export default ChatroomListItem;