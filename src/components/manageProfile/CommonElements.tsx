import React, { useState, useEffect } from "react";
import { useDataStore } from "../../UserContext";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';


const PrintUserInfo: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 15}}>
      {/*<FlexView column>
      <FlexView hAlignContent='center' style={{fontSize: 17}}>
        <b>Username: {store.username}</b>, Age: {store.profile.age}
      </FlexView>
      <FlexView hAlignContent='center' style={{fontSize: 17}}>
        City: {store.profile.city} State: {store.profile.state} ZipCode: {store.profile.zipcode}
      </FlexView>
    </FlexView> */}
      <table>
        <tr>
          <td>
            <b>Username: {store.username}</b>
          </td>
        </tr>
        <tr>
          <td>
          Age: {store.profile.age}
          </td>
        </tr>
        <tr>
          <td>
          City: {store.profile.city} State: {store.profile.state}
          </td>
        </tr>
        <tr>
          <td>
          ZipCode: {store.profile.zipcode}
          </td>
        </tr>
      </table>
    </div>
  )

}
export { PrintUserInfo };


const DisplayFitness: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 17}}>
      {/*<FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 17}}>
          {store.profile.fitness_level}
        </FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>*/}
      {store.profile.fitness_level}
    </div>
  )
}
export { DisplayFitness };

const DisplayCancerLocation: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 17}}>
      {/*<FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 17}}>
          {store.profile.cancer_location}</FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView> */}
      {store.profile.cancer_location}
    </div>
  )
}
export { DisplayCancerLocation };

const DisplayPartnerReason: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 17}}>
      {/*<FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 17}}>
          {store.profile.reason_for_match}</FlexView>
          <FlexView  basis={300} height={40}>
           </FlexView>*/}
      {store.profile.reason_for_match}
    </div>
  )
}
export { DisplayPartnerReason };

const DisplayTreatmentStatus: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 17}}>

      {/*<FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 17}}>
        {store.profile.treatment_status} 
        </FlexView>
  <FlexView  basis={300} height={85}></FlexView>*/}
      {store.profile.treatment_status}
    </div>
  )
}
export { DisplayTreatmentStatus };

const DisplayPersonality: React.FC = ({ }) => {
  const store = useDataStore();
  return (
    <div style={{fontSize: 17}}>
      {/*<FlexView column basis={1000}> </FlexView>
       <FlexView  basis={300} height={10}> </FlexView>
        <FlexView basis={300} height={40} style={{fontSize: 17}}>
          {store.profile.personality}</FlexView>
          <FlexView  basis={300} height={40}>
  </FlexView>*/}
      {store.profile.personality}
    </div>
  )
}
export { DisplayPersonality };