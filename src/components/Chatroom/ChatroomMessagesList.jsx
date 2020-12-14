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
  const { chatroomId } = useParams();
  const [msgText, setMsgText] = useState("");
  const [renderMessages, setRenderMessages] = useState([]);
  
  console.log("cable", cable);

  const sendMessageToServer = (content, channel) => {
    //const store = useDataStore;
   
    const data = {chatroomId: 1, userId: store.current_user_id , content: content}
    channel.send(data);

  }
 
  useEffect ( () => {
    const channel =  cable.subscriptions.create( {
          channel: "ChatroomMessagesChannel",
          id: chatroomId
    },
    { received: (data) => {
      console.log("YAY!")
      console.log("received", JSON.stringify(data))
    },
  },)

    console.log("channel", channel);
    

    setTimeout(() => {
      setChannel(channel);
     // sendMessageToServer("HI ,HOW ARE YOU?", channel);
      //sendMessageToServer(msgText, channel);
      alert(JSON.stringify(store));
      const data = {chatroomId: 1, userId: store.current_user_id , content: "Charlie Sheen"}
      channel.send(data);
      setMessageSent(false);
      }, 500);
    //const data = {chatroomId: 1} //, userId: store.current_user_id , content: "HELLO3"}
    
    /*
    setTimeout(() => {
      console.log("beforesendchannel", channel);
      const data = { sent_by: "Paul", body: "This is a cool chat app." };
      channel.send({ sent_by: "Paul", body: "This is a cool chat app." });
      const data1 = { sent_by: "John", body: "This is a cool chat app." };
      channel.send(data1);
      const data2 = { sent_by: "George", body: "This is a cool chat app." };
    channel.send(data2);
    const data3 = { sent_by: "Ringo", body: "This is a cool chat app." };
    channel.send(data3);

    }, 500);*/
   
    //channel.send(data);
   // channel.send(data);
   // channel.send(data);

    return () => {
      channel.unsubscribe();
    }
   
  } , [messageSent==true])

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