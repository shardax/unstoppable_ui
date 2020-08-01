import React, {useState} from 'react'
import {Avatar} from 'antd';
import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";
import messages from '../../pages/messages';
import './index.scss';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const exampleList = [
  {
    image: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f14010b9eb432b4af4cccebc17bbccb5cf16ec7/DSC00071.JPG",
    name: "sparky",
    recent: {
      subject: "Hi",
      content: "Hello, I am looking for a workout partner!",
      timestamp: "2020-07-22T21:33:18.125Z"
    }
  },
  {
    image: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z"
    }
  }
]

const Inbox = () => {
  const store = useDataStore();
  const [currChat, setCurrChat] = useState('')
  
  const Message = ({ message }) => {
    return (
      <div onClick={() => setCurrChat(message.name)} className={"single-message-wrapper " + (message.name === currChat ? "active-conversation" : "" )}>
        <div className="single-message-avatar">
          <Avatar src={ROOTURL + message.image}  size= "large" />
          <div className="message-from-title">{message.name}</div>
        </div>
        <div className="single-message-recent">
          <div className="message-subject">
            {message.recent.subject}
          </div>
          <div>
            {message.recent.content}
          </div>
        </div>
        <ArrowForwardIcon />
      </div>
    )
  }

  return (
    <div className="messages-wrapper">
      <div className="inbox-wrapper">
        <nav className="pink-nav conversation-nav-wrapper">
          <div className="conv-nav-text">
          My Inbox
          </div>
        </nav>
        {exampleList.map((message: any) => (
          <>
            <Message message={message} />
          <hr></hr>
          </>
        ))}
      </div>
      <div className="conversation-wrapper">
        <nav className="purple-nav conversation-nav-wrapper">
          <div className="conv-nav-text">
           {currChat === "" ? "Select or start conversation" : "Chat with " +  currChat}
          </div>
        </nav>
        {currChat === "" ? "Select or start conversation" : "Chat with " +  currChat}
      </div>
    </div>
  )
}

export default Inbox
