import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL } from "../constants/matcher";
import RangeSlider from "./RangeSlider";


//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
  const [ageRange, setAgeRange] = useState([18,120]);
  const [distance, setDistance] = useState([0,1000]);

  // Load full list when the component gets mounted and filter gets updated
  useEffect(() => {
      let url = ALLPROFILESURL + `?&min_age=` + ageRange[0] + `&max_age=` + ageRange[1] + `&distance=` + distance[0] + `""commit=Search&search=${filter}`;
      axios
      .get(url, { withCredentials: true },{headers:{
        contentType: "application/json; charset=utf-8",
      }})
      .then(response => {
        console.log(response);
        setUserCollection(response.data);
      }).catch (e => {
        console.log(`😱 Axios request failed: ${e}`);
        setUserCollection([]);
      })
    }, [filter, ageRange]);

    const handleChange = (event, newAgeRange) => {
        setAgeRange(newAgeRange);
        console.log(newAgeRange);
    };
 
  //const [value, setValue] = React.useState([20, 37]);
  return (
    <>
    <div>
      <RangeSlider ageRange={ageRange} onChange={handleChange}/>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {userCollection.map((profile, index) => (
        <>
          <p>Username:{profile.name}, Cancer Location:{profile.cancer_location}, zipcode: {profile.zipcode} age:{profile.age}</p>
          <img src={ROOTURL + profile.photo} height={160} width={200} />
        </>
      ))}
    </div>
    </>
      );
}

export default BrowseProfiles;
