import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
import UserSection from "../Users/UserSection";
import { useObserver } from "mobx-react";
import Button from '../Styled/Button';
import {useHistory, Prompt} from 'react-router-dom'


const ViewEditProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
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
          <h3 className="profile-title">Edit Profile</h3>
          <p>All changes will become part of your profile.</p>
        </div> 
        ) : <h3>My Profile</h3>}
        { editMode ? null : <Button onClick={() => setEditMode(true)}>Edit Profile</Button> }
      </div>
      { editMode ? <EditProfile editControls={{editMode, setEditMode}} /> : <UserSection user={currentProfile} me={true} /> }
    </div>
  )
}
export default ViewEditProfile;