import React, { useState, useEffect } from "react";
import { useDataStore } from "../../UserContext";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
import { ProfileStore } from '../../UserStore';

const PrintUserInfo = (profile) => {
  return (
    <div style={{fontSize: 15}}>
      <table>
        <tr>
          <td>
            <b>Username: {profile.username}</b>
          </td>
        </tr>
        <tr>
          <td>
          Age: {profile.age}
          </td>
        </tr>
        <tr>
          <td>
          City: {profile.city} State: {profile.state}
          </td>
        </tr>
        <tr>
          <td>
          ZipCode: {profile.zipcode}
          </td>
        </tr>
      </table>
    </div>
  )

}
export { PrintUserInfo };

const getActivityNames = (activity_ids, all_activities) => {
  var names: string[];
  names = [];
  activity_ids.map((activity_id) => {
    const matched_activity = all_activities.find((a) => { return a.id == activity_id;});
    if (matched_activity != null) {
      names.push(matched_activity.name);
    }
  })
  return names.join();
}
export {getActivityNames};


const getExerciseReasonNames = (exercise_reason_ids, all_exercise_reasons) => {
  var names: string[];
  names = [];
  exercise_reason_ids.map((exercise_reason_id) => {
    const matched_exercise_reason = all_exercise_reasons.find((er) => { return er.id == exercise_reason_id});
    if (matched_exercise_reason != null) {
      names.push(matched_exercise_reason.name);
    }
  })
  return names.join();
}
export {getExerciseReasonNames}
