import React, {useState,  useEffect, useContext} from 'react'
import { useParams,  useHistory } from "react-router-dom";
import { useObserver } from "mobx-react";
import { CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import Textarea from '../Styled/Textarea';
import Default from '../../layouts/Default';
import axios from "axios";


const ChatroomMessagesList = () => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  //const [chatroomId, setChatroomId] = useState("1");
  const { chatroomId } = useParams();
  const [msgText, setMsgText] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  //const [lastReadAt, setLastReadAt] = useState([]);
  
  
  //const renderedMessages = currentMessages.map((x) => (
  // <p>{x} </p>
  //))

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
        let url = CHATROOMSURL + "/" + chatroomId + ".json";
        const  result   = await axios.get(url,
          { 
            params: {
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
          alert(JSON.stringify(result.data.chatroom));
          setCurrentMessages(result.data.chatroom.messages);
          alert(JSON.stringify(currentMessages));
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

  
 return  useObserver(() => (
  <div>
     <Default>
      {store.currentChatroom && store.currentChatroom.messages && store.currentChatroom.messages.map((x) => (
   <p>{x.user == store.username? " " : x.username} {x.content} {x.created_at} </p>
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