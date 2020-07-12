import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { ProfileStore, ProfileProps } from '../../UserStore';
import axios from "axios";
import { PROFILEURL, ROOTURL} from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo, DisplayProfileActivityNames, DisplayExerciseReasons} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './ViewProfile.scss'


const ViewProfile = (props: ProfileProps) => {
  const store = useDataStore();
  const history = useHistory();

  const profile = store.profile;

  console.log("VIEWPROFILE");
  console.log(JSON.stringify(profile));
  
  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = true;
    history.push("/profile");
  }
  return (
    <Default>
    <div>
    <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl"> 
    <div className="profile-box">
      
      <table className="header">
        <tr>
          <td><AvatarEditor
          image={ROOTURL + profile.photo}
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
      /></td>
      <td>
        <h1> My Profile </h1>
        {PrintUserInfo(profile)}
      </td>
      <td>
      <button className="editButton" onClick={handleEdit}>
            Edit Profile
      </button>
      </td>
        </tr>
      </table>
      </div>
          
<div className="Questions">
  <table>
    <tr>
      <td>
      <h5><b>Reasons For Wanting Partner: </b></h5>
         <div style={{fontSize: 17}}>
           {profile.reason_for_match}
         </div>
      </td>
      <td>
      <h5><b>Cancer Location:  </b></h5>
        <div style={{fontSize: 17}}>
         {profile.cancer_location}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Your Current Fitness Level:</b></h5>
        <div style={{fontSize: 17}}>
          {profile.fitness_level}
        </div>
      </td>
      <td>
      <h5><b>Treatment Status: </b></h5>
        <div style={{fontSize: 17}}>
         {store.profile.treatment_status}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Personality: </b></h5>
        <div style={{fontSize: 17}}>
          {profile.personality}
        </div>
      </td>
      <td>
      <h5><b>Programs for cancer treatmen: </b></h5>
        <div style={{fontSize: 17}}>
          {profile.part_of_wellness_program}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Activities: </b></h5>
        <div style={{fontSize: 17}}>
          <DisplayProfileActivityNames profileToDisplay= {profile}/>
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Exercise Ids: </b></h5>
        <div style={{fontSize: 17}}>
        <DisplayExerciseReasons profileToDisplay= {profile}/>
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Exercise Location: </b></h5>
        <div style={{fontSize: 17}}>
          {profile.prefered_exercise_location}
        </div>
      </td>
    </tr>
  </table>
</div>
  </Container>
      </React.Fragment>
      
    </div>
    </Default>
      );   
}
export default ViewProfile;
  