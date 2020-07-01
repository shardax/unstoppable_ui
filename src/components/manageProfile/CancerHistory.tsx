import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo} from "./CommonElements";
import {CANCERLOCATIONLIST} from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'

const AboutMe: React.FC = ({  }) => {
  const store = useDataStore();
  const history = useHistory();

  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  

  const handleBackToView = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = false;
    console.log("In handleBackToView");
    history.push("/profile");
    setInputSubmitted(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("In handleSubmit");
    setInputSubmitted(true);
  }

  return (
    <Default>
    <div>
      
   <FlexView basis={1000}>
        <FlexView column>
          <PrintUserInfo/>
        </FlexView>
        <FlexView column basis={20}></FlexView>
        <FlexView hAlignContent='center'>
            <FlexView column basis={500} width={500} style={{fontSize: 18}}>
            <FlexView><b>What was your primary cancer diagnosis?  </b></FlexView>  <br/>
            <FlexView><input  value={store.profile.cancer_location} width="100" height='10' /></FlexView>  <br/>
            <FlexView><b>Additional Cancer Information (e.g., stage, year diagnosed, DCIS, TNBC):</b></FlexView>  <br/>
            <FlexView><input    width="100" height='10' /></FlexView>  <br/>
            <FlexView><b>Which of the following best describes you? </b></FlexView>  <br/>
            <FlexView><input   width="100" height='10' /></FlexView>  <br/>
            <FlexView><b>Please briefly describe your cancer treatments: </b></FlexView>  <br/>
            <FlexView><input  value={store.profile.treatment_description}  width="100" height='10' /></FlexView>  <br/>
            <FlexView><b>Have you ever been part of a support group or wellness program following your cancer diagnosis?: </b></FlexView>  <br/>
            <FlexView><input   width="100" height='10' /></FlexView>  <br/>
            <FlexView><b>If yes, what program? (list the name and location if possible, for example: INOVA Life with Cancer-Breast Cancer Support Group, Fairfax):</b></FlexView>  <br/>
            <FlexView><input  placeholder="INOVA"  width="100" height='10' /></FlexView>
            </FlexView>
        </FlexView>
        <FlexView column basis={100}></FlexView>
        <FlexView column basis={200}>
          <FlexView  style={{ width: 20, height: 30 }}></FlexView>
          <FlexView  style={{ width: 200, height: 100 }}><h3><b>Edit Profile</b></h3></FlexView>
        </FlexView>
    </FlexView>
    
    
    </div>
    </Default>
    
      );
    
}
export default AboutMe;
