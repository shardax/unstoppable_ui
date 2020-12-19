import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import axios from "axios";



const ChatroomListItem = ({chatroom}) => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  
  useEffect ( () => {
    const channel =  cable.subscriptions.create( 
                       { channel: "ChatroomMessagesChannel", id: chatroom.id },
                        { received: (data) => {
                           // store.tempText = data.content;
                            //localStorage.setItem("tempText", JSON.stringify(data.content));
                            //localStorage.setItem("userStore.tempText", JSON.stringify(data.content));
                            console.log("received!!!", JSON.stringify(data))
                            setTimeout(() => {
                            store.currentChatroom.messages.push(data);
                            localStorage.setItem("userStore", JSON.stringify(store));
                            }, 100)
                          },
                        },
                      )

    //return () => {
    //  channel.unsubscribe();
    //}
   
  } , [chatroom])
  
 return (
  <div>
    <Link to={`chatrooms/${chatroom.id}`}>
      {chatroom.name} Yay!
    </Link>
  </div>
 )
}

export default ChatroomListItem;