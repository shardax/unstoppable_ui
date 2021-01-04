import React, {useState,  useEffect, useContext} from 'react'
import { useParams, Link } from "react-router-dom";
import { useObserver } from "mobx-react";
import { ROOTURL, CHATROOMSURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import Textarea from '../Styled/Textarea';
import Default from '../../layouts/Default';
import axios from "axios";
import { createBrowserHistory } from 'history'
import Badge from '@material-ui/core/Badge';
import Button from '../../components/Styled/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Avatar} from 'antd';


const ChatroomMessagesList = () => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const { chatroomId } = useParams();
  const [msgText, setMsgText] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [members, setMembers] = useState([]);
  const [chatroomName, setChatroomName] = useState("");
  const history = createBrowserHistory({ forceRefresh: true });
  //let teamMemberPhotosInitialize = {username: "", photo: ""};
  //const [userPhotos, setUserPhotos] =  useState([]);

  
  const sendMessageToServer = (content, channel) => {
    //const store = useDataStore;
    console.log("chatroomId 2",chatroomId);
    const data = {chatroomId: parseInt(chatroomId), userId: store.current_user_id , content: content, last_read_at: store.last_read_at}
    channel.send(data);
  }
 
  useEffect ( () => {
    store.chatroomsInitialize = true;
    localStorage.setItem("userStore", JSON.stringify(store));
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
      console.log("channel", channel);
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
          setChatroomName(result.data.chatroom.name);
          setMembers(result.data.chatroom.members);
          console.log(JSON.stringify(result.data.chatroom.members));
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
  
  const DisplayTitle = () => {
    let title = "Chatroom " + chatroomName + ", Team members: ";
    let allMembers = "";
    if(members) {
      allMembers = "( ";
      members.map((member) => (allMembers = allMembers + member.username + ","));
      allMembers = allMembers.slice(0, -1);
      allMembers = allMembers + " )";
      //title = title + allMembers;
    }
    return (
      <div>
        {title} {allMembers}
      </div>
    );
  }

  const getPhoto = (username) => {
    let member = members.find(member => member.username === username);
    return member.photo;
  }

 return  useObserver(() => (
  <div>
     <Default>
      <Link style={{ textDecoration: "underline" }} to="/chatrooms">
          <Button background="white" color="#222222" fontSize="13px" padding="2px 12px" border="1px solid #222222" borderRadius="30px">
            <ArrowBackIcon className="go-back-chatrooms" />
            Go Back to Chatrooms
          </Button>
      </Link>
      {/**chatrooms && chatrooms.map(chatroom => (<Badge color="primary" badgeContent={chatroom.number_of_unreads}><button type="button" value={chatroom.id} onClick={(e) => handleClick(e)}>{chatroom.name}</button></Badge>))*/}
      <br/> <br/> <h3><DisplayTitle /></h3>
      {store.currentChatroom && store.currentChatroom.messages && store.currentChatroom.messages.map((message) => (
        <div>
          {/*<Avatar src={ROOTURL + getPhoto(message.username)}  size= "small" />*/}
          <p>{message.user == store.username? " " : message.user} {message.content} {message.username} {message.created_at} </p> 
        </div>
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