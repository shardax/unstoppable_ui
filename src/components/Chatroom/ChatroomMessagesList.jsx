import React, {useState,  useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
import { useObserver } from "mobx-react";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import Textarea from '../Styled/Textarea';
import Default from '../../layouts/Default';
import axios from "axios";
import { createBrowserHistory } from 'history'
import Badge from '@material-ui/core/Badge';

const ChatroomMessagesList = () => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const { chatroomId } = useParams();
  const [msgText, setMsgText] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const history = createBrowserHistory({ forceRefresh: true });
  
  const sendMessageToServer = (content, channel) => {
    //const store = useDataStore;
    console.log("chatroomId 2",chatroomId);
    const data = {chatroomId: parseInt(chatroomId), userId: store.current_user_id , content: content, last_read_at: store.last_read_at}
    channel.send(data);
  }
 
  useEffect ( () => {
    if (messageSent === true){

      if (channel) {
        sendMessageToServer(msgText, channel);
      } else {
        const channel =  cable.subscriptions.create( {
          channel: "ChatroomMessagesChannel",
          id:  parseInt(chatroomId)
        })
        setChannel(channel);
        console.log("channel", channel);
        setTimeout(() => {
          sendMessageToServer(msgText, channel);
          }, 10);
      }
    
     // setCurrentMessages(currentMessages.push(msgText));
      //console.log
      setMsgText("");
      setMessageSent(false);

    //setTimeout(() => {
      //setMessageSent(false);
     
     // sendMessageToServer("HI ,HOW ARE YOU?", channel);
     console.log("chatroomId 1",chatroomId);
     // sendMessageToServer(msgText, channel);
      setMsgText("");
      //const data = {chatroomId: 1, userId: store.current_user_id , content: "Charlie Sheen"}
      //channel.send(data);
     
      //}, 1);

    return () => {
      //console.log("Unsbribin!!!g")
      // When do you unsubscribe?
      //setMessageSent(false);
     // channel.unsubscribe();
    }
  }
  } , [messageSent==true])


  useEffect ( () => {
    const getChatroomMessages = async () => {
      try {
        let url = CHATROOMSURL + "/" + chatroomId + "/chatroom_details.json";
        const  result   = await axios.get(url,
          { 
            params: {
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
          setCurrentMessages(result.data.chatroom.messages);
          setChatrooms(result.data.chatrooms);
          store.currentChatroom.chatroomId = result.data.chatroom.id;
          store.currentChatroom.last_read_at = result.data.chatroom.last_read_at;
          store.currentChatroom.messages = result.data.chatroom.messages;
          localStorage.setItem("userStore", JSON.stringify(store));
      } catch (e) {
        console.log(`😱 Chatrooms Fetch failed: ${e}`);
        setCurrentMessages([]);
      }
    }
    getChatroomMessages();
  }, [])


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      setMsgText(event.target.value);
      event.preventDefault();
      setMessageSent(true);
      //resetForm();
    }
  }


  const handleClick = (event) => {
    console.log(event.target.value);
    history.push("/chatroomDetails/" + event.target.value);
  }

  const DisplayMessage = (message) => {
    return (
      <p>
        {message.user == store.username? " " : message.user} {message.content} {message.username} {message.created_at} 
      </p>
    );
  }
  
 return  useObserver(() => (
  <div>
     <Default>
      {chatrooms && chatrooms.map(chatroom => (<Badge color="primary" badgeContent={chatroom.number_of_unreads}><button type="button" value={chatroom.id} onClick={(e) => handleClick(e)}>{chatroom.name}</button></Badge>))}
      {store.currentChatroom && store.currentChatroom.messages && store.currentChatroom.messages.map((message) => (
   <p>{message.user == store.username? " " : message.user} {message.content} {message.username} {message.created_at} </p> 

  ))
}
      <form>
        <Textarea value={msgText} onChange={event => setMsgText(event.target.value)} margin="1em 0em"   height="40px" width="100%"  padding="10px" fontSize="12px"  placeholder={"Add text"  + " 👋"} onKeyDown={handleKeyDown}></Textarea>
      </form>
     </Default>
  </div>

 ))

}

export default ChatroomMessagesList;