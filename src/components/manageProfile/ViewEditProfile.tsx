import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"

const store = useDataStore();
const [currentProfile, setCurrentProfile] = useState(store.profile);
const [dataLoading, setDataLoading] = useState("");


const ViewEditProfile: React.FC = ({  }) => {
 
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
useEffect(() => {
  console.log(JSON.stringify(store.profile));
  setCurrentProfile(store.profile);
  }, [store.editMode]);


  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = true;
  }

  
return(
  <div>{ store.editMode ? <EditProfile profile={currentProfile} /> : <ViewProfile profile={currentProfile}/> } </div>

)
}
export default ViewEditProfile;