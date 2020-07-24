import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo} from "./CommonElements";
import Default from '../../layouts/Default'
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS} from "../../constants/ProfileConstants"
import useDropdown from '../common/useDropDown';
import { ProfileStore } from '../../UserStore';

type AboutMeComponentProps = {
  reload: (name: string, value: any) => void,
  inputChange: (e: any) => void,
  currentEditProfile: ProfileStore
};


const AboutMe = (props: AboutMeComponentProps) => { 
  const store = useDataStore();
  const history = useHistory();

  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [fitnessLevel, FitnessLevelDropdown ] = useDropdown("Fitness Level", store.profile.fitness_level, FITNESS_LEVEL_DESCRIPTIONS);
  const [exerciseLocation, ExerciseLocationDropdown] = useDropdown("", store.profile.prefered_exercise_location, PREFERRED_EXERCISE_LOCATIONS);
  const [personalityDescription, PersonalityDescriptionDropdown] = useDropdown("", store.profile.personality, PERSONALITY_DESCRIPTION);
  const [preferredTime, PreferredTimeDropdown] = useDropdown("", store.profile.prefered_exercise_time, PREFERRED_TIME_DESCRIPTIONS);
  const [workStatus, WorkStatusDropdown] = useDropdown("", store.profile.work_status, WORK_STATUS_DESCRIPTIONS)
  // reason_for_match
 // const [reasonForMatch, setReasonForMatch ] = useState("");
 
  
  const handleBackToView = (event: React.MouseEvent) => {
    event.preventDefault();
    // store.editMode = false;
    console.log("In handleBackToView");
    history.push("/profile");
    setInputSubmitted(true);
  }

 
/*
  useEffect(() => {
    console.log("In useEffect, print changes");
    console.log(fitnessLevel);
    props.reload(fitnessLevel);
  }, [fitnessLevel]);
*/

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("In handleSubmit");
    setInputSubmitted(true);
  }
  return (
    
    <div>
      
   <FlexView basis={1000}>
        
        <FlexView column basis={300} width={300}></FlexView>
        <FlexView hAlignContent='center'>
            <FlexView column basis={350} width={500} style={{fontSize: 18}}>
              {/* 1 => Checkbox */}
              <FlexView><b>What are your favorite Activities? </b></FlexView>  <br/>
              <FlexView><input  width="100" height='10' /></FlexView>  <br/>
              {/* 2 => Input text*/}
              <FlexView><b>Do you have any other favorite activities? </b></FlexView>  <br/>
              <FlexView><input  value={store.profile.other_favorite_activities} width="100" height='10' /></FlexView>  <br/>
              {/* 3 => Drop down */}
              <FlexView><input  value={store.profile.fitness_level}  width="100" height='10' /></FlexView>  <br/>
              <FlexView><b>How would you describe your current fitness level? </b></FlexView><br/>
              <FitnessLevelDropdown onChange={props.reload("fitness", fitnessLevel)} />




              <FlexView><b>Identify yo1 ur top reasons for wanting to become more active: </b></FlexView>  <br/>
              <FlexView><input width="100" height='10' /></FlexView>  <br/>
              
              <FlexView><input  placeholder="Home"  width="100" height='10' /></FlexView>  <br/>
              <FlexView><b>When do you prefer to be active? </b></FlexView>  <br/>
              <FlexView><input  placeholder="Morning"  width="100" height='10' /></FlexView>  <br/>
              <FlexView><b>What is the main reason you want to be matched with an exercise partner? </b></FlexView>  <br/>
              <FlexView><input  type="text" defaultValue={props.currentEditProfile.reason_for_match}  name="reason_for_match" width="100" height='10' onChange={(e) => (props.inputChange(e))} /></FlexView>  <br/>
              <FlexView><b>Which of the following best describes you? </b></FlexView>  <br/>
              <FlexView><input  value={store.profile.details_about_self}  width="100" height='10' /></FlexView>  <br/>
              <FlexView><b>Which of the following best describes your work situation?</b></FlexView>  <br/>
              <FlexView><input  value={store.profile.work_status}  width="100" height='10' /></FlexView>  <br/>
              <FlexView><b>Use this space for anything else you would like to share. </b></FlexView>  <br/>
              <FlexView><input  placeholder="Would love to partner with people "  width="100" height='10' /></FlexView>  <br/>
            </FlexView>
        </FlexView>
        <FlexView column basis={300} height={500}></FlexView>
        <FlexView column basis={500} width={500} style={{fontSize: 18}}>
       
         <FlexView><b>Where do you prefer to be active?</b></FlexView>  <br/>
         <ExerciseLocationDropdown />
        <FlexView><b>Which of the following best describes you?</b></FlexView>  <br/>
         <PersonalityDescriptionDropdown/>
         <FlexView><b>When do you prefer to be active?</b></FlexView>  <br/>
         <PreferredTimeDropdown/>
         <FlexView><b>Which of the following best describes your work situation?</b></FlexView>  <br/>
         <WorkStatusDropdown />
    </FlexView>
    </FlexView>
    
    
    </div>
    
    
      );
    
}
export default AboutMe;
