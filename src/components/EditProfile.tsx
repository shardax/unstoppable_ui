import React, {useState, useEffect} from "react";
import {useDataStore} from "../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import {PrintUserInfo} from "./CommonElements";


const EditProfile: React.FC = ({  }) => {
  const store = useDataStore();
  const history = useHistory();

  const handleBackToView = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = false;
    history.push("/profile");
  }
  return (
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
          <FlexView>
           <b>What are your favorite Activities?</b>
          </FlexView>
        <FlexView column basis={100}></FlexView>
        <FlexView column basis={200}>
          <FlexView  style={{ width: 20, height: 30 }}></FlexView>
          <FlexView  style={{ width: 200, height: 100 }}><h3><b>Edit Profile</b></h3></FlexView>
        </FlexView>
        <FlexView column basis={200}>
          <button onClick={handleBackToView}>
            Edit Profile
          </button>
        </FlexView>
      </FlexView>
      
    </div>
      );
    
}
export default EditProfile;
  