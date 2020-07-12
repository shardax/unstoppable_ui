import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import { ProfileStore } from '../../UserStore';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
import CheckboxExample from "./CheckboxExample"

const store = useDataStore();
const [currentProfile, setCurrentProfile] = useState(store.profile);
const [dataLoading, setDataLoading] = useState("");


const ViewEditProfile: React.FC = ({  }) => {
 
  /** 
  useEffect(() => {
    axios
    .get(PROFILEURL + `/${store.profileId}.json`, { withCredentials: true })
    .then(result => {
      console.log(result);
      setCurrentProfile(result.data.profile);
      console.log(ROOTURL + store.avatarPath );
    }).catch (e => {
      console.log(`😱 Axios request failed: ${e}`);
    })
  }, []);

  **/
/** 
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
**/

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = true;
  }

  
return(
  <div>{ store.editMode ? <EditProfile /> : <ViewProfile profile={store.profile}/> } </div>

)
}
export default ViewEditProfile;