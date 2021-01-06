import React, {useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import { ActionCableContext, useDataStore } from "../../UserContext";
import './index.scss';
import Badge from '@material-ui/core/Badge';
import { createBrowserHistory } from 'history'

const ChatroomListItem = ({chatroom, viewOnly}) => {
  const store = useDataStore();
  const cable = useContext(ActionCableContext);
  const history = createBrowserHistory({ forceRefresh: true });
  
  useEffect ( () => {
    if (!store.chatroomsInitialized.includes(chatroom.id)){
      store.chatroomsInitialized.push(chatroom.id);
      const channel =  cable.subscriptions.create( 
                        { channel: "ChatroomMessagesChannel", id: chatroom.id },
                          { received: (data) => {
                              console.log("received!!!", JSON.stringify(data))
                             // setTimeout(() => {
                              if (store.currentChatroom.chatroomId === parseInt(data.chatroomId))
                                console.log("pushing data", data);
                                store.currentChatroom.messages.push(data);
                                localStorage.setItem("userStore", JSON.stringify(store));
                             // }, 100)
                            },
                          },
                        )

      //return () => {
      //  channel.unsubscribe();
      //}
      console.log("viewOnly", viewOnly);
    }
  } , [chatroom])
  
  const handleClick = (event) => {
    console.log(event.target.value);
    history.push("/chatroomDetails/" + event.target.value);
  }

  const handleInit = (event) => {
    if(!store.chatroomsInitialize == true){
      store.chatroomsInitialize = true;
      localStorage.setItem("userStore", JSON.stringify(store));
    }
  }


 return (
  <div>{/**chatrooms && chatrooms.map(chatroom => (
   *<Badge color="primary" badgeContent={chatroom.number_of_unreads}><button type="button" value={chatroom.id} onClick={(e) => handleClick(e)}>{chatroom.name}</button></Badge>))
   * */}

    <Link to={`chatroomDetails/${chatroom.id}`} onClick={handleInit}>
    
        <div className={"single-conversation-wrapper "}>
        <div className="conversation-subject">
              {chatroom.name}<Badge color="primary" badgeContent={chatroom.number_of_unreads}></Badge>
            </div>
          <hr></hr>
        </div>
    </Link>
    {/** <div className="conversation-subject">
      <Badge color="primary" badgeContent={chatroom.number_of_unreads}><button type="button" value={chatroom.id} onClick={(e) => handleClick(e)}>{chatroom.name}</button></Badge>
  </div> **/}
  </div>
 )
}

export default ChatroomListItem;