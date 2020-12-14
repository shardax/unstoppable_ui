import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import axios from "axios";



const ChatroomList = () => {
  const store = useDataStore;
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const { chatroomId } = useParams()

  console.log("cable", cable);

  const sendMessage = (content) => {
    //const store = useDataStore;
   
    //const data = {chatroomId: chatroomId, userId: store.current_user_id , content: content}
    const data = {chatroomId: chatroomId, userId: store.current_user_id , content: content}
    channel.send(data);

  }
   
  /*useEffect ( () => {
    const channel =  cable.subscriptions.create( 
                       // { channel: "ChatroomMessagesChannel", id: chatroomId },
                       { channel: "ChatroomMessagesChannel", id: chatroomId },
                        { received: (data) => {
                            //console.lo
                            console.log("received", JSON.stringify(data))
                          },
                        },
                      )

    //console.log("channel", channel);
    //setChannel(channel);

    //sendMessage("HI ,HOW ARE YOU?");
    //const data = {chatroomId: 1} //, userId: store.current_user_id , content: "HELLO3"}
   
    //channel.send(data);
   // channel.send(data);
   // channel.send(data);

    return () => {
      channel.unsubscribe();
    }
   
  } , [])*/
  
 useEffect ( () => {
  const getChatrooms = async () => {
    try {
      const { data } = await axios.get(CHATROOMSURL,
        { 
          params: {
          },
          withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
          }
        })
        setChatrooms(data);
    } catch (e) {
      console.log(`😱 Chatrooms Fetch failed: ${e}`);
      setChatrooms([]);
    }
  }
  getChatrooms();

  }, [])

 return (
  <div>
    {chatrooms.map(chatroom => (<Link to={`chatrooms/${chatroom.id}`}>{chatroom.name}</Link> ))}

  </div>

 )  

}

export default ChatroomList;