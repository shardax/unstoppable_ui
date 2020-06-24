import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const PrintUserInfo: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
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
    </div>
  )
  
}
export  {PrintUserInfo};