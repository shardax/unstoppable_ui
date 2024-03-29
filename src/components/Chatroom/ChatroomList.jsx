import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import axios from "axios";
import ChatroomListItem from "./ChatroomListItem"
import './index.scss';
import Tooltip from '@material-ui/core/Tooltip';



const ChatroomList = () => {
  const store = useDataStore;
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const { chatroomId } = useParams();

  const renderedChatroomListItems = chatrooms && chatrooms.map((chatroom) => (
    <ChatroomListItem
      key={chatroom.id}
      chatroom={chatroom}
      viewOnly={false}
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
    <div className="messages-wrapper">    
        <div className="inbox-wrapper">
          <nav className="pink-nav conversation-nav-wrapper">
            <div className="conv-nav-text">
              {/* <Tooltip title="Realtime Chats with groups of users"> */}
                Chatrooms (realtime chats with a group of users)
            </div>
          </nav>
          <div style={{float: 'right'}}>
              <Link to={`addChatroom`}> Add New Chatroom </Link>
          </div>
    {/*chatrooms.map(chatroom => (<Link to={`chatrooms/${chatroom.id}`}>{chatroom.name}</Link> ))*/}
          {chatrooms && chatrooms.map((chatroom) => (
                <ChatroomListItem
                  key={chatroom.id}
                  chatroom={chatroom}
                  viewOnly={false}
                />
          ))}
      </div>
    </div>

    <div className="conversation-wrapper">
          <nav className="purple-nav conversation-nav-wrapper">
            <div className="conv-nav-text">
            
            </div>
          </nav>
    </div>
  </div>

 )  

}

export default ChatroomList;