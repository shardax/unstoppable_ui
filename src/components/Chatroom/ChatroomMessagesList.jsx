import React, {useState,  useEffect, useContext} from 'react'
import { useParams,  useHistory } from "react-router-dom";
import { ROOTURL } from "../../constants/matcher";
import { ActionCableContext, useDataStore } from "../../UserContext";
import Textarea from '../Styled/Textarea';
import Default from '../../layouts/Default'

const ChatroomMessagesList = () => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  //const [chatroomId, setChatroomId] = useState(useParams());
  const { chatroomId } = useParams();
  const [msgText, setMsgText] = useState("");
  const [renderMessages, setRenderMessages] = useState([]);
  
 
  
  console.log("cable", cable);

  const sendMessageToServer = (content, channel) => {
    //const store = useDataStore;
    console.log("chatroomId 2",chatroomId);
    console.log(typeof chatroomId);
    console.log(typeof parseInt(chatroomId));
    const data = {chatroomId: parseInt(chatroomId), userId: store.current_user_id , content: content}
    channel.send(data);
  }
 
  useEffect ( () => {
    if (messageSent === true){

    const channel =  cable.subscriptions.create( {
          channel: "ChatroomMessagesChannel",
          id:  parseInt(chatroomId)
    },
    { received: (data) => {
      console.log("YAY!")
      console.log("received", JSON.stringify(data))
    },
  },)

    console.log("channel", channel);
    

    setTimeout(() => {
      setMessageSent(false);
      setChannel(channel);
     // sendMessageToServer("HI ,HOW ARE YOU?", channel);
     console.log("chatroomId 1",chatroomId);
      sendMessageToServer(msgText, channel);
      setMsgText("");
      //const data = {chatroomId: 1, userId: store.current_user_id , content: "Charlie Sheen"}
      //channel.send(data);
     
      }, 1);

    return () => {
      //console.log("Unsbribin!!!g")
      // When do you unsubscribe?
      //setMessageSent(false);
      channel.unsubscribe();
    }
  }
  } , [messageSent])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      setMsgText(event.target.value);
      event.preventDefault();
      setMessageSent(true);
      //resetForm();
    }
  }

 return (
  <div>
     <Default>
      <form>
        <Textarea value={msgText} onChange={event => setMsgText(event.target.value)} margin="1em 0em"   height="40px" width="100%"  padding="10px" fontSize="12px"  placeholder={"Add text"  + " 👋"} onKeyDown={handleKeyDown}></Textarea>
      </form>
     </Default>
  </div>

 )  

}

export default ChatroomMessagesList;