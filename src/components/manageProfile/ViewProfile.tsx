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
   
   <FlexView basis={1000} height={300}>
        <AvatarEditor
          image={ROOTURL + store.avatarPath}
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
        />
        <PrintUserInfo />
        <FlexView column basis={100}></FlexView>
        <FlexView column basis={200}>
          <FlexView  style={{ width: 20, height: 30 }}></FlexView>
          <FlexView  style={{ width: 200, height: 100 }}><h3><b>My Profile</b></h3></FlexView>
        </FlexView>
        <FlexView column basis={100}>
          <button onClick={handleEdit}>
            Edit Profile
          </button>
        </FlexView>
  </FlexView>


  <FlexView column basis={100} width={100}>
      <FlexView column basis={270} width={300}>
          <FlexView> Reasons For Wanting Partner: </FlexView>
          <FlexView><DisplayPartnerReason/></FlexView>
          <FlexView> Cancer Location:  </FlexView>
          <FlexView><DisplayCancerLocation/></FlexView>
          <FlexView> Your Current Fitness Level:  </FlexView>
          <FlexView> <DisplayFitness/> </FlexView>
          <FlexView> Treatment Status: </FlexView>
          <FlexView><DisplayTreatmentStatus/></FlexView>
          <FlexView> Personality:  </FlexView>
          <FlexView> <DisplayPersonality/></FlexView>
     </FlexView>  
  </FlexView>

  </Container>
      </React.Fragment>
      
    </div>
      );   
}
export default ViewProfile;
  