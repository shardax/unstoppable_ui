import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo} from "./CommonElements";
import AboutMe from './AboutMe';
import CancerHistory from './CancerHistory'
import Default from '../../layouts/Default'
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS} from "../../constants/ProfileConstants"

const EditProfile: React.FC = ({  }) => {
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

  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
 
      try {
        if (inputSubmitted) {
          let url = PROFILEURL + "/"  + store.profile.id + ".json" ;
          console.log("url");
          console.log(url);
          const result = await axios.patch(url, { profile: store.profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} );
          console.log("In Edit Profile");
          console.log(JSON.stringify(result));
          console.log(result.data.username);
          
          store.profile.age=18;
        }
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        if (error.message.includes("401")) {
          setErrorMessage("Invalid Username or Password.");
        } else {
          setErrorMessage(error.message);
        }
        setIsError(true);
      }
     
    };
    fetchData();

  }, [inputSubmitted]);

  
  return (
    <Default>
    <div>
      
   <FlexView basis={1000}>
        <AvatarEditor
          image={ROOTURL + store.avatarPath}
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
        />
        <FlexView column>
          <PrintUserInfo/>
        </FlexView>
        <FlexView column basis={20}></FlexView>
        <FlexView hAlignContent='center'>
            <FlexView column basis={500} width={500} style={{fontSize: 18}}>
            <AboutMe/>
            </FlexView>
        </FlexView>
        <FlexView column basis={100}></FlexView>
        <FlexView column basis={200}>
          <FlexView  style={{ width: 20, height: 30 }}></FlexView>
          <FlexView  style={{ width: 200, height: 100 }}><h3><b>Edit Profile</b></h3></FlexView>
        </FlexView>
        <FlexView column basis={200}>
          <button onClick={handleBackToView}>
            Save
          </button>
        </FlexView>
        
        
    </FlexView>
    
  
    </div>
    </Default>
    
      );
    
}
export default EditProfile;
  