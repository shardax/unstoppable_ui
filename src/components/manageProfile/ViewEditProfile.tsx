import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"


const ViewEditProfile: React.FC = ({  }) => {
  const store = useDataStore();
  useEffect(() => {
    axios
    .get(PROFILEURL + `/${store.profileId}.json`, { withCredentials: true })
    .then(result => {
      console.log(result);
      //currentUserStore.username =  result.data.username;
      store.profile = result.data.profile;
      store.avatarPath = result.data.profile.photo;
      console.log(ROOTURL + store.avatarPath );
    }).catch (e => {
      console.log(`😱 Axios request failed: ${e}`);
    })
  }, []);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    store.editMode = true;
  }

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

  if (store.editMode) {
    return <EditProfile />
  } else {
    return <ViewProfile />
  }
}
export default ViewEditProfile;