import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const PrintUserInfo: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
      <FlexView basis={30} height={70}>
      </FlexView>
      <FlexView  basis={250} height={20}>
        <FlexView  basis={20} height={10}>
        </FlexView>
        <FlexView  basis={230} height={10}>
          <b>{store.username}</b>, {store.profile.age}</FlexView>
        </FlexView >
          <FlexView  basis={250} height={30}>
            <FlexView  basis={20} height={30}></FlexView>
            <FlexView  basis={230} height={30}>
              {store.profile.city}, {store.profile.state} {store.profile.zipcode}
          </FlexView>
      </FlexView >
    </div>
  )
  
}
export  {PrintUserInfo};


const DisplayFitness: React.FC = ({  }) => {
  const store = useDataStore();
  return (
    <div>
       <FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40}>
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
        <FlexView basis={300} height={40}>
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
        <FlexView basis={300} height={40}>
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
        <FlexView basis={300} height={40}>
          <b> {store.profile.treatment_status}</b></FlexView>
          <FlexView  basis={300} height={85}>
           </FlexView>
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
        <FlexView basis={300} height={40}>
          <b> {store.profile.personality}</b></FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>
    </div>
  )
}
export  {DisplayPersonality};