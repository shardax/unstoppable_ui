import React, {useState, useEffect} from "react";
import {useDataStore} from "../UserContext";
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const ViewProfile: React.FC = ({  }) => {
  
  const [profile, setProfile] = React.useState(useDataStore().profile);
  const [displayUsername, setDisplayUserName] = React.useState(useDataStore().username);
  const store = useDataStore();
  useEffect(() => {
    axios
    .get(PROFILEURL + `/${store.profileId}.json`, { withCredentials: true })
    .then(result => {
      console.log(result);
      //currentUserStore.username =  result.data.username;
      store.profile = result.data.profile;
      store.avatarPath = result.data.photo;
      console.log(ROOTURL + store.avatarPath );
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
avatarPath: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--644ee1f6b2a9643091de027fa0e1f0d804bfe6d1/IMG_9868.JPG?disposition=attachment"

**/


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
         <FlexView style={{ width: 30, height: 70}}></FlexView>
          <FlexView  style={{ width: 250, height: 20 }}>
            <FlexView  style={{ width: 20, height: 10 }}></FlexView>
              <FlexView  style={{ width: 230, height: 10 }}>
                  <b>{store.username}</b>, {store.profile.age}</FlexView>
              </FlexView >
              <FlexView  style={{ width: 250, height: 30 }}>
              <FlexView  style={{ width: 20, height: 30 }}></FlexView>
              <FlexView  style={{ width: 230, height: 30 }}>
                {store.profile.city}, {store.profile.state} {store.profile.zipcode}
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