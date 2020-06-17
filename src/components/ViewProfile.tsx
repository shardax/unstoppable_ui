import React, {useState, useEffect} from "react";
import {useDataStore} from "../UserContext";
import axios from "axios";
import { PROFILEURL } from "../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const ViewProfile: React.FC = ({  }) => {

  
  
  const [profile, setProfile] = React.useState(useDataStore().profile);
  const [displayUsername, setDisplayUserName] = React.useState(useDataStore().username);
  console.log("Bhalooo");
  console.log(JSON.stringify(profile));
  //console.log(displayUsername);

  useEffect(() => {
  
  
    console.log("HOHOHA HOHOHA In view profile");
    // Temp code
    const profileId = profile.id;

    axios
    .get(PROFILEURL + `/${profileId}.json`, { withCredentials: true })
    .then(result => {
      console.log(result);
      //currentUserStore.username =  result.data.username;
     // setProfile(result.data);
    }).catch (e => {
      console.log(`😱 Axios request failed: ${e}`);
    })
  }, []);


/** 

type CardProps = {
  title: string,
  author: string,
  date: string,
  image: string,
  children: string
}

const Card = ({ title, author, date, image, children }: CardProps) => (
  <FlexView className="card">
    <FlexView shrink basis="10%">
      <img src={`${image}`} />
    </FlexView>
    <FlexView shrink basis="10%" className="description">
      <FlexView column>
        <FlexView className="title">{title}</FlexView>
        <FlexView className="subtitle">
          <FlexView className="author">{author}</FlexView>
          <FlexView className="date">{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    
  </FlexView>
);
**/

const DisplayUserName = () => {
  const store = useDataStore();
  console.log(store.username);
  return (store.username);
}


  return (
    <div>
      <FlexView basis={1000}>
        <AvatarEditor
          image="./src/sarada.jpg"
          width={175}
          height={140}
          border={30}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
        />
        <FlexView column>
         <FlexView style={{ width: 30, height: 70}}></FlexView>
          <FlexView  style={{ width: 250, height: 20 }}>
            <FlexView  style={{ width: 20, height: 10 }}></FlexView>
              <FlexView  style={{ width: 230, height: 10 }}>
                  <b>{displayUsername}</b>, {profile.age}</FlexView>
              </FlexView >
              <FlexView  style={{ width: 250, height: 30 }}>
              <FlexView  style={{ width: 20, height: 30 }}></FlexView>
              <FlexView  style={{ width: 230, height: 30 }}>
                {profile.city}, {profile.state} {profile.zipcode}
              </FlexView>
          </FlexView >
         </FlexView>
        <FlexView column basis={100}></FlexView>
        <FlexView column basis={200}>
          <FlexView  style={{ width: 20, height: 30 }}></FlexView>
          <FlexView  style={{ width: 200, height: 100 }}><h3><b>My Profile</b></h3></FlexView>
        </FlexView>
      </FlexView>
    </div>
      );
    
}
export default ViewProfile;