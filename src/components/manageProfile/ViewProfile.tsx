import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo, DisplayFitness, DisplayTreatmentStatus, DisplayPartnerReason, DisplayPersonality, DisplayCancerLocation} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './ViewProfile.scss'

const ViewProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const history = useHistory();

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = true;
    history.push("/profile");
  }
  return (
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
      <button onClick={handleEdit}>
            Edit Profile
      </button>
      </td>
        </tr>
      </table>
      </div>
    {/*
    <FlexView hAlignContent='center' width ={1300}>
    <FlexView hAlignContent='center' basis={1100} height={250} style={{backgroundColor : 'pink'}}>
        <FlexView  style={{ width: 20, height: 100 }}></FlexView>
        <AvatarEditor
          image={ROOTURL + store.avatarPath}
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
        />
        
        <FlexView column basis={200}></FlexView>
        <FlexView column basis={200}>
        <FlexView  style={{ width: 20, height: 80 }}></FlexView>
          <FlexView hAlignContent='center'><h3><b>My Profile</b></h3></FlexView>
          <FlexView hAlignContent='center'> <PrintUserInfo /> </FlexView>
        </FlexView>
        <FlexView column basis={200}></FlexView>
        <FlexView column basis={200}>
        <FlexView  style={{ width: 20, height: 100 }}></FlexView>
          <button onClick={handleEdit}>
            Edit Profile
          </button>
        </FlexView>
  </FlexView>
  </FlexView>
*/}
<div className="Questions">
  <table>
    <tr>
      <td>
      <h5><b>Reasons For Wanting Partner: </b></h5>
      <DisplayPartnerReason/>
      </td>
      <td>
      <h5><b>Cancer Location:  </b></h5>
      <DisplayCancerLocation/>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Your Current Fitness Level:</b></h5>
      <DisplayFitness/> 
      </td>
      <td>
      <h5><b>Treatment Status: </b></h5>
      <DisplayTreatmentStatus/>
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Personality: </b></h5>
      <DisplayPersonality/>
      </td>
    </tr>
  </table>
</div>
{/*  <FlexView hAlignContent='center' width ={1300}>
  <FlexView hAlignContent='center' basis={1100} height={350} style={{backgroundColor : 'pink'}}>
      <FlexView column basis={300} width={300} style={{fontSize: 20}}>
        <FlexView><b>Reasons For Wanting Partner: </b></FlexView>
        <FlexView><DisplayPartnerReason/></FlexView>
        <FlexView> <b>Cancer Location:  </b></FlexView>
        <FlexView><DisplayCancerLocation/></FlexView>
        <FlexView> <b>Your Current Fitness Level:</b></FlexView>
        <FlexView> <DisplayFitness/> </FlexView>
      </FlexView> 
      <FlexView column basis = {100}></FlexView>
      <FlexView column basis={300} width={300} style={{fontSize: 20}}>
      <FlexView> <b>Treatment Status: </b></FlexView>
        <FlexView><DisplayTreatmentStatus/></FlexView>
        <FlexView><b>Personality: </b></FlexView>
        <FlexView> <DisplayPersonality/></FlexView>
      </FlexView>
  </FlexView>
</FlexView> */}
  

  </Container>
      </React.Fragment>
      
    </div>
  );   
}
export default ViewProfile;
  