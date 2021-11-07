import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import {Prompt, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from "react";

import {Avatar} from 'antd';
import Button from '../Styled/Button';
import EditProfile from "./EditProfile"
import UserSection from "../Users/UserSection";
import {useDataStore} from "../../UserContext";
import { useObserver } from "mobx-react";

const ViewEditProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  
  return (
    <div>
      <Prompt
        when={editMode}
        message="Are you sure you want to leave? Your changes will not be saved."
      />
      <div>
        { editMode ? (
        <div>
          <h3 className="editProfile">Edit Profile</h3>
          <div>
            <Avatar src={ROOTURL + store.avatarPath}  size={200} />
            <span style={{display : 'inline-block', padding: '30px'}}>
              <h4 className="userName"> {store.username}</h4>
              <h5 className="userAge">Age: {currentProfile.age}</h5>
            </span>
          </div>
        </div> 
        ) : <h3>My Profile</h3>}
        { editMode ? null : <Button onClick={() => setEditMode(true)}>Edit Profile</Button> }
      </div>
      { editMode ? <EditProfile editControls={{editMode, setEditMode}} /> : <UserSection user={currentProfile} me={true} /> }
    </div>
  )
}
export default ViewEditProfile;