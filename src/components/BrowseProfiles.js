import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL } from "../constants/matcher";
import RangeSlider from "./RangeSlider";
import FlexView from 'react-flexview';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
  const [ageRange, setAgeRange] = useState([18,120]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
      let url = ALLPROFILESURL + `?&min_age=` + ageRange[0] + `&max_age=` + ageRange[1] + `&distance=` + distance + `""commit=Search&search=${filter}`;
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
    };
 
  return (
    <>
    <div>
        <CssBaseline />
        <Container maxWidth="xl">
        <FlexView hAlignContent='center'>
          <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Cancer Type OR Zipcode OR City"  width="50" />
        </FlexView>
          <FlexView hAlignContent='right'>
            <RangeSlider ageRange={ageRange} onChange={handleChange}/>
          </FlexView>
          <Divider/>
          {userCollection.map((profile, index) => (
            <>
              <p>Username:{profile.name}, Cancer Location:{profile.cancer_location}, zipcode: {profile.zipcode} age:{profile.age}</p>
              <img src={ROOTURL + profile.photo} height={160} width={200} />
            </>
          ))}
      </Container>
    </div>
    </>
      );
}

export default BrowseProfiles;
