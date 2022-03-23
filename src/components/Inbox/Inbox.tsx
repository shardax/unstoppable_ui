import "./index.scss";

import {
  ALLCONVERSATIONSURL,
  ROOTURL,
  SENDMESSAGEURL,
} from "../../constants/matcher";
import { ALLPROFILESURL, PROFILEURL } from "../../constants/matcher";
import React, { useEffect, useState } from "react";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Avatar } from "antd";
import Button from "../Styled/Button";
import Default from "../../layouts/Default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "@material-ui/core/Paper";
import Textarea from "../Styled/Textarea";
import TimeAgo from "timeago-react";
import axios from "axios";
import { useDataStore } from "../../UserContext";
import SendIcon from "../../images/SendIcon.png";

// TODO need to move up
// Format nested params correctly

const exampleList = [
  {
    image:
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f14010b9eb432b4af4cccebc17bbccb5cf16ec7/DSC00071.JPG",
    name: "sparky",
    recent: {
      subject: "Hi",
      content: "Hello, I am looking for a workout partner!",
      timestamp: "2020-07-22T21:33:18.125Z",
    },
  },
  {
    image:
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z",
    },
  },
  {
    image:
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z",
    },
  },
  {
    image:
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z",
    },
  },
  {
    image:
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--206caec808c0bd049c0ff4cb3a0c2a397dcb6d0e/IMG_20151017_135531.jpg",
    name: "Cynthia",
    recent: {
      subject: "Reaching out.",
      content: "Hi, I'm interested in finding a tennis partner!",
      timestamp: "2020-07-22T21:33:18.125Z",
    },
  },
];

const exampleMessages = {
  sparky: [
    {
      to: "Cynthia",
      from: "me",
      content: "Hello!",
    },
    {
      to: "Sparky",
      from: "me",
      content:
        "Just reaching out to see if you would want to play tennis together! I am usually free after 5 on weekdays.",
    },
    {
      to: "me",
      from: "Sparky",
      content: "Yes I would love to play tennis with you!",
    },
  ],
};

const Inbox = () => {
  //const Inbox: React.FC<UserProp> = (props) => {
  let newConversationInitialize = {
    messages: [],
    id: "",
    photo: "",
    name: "",
    participant_id: "",
    recent: {
      subject: "",
      content: "",
      timestamp: "",
    },
  };
  const store = useDataStore();
  const [currChat, setCurrChat] = useState("");
  let { user_id } = useParams();
  const [currConversation, setCurrConversation] = useState(
    newConversationInitialize
  );
  //console.log("user id");
  //console.log(user_id);
  const [msgText, setMsgText] = useState("");
  const [subject, setSubject] = useState("");
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [isError, setIsError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [conversationList, setConversationList] = React.useState<any>([]);
  const [newConversation, setNewConversation] = useState(false);
  const [numberOfProfiles, setNumberOfProfiles] = useState(0);
  const [userCollection, setUserCollection] = React.useState<any>([]);

  const history = useHistory();

  if (user_id === "") {
    setNewConversation(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      event.preventDefault();
      setMessageSent(true);
      //resetForm();
    }
  };

  const handleClick = (event) => {
    if (msgText !== "") {
      event.preventDefault();
      setMessageSent(true);
    }
  }

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL, {
          headers: {
            contentType: "application/json; charset=utf-8",
          },
        });
        setUserCollection(data.profiles);
        setNumberOfProfiles(data.number_of_profiles);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    };
    getProfiles();
  }, []);

  useEffect(() => {
    setIsError(false);
    const fetchData = async () => {
      try {
        if (messageSent) {
          if (newConversation) {
            let data = { user_id: user_id, subject: subject, body: msgText };
            let url = SENDMESSAGEURL;
            const result = await axios.post(url, data, {
              withCredentials: true,
              headers: {
                contentType: "application/json; charset=utf-8",
                Accept: "application/json",
              },
            });
            setCurrConversation(result.data);
            refreshData();
            setMsgText("");
            setNewConversation(false);
          } else {
            let data = {
              recipients: currConversation.participant_id,
              subject: currConversation.recent.subject,
              body: msgText,
            };
            let url =
              SENDMESSAGEURL +
              "/" +
              currConversation.id +
              "/messages/createwithjson";
            const result = await axios.post(url, data, {
              withCredentials: true,
              headers: {
                contentType: "application/json; charset=utf-8",
                Accept: "application/json",
              },
            });
            setCurrConversation(result.data);
            refreshData();
            setMsgText("");
          }
        }

        setMessageSent(false);
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        setMessageSent(false);
        setIsError(true);
      }
    };
    fetchData();
  }, [messageSent]);

  async function refreshData() {
    let paramsStr = user_id ? user_id : "";
    try {
      const result = await axios.get(ALLCONVERSATIONSURL, {
        params: {
          participant_id: paramsStr,
        },
        withCredentials: true,
        headers: {
          contentType: "application/json; charset=utf-8",
        },
      });
      setConversationList(result.data.conversations);
      if (user_id) {
        setUsername(result.data.participant_name);
        setUserPhoto(result.data.participant_photo);
      }
    } catch (error) {
      //console.log(JSON.stringify(error));
      console.log(error.message);
      setIsError(true);
    }
  }

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    console.log("in useEffect settting currChat");
    console.log(currConversation);
    setCurrChat(currConversation.name);
    setNewConversation(false);
    setSubject(currConversation.recent.subject);
    setUserPhoto(currConversation.photo);
    console.log(currChat);
  }, [currConversation]);

  const Conversation = ({ message }) => {
    {
      /*alert(JSON.stringify(message));*/
    }
    return (
      <div
        onClick={() => setCurrConversation(message)}
        className={
          "single-conversation-wrapper " +
          (message.name === currChat ? "active-conversation" : "")
        }
      >
        <div className="single-conversation-avatar ">
          <Avatar
            className=".ant-avatar-sm"
            src={ROOTURL + message.photo}
            size="small"
          />
          <span className="status bottomRight"></span>
          {/* <div className="conversation-from-title">{message.name}</div> */}
        </div>
        {message && message.recent && (
          <div className="single-conversation-recent">
            <div className="conversation-header">
              <div className="conversation-subject">{message.name}  </div>
              <div className="conversation-time">
                <TimeAgo datetime={Date()} locale="en.US" />
              </div>
            </div>
            <div className="conversation-preview">
              {/* <div>{message.recent.content}</div> 
              <div className="message-icon-orange">23</div> */}
              
              <div className="maxWidthMessagePreview">{String(message.recent.content).length >= 20 ? String(message.recent.content).substring(0, 20) + " ... " : String(message.recent.content)}</div>
              <div className="message-icon-orange">23</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Message = ({ content, from, to, updated_at }) => {
    const isMe = (from: string, me: string) => from === me;

    return (
      // <div
      //   className={
      //     "flex-row " +
      //     (isMe(from, store.username) ? "from-me-row" : "from-them-row")
      //   }
      // >
      //   {!isMe(from, store.username) &&
      //     <Avatar
      //       className=".ant-avatar-sm"
      //       src={ROOTURL + userPhoto}
      //       size="small"
      //     />
      //   }
      //   <span
      //     className={
      //       "single-message-wrapper " +
      //       (isMe(from, store.username)
      //         ? "from-me-message"
      //         : "from-them-message")
      //     }
      //   >
      //     {content}{" "}
      //     <span id="date_display" style={{ display: "block", float: "right" }}>
      //       {" "}
      //       <TimeAgo datetime={updated_at} locale="en.US" />{" "}
      //     </span>
      //   </span>
      //   {isMe(from, store.username) &&
      //     <Avatar
      //       className=".ant-avatar-sm"
      //       src={ROOTURL + userPhoto}
      //       size="small"
      //     />
      //   }
      // </div>
      <div>
        <div
          className={
            "flex-row " +
            (isMe(from, store.username) ? "from-me-row" : "from-them-row")
          }
        >
          {!isMe(from, store.username) &&
            <Avatar
              className=".ant-avatar-sm from-them-image"
              src={ROOTURL + userPhoto}
              size="small"
            />
          }
          <span
            className={
              "single-message-wrapper " +
              (isMe(from, store.username)
                ? "from-me-message"
                : "from-them-message")
            }
          >
            {content}{" "}
            {/* <span id="date_display" style={{ display: "block", float: "right" }}>
              {" "}
              <TimeAgo datetime={updated_at} locale="en.US" />{" "}
            </span> */}
          </span>
          {isMe(from, store.username) &&
            <Avatar
              className=".ant-avatar-sm from-me-image"
              src={ROOTURL + userPhoto}
              size="small"
            />
          }
        </div>
        <div 
          className={
            "flex-row " +
            (isMe(from, store.username) ? "from-me-row" : "from-them-row")
          }
        >
          <span
            className={
              "single-date-wrapper " + 
              (isMe(from, store.username)
                ? "from-me-date"
                : "from-them-date")
            }
          >
            {"Message Seen "}
            <Datetime datetime={updated_at} />
          </span>
        </div>
      </div>
    );
  };

  const Datetime = ({ datetime }) => {
    const seen: Date = new Date(datetime);
    const now: Date = new Date();

    if (seen.getDate() !== now.getDate()) {
      return <TimeAgo datetime={datetime} locale="en.US" />
    }

    let text = "";

    const hours = seen.getHours();

    if (hours == 0) {
      text = `12:${seen.getMinutes()}am`;
    } else if (hours > 12) {
      text = `${hours - 12}:${seen.getMinutes()}pm`;
    } else if (hours == 12) {
      text = `12:${seen.getMinutes()}pm`;
    } else {
      text = `${hours}:${seen.getMinutes()}am`;
    }

    return (
      <>{text}</>
    );
  }

  const handleNewConversation = (event: any) => {
    event.preventDefault();
    setNewConversation(true);
    setCurrChat("");
    setMsgText("");
    setSubject("");
  };

  function InboxWrapper() {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [search, setSearch] = useState("");

    return (
      <div className="inbox-wrapper">
        {console.log(displaySearch, "displayysearchhh")}
        {/* <nav className="pink-nav conversation-nav-wrapper"> */}
        {displaySearch && (
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for contacts"
              className="global-input"
              value={search}
            />
          </div>
        )}
        {!displaySearch && (
          <div className="conv-nav-header">
              <h3 className="nav-header">Inbox Message&nbsp;<span className="message-icon-orange">26</span></h3>
              
            <button
              onClick={() => setDisplaySearch(true)}
              className="search-Icon"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        )}

        {/* </nav> */}
        {console.log(conversationList, "conversationList!!!!")}
        {conversationList
          .filter((person) =>
            person.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((conversation: any) => (
            <>
              {console.log(conversation.participant_id)}
              {/* {useEffect(
              () => {
                const getProfiles = async () => {
                  try {
                    const { data } = await axios.get(ALLPROFILESURL,
                      { 

            )} */}
              <Conversation message={conversation} />
              {/* <hr></hr> */}
            </>
          ))}
      </div>
    );
  }

  return (
    <Default>
      <div>
        {user_id && (
          <Button
            margin="2em 0em"
            padding="10px 20px"
            onClick={handleNewConversation}
          >
            {" "}
            Click here for New Conversation with {username}{" "}
          </Button>
        )}
        <div className="messages-wrapper">
          <InboxWrapper />
          <div className="conversation-wrapper">
            <nav className="white-nav conversation-nav-wrapper">
              <div className="conv-nav-text">
                {/* {currChat === ""
                  ? "Select or start conversation"
                  : "Chat with " + currChat + ", Subject: " + subject}
                {currChat && (
                  <Avatar src={ROOTURL + currConversation.photo} size="large" />
                )} */}
                <span className="single-conversation-avatar nav-image">
                  <Avatar 
                    className="ant-avatar-sm"
                    src={ROOTURL + currConversation.photo} 
                    size="large" 
                  />
                  <span className="status bottomRight"></span>
                </span>
                <span
                  className="chat-info"
                >
                  <div
                    className="chat-user"
                  >
                    {currChat}
                  </div>
                  <div
                    className="chat-status"
                  >
                    Active Now
                  </div>
                </span>
              </div>
            </nav>
            {/* {currChat === "" ? "Select or start conversation" : "Chat with " +  currChat} */}
            {!newConversation &&
              currConversation.messages.map((message: any) => (
                <>
                  <Message
                    content={message.content}
                    from={message.from}
                    to={message.to}
                    updated_at={message.updated_at}
                  />
                  {/* <hr></hr> */}
                </>
              ))}
            <form>
              {newConversation && (
                <div className="form-group">To: {currChat}</div>
              )}
              {newConversation && (
                <div className="form-group">
                  <input
                    type="subject"
                    name="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    required
                  />
                </div>
              )}
              {newConversation && (
                <div
                  className="flex-row"
                >
                  <span
                    className="msg-text"
                  >
                    <Textarea
                      value={msgText}
                      onChange={(event) => setMsgText(event.target.value)}
                      margin="1em 0em"
                      height="40px"
                      width="100%"
                      padding="10px"
                      fontSize="12px"
                      border="2px solid #9560A8"
                      borderRadius="50px"
                      placeholder={"Write a message "}
                      onKeyDown={handleKeyDown}
                    ></Textarea>
                  </span>
                  <span
                    className="msg-send"
                    onClick={handleClick}
                  >
                    <img src={SendIcon} />
                  </span>
                </div>
              )}
              {currChat && (
                <div
                  className="flex-row"
                >
                  <span
                    className="msg-text"
                  >
                    <Textarea
                      value={msgText}
                      onChange={(event) => setMsgText(event.target.value)}
                      margin="1em 0em"
                      height="40px"
                      width="100%"
                      padding="10px"
                      fontSize="12px"
                      placeholder={"Write a message "}
                      onKeyDown={handleKeyDown}
                    ></Textarea>
                  </span>
                  <span
                    className="msg-send"
                    onClick={handleClick}
                  >
                    <img 
                      src={SendIcon} 
                    />
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Default>
  );
};

export default Inbox;