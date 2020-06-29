import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const PrintUserInfo: React.FC = ({  }) => {
  const store = useDataStore();
  return (

        <FlexView column>
          <FlexView hAlignContent='center'>
            <b>Username: {store.username}</b>, Age: {store.profile.age}
          </FlexView>
          <FlexView hAlignContent='center'>
          City: {store.profile.city} State: {store.profile.state} ZipCode: {store.profile.zipcode}
          </FlexView>
        </FlexView>

  )
  
}
export  {PrintUserInfo};


const DisplayFitness: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 15}}>
          <b> {store.profile.fitness_level}</b></FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>
    </div>
  )
}
export  {DisplayFitness};

const DisplayCancerLocation: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 15}}>
          <b> {store.profile.cancer_location}</b></FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>
    </div>
  )
}
export  {DisplayCancerLocation};

const DisplayPartnerReason: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 15}}>
          <b> {store.profile.reason_for_match}</b></FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>
    </div>
  )
}
export  {DisplayPartnerReason};

const DisplayTreatmentStatus: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 15}}>
        <b> {store.profile.treatment_status} </b>
        </FlexView>
        <FlexView  basis={300} height={85}></FlexView>
    </div>
  )
}
export  {DisplayTreatmentStatus};

const DisplayPersonality: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 15}}>
          <b> {store.profile.personality}</b></FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>
    </div>
  )
}
export  {DisplayPersonality};