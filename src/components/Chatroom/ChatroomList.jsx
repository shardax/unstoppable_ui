import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import axios from "axios";
import ChatroomListItem from "./ChatroomListItem"



const ChatroomList = () => {
  const store = useDataStore;
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const { chatroomId } = useParams()

  console.log("cable", cable);

  const renderedChatroomListItems = chatrooms.map((chatroom) => (
    <ChatroomListItem
      key={chatroom.id}
      chatroom={chatroom}
    />
  ))
  
 useEffect ( () => {
  const getChatrooms = async () => {
    try {
      let url = CHATROOMSURL + ".json";
      const { data } = await axios.get(url,
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
    {/*chatrooms.map(chatroom => (<Link to={`chatrooms/${chatroom.id}`}>{chatroom.name}</Link> ))*/}
    {renderedChatroomListItems}
  </div>

 )  

}

export default ChatroomList;