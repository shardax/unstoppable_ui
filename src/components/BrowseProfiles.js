import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL } from "../constants/matcher";
import {useDataStore} from "../UserContext";


//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
  ////
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    //fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
    //http://uns1.herokuapp.com/profiles?utf8=✓&search=bre&commit=Search
    
      // Load async data from an inexistent endpoint.
    axios
    .get(ALLPROFILESURL + `?&min_age=18&max_age=130&distance=""commit=Search&search=${filter}`, { withCredentials: true },{headers:{
      contentType: "application/json; charset=utf-8",
    }})
    .then(response => {
      console.log(response);
      setUserCollection(response.data);
    }).catch (e => {
      console.log(`😱 Axios request failed: ${e}`);
      setUserCollection([]);
    })
  }, [filter]);

  return (
    <>
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {userCollection.map((profile, index) => (
        <>
        <p>Username:{profile.name}, Cancer Location:{profile.cancer_location}, zipcode: {profile.zipcode}</p>
        <img src={ROOTURL + profile.photo} height={160} width={200} />
        </>
      ))}
    </div>
    </>
      );
}

export default BrowseProfiles;
