import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL } from "../constants/matcher";
import {useDataStore} from "../UserContext";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { sizing } from '@material-ui/system';
import FlexView from 'react-flexview';




//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);
  ////
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [ageRange, setAgeRange] = useState([18,120]);
  const [distance, setDistance] = useState([0,1000]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    //fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
    //http://uns1.herokuapp.com/profiles?utf8=✓&search=bre&commit=Search
    
      // Load async data from an inexistent endpoint.
  
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


   const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  return (
    <>
    <div className={classes.root}>
    <Typography id="range-slider" gutterBottom>
      Age Range
    </Typography>
    <Slider 
      value={ageRange}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      valueLabelDisplay="on"
    />
    </div>

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
