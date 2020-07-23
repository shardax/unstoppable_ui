import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
import UserSection from "../Users/UserSection";
import { useObserver } from "mobx-react";
import Button from '../Button/Button';
import {useHistory, Prompt} from 'react-router-dom'


const ViewEditProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  /*

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      setDataLoading("Loading");
      const { result } = await axios.get(PROFILEURL + `/${store.profileId}.json`,
        { withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
        }})
      setCurrentProfile(result.data.profile);
    } catch (e) {
      console.log(`😱 Profile Fetch failed: ${e}`);
    }
  }
  fetchProfile()
  }, []);

*/
  // useEffect(() => {
  //   setCurrentProfile(store.profile);
  // }, [store.editMode]);
  
  // const handleEdit = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   store.editMode = true;
  // }

  return (
    <div>
      <Prompt
        when={editMode}
        message="Are you sure you want to leave? Your changes will not be saved."
      />
      <div>
        <h3 className="profile-title">My Profile</h3>
        { editMode ? null : <Button onClick={() => setEditMode(true)}>Edit Profile</Button> }
      </div>
      { editMode ? <EditProfile editControls={{editMode, setEditMode}} /> : <UserSection user={currentProfile} me={true} /> }
    </div>
  )
}
export default ViewEditProfile;