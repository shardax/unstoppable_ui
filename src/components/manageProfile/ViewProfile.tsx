import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './ViewProfile.scss'

const ViewProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const history = useHistory();

  const getProfileActivityNames = (profile) => {
    var names: string[];
    names = [];
    profile.activity_ids.map((activity_id) => {
      const matched_activity = store.activities.find((a) => { return a.id == activity_id;});
      if (matched_activity != null) {
        names.push(matched_activity.name);
      }
    })
    return names.join();
  }

  const DisplayProfileActivityNames = () => {
   return (<p> {getProfileActivityNames(store.profile)} </p>)
  }
  
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
          image={ROOTURL + store.avatarPath}
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
      /></td>
      <td>
        <h1> My Profile </h1>
        <PrintUserInfo />
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
           {store.profile.reason_for_match}
         </div>
      </td>
      <td>
      <h5><b>Cancer Location:  </b></h5>
        <div style={{fontSize: 17}}>
         {store.profile.cancer_location}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Your Current Fitness Level:</b></h5>
        <div style={{fontSize: 17}}>
          {store.profile.fitness_level}
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
          {store.profile.personality}
        </div>
      </td>
      <td>
      <h5><b>Programs for cancer treatmen: </b></h5>
        <div style={{fontSize: 17}}>
          {store.profile.part_of_wellness_program}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Activities: </b></h5>
        <div style={{fontSize: 17}}>
          <DisplayProfileActivityNames />
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Exercise Ids: </b></h5>
        <div style={{fontSize: 17}}>
          {store.profile.exercise_reason_ids}
        </div>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Exercise Location: </b></h5>
        <div style={{fontSize: 17}}>
          {store.profile.prefered_exercise_location}
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
  