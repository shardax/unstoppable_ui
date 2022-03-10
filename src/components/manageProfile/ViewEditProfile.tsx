import "react-popupbox/dist/react-popupbox.css";

import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { PopupboxContainer, PopupboxManager } from "react-popupbox";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Avatar } from "antd";
import Button from "../Styled/Button";
import EditProfile from "./EditProfile";
import UserSection from "../Users/UserSection";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";


const ViewEditProfile: React.FC = ({}) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);


  

  const openPopupbox = () => {
    setEditMode(true);
    // window.addEventListener("scroll", () => {window.scrollTo(0,0)});
    // window.removeEventListener("scroll", () => {window.scrollTo(0,0)});

    const content = (
      <div>
        <div>
          <div className="inline-flex">
            <h3 className="editProfile">Edit Profile</h3>
            
          </div>

          <div>
            <Avatar src={ROOTURL + store.avatarPath} size={200} />
            <span style={{ display: "inline-block", padding: "30px" }}>
              <h4 className="userName"> {store.username}</h4>
              <h5 className="userAge">Age: {currentProfile.age}</h5>
            </span>
          </div>
        </div>

        <EditProfile editControls={{ editMode, setEditMode }} />
      </div>
    );
    PopupboxManager.open({ content });
  };

  return (
    <div>
      <Prompt
        when={editMode}
        message="Are you sure you want to leave? Your changes will not be saved."
      />
      {/* <div>
        <h3>My Profile</h3>
        <Button onClick={openPopupbox}>Edit Profile</Button>
            
        <div>
          
          <PopupboxContainer { ...popupboxConfig }/>
        </div>
      </div> */}
      <UserSection user={currentProfile} me={true} />
    </div>
  );
};
export default ViewEditProfile;
