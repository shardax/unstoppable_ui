import './index.scss';

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, { useEffect, useState } from 'react'
import { PopupboxContainer, PopupboxManager } from "react-popupbox";


import Brightness1Icon from '@material-ui/icons/Brightness1';
import Button from '../Styled/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ExploreIcon from '@material-ui/icons/Explore';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LikedProfile from '../Users/LikedProfile'
import { Link } from 'react-router-dom';
import NotesIcon from '@material-ui/icons/Notes';
import Paper from '../Styled/Paper';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import StarIcon from '@material-ui/icons/Star';
import TimeAgo from 'timeago-react';
import Tooltip from '@material-ui/core/Tooltip';
import WorkIcon from '@material-ui/icons/Work';
import axios from 'axios';
import colors from '../../assets/colors'
import { useDataStore } from "../../UserContext";

import "react-popupbox/dist/react-popupbox.css";

import { Prompt, useHistory } from "react-router-dom";

import { Avatar } from "antd";
import EditProfile from '../manageProfile/EditProfile';
import { useObserver } from "mobx-react";

const UserSection: React.FC<{ user: any, me: boolean }> = ({ user, me }) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);

  const openPopupbox = () => {
    setEditMode(true);
    // window.addEventListener("scroll", () => {window.scrollTo(0,0)});
    // window.removeEventListener("scroll", () => {window.scrollTo(0,0)});

    const content = (
      <div>
        <div>
          <h3 className="editProfile">Edit Profile</h3>
          <div>
            <Avatar src={ROOTURL + store.avatarPath} size={200} />
            <span style={{ display: "inline-block", padding: "30px" }}>
              <h4 className="userName"> {store.username}</h4>
              <h5 className="userAge">Age: {currentProfile.age}</h5>
            </span>
          </div>
        </div>

        <EditProfile editControls={{ editMode, setEditMode }} />
      </div>
    );
    PopupboxManager.open({ content });
  };

  // ProfileIconRow takes up the entire Paper row
  const ProfileIconRow = ({ icon, field, answer }) => {
    if (!answer || answer === "") {
      return null
    }

    return (
      <div className="full-profile-icon-row">
        <div className="field-question-profile">
          {icon}
          <div>{field}</div>
        </div>
        <div className="field-answer muted-text">{answer}</div>
      </div>
    )
  }

  // ProfileIconBlock takes up only half of a Paper row (so 2 blocks fit on one row)
  const ProfileIconBlock = ({ icon, field, answer }) => {
    if (!answer || answer === "") {
      return null
    }

    return (
      <div className="profile-block">
        <div className="full-profile-icon-row">
          <div className="field-question-profile">
            {icon}
            <div>{field}</div>
          </div>
          <div className="field-answer muted-text">{answer}</div>
        </div>
      </div>
    )
  }

  const ChipList = () => {
    const Chip = ({ activityId }) => {
      const getMatch = () => {
        const matched = store.activities.find(({ id }) => id === activityId)
        if (matched) return matched.name
        return null
      }

      return (
        <span className="profile-single-chip">{getMatch() ? getMatch() : null}</span>
      )
    }

    return (
      <span className="profile-chip-list">
        {user.activity_ids.map((activity: any, i: number) =>
          <Chip key={i} activityId={activity} />
        )}
      </span>
    )
  }

  return (
    <div>
      <div className="user-section-wrapper">
        <div className="user-section-data">
          
          {/* Top Card */}
          <Paper margin="2em 0em" className='top-card'>

            <div className="photo-cropper">
              <img className="user-section-image" src={ROOTURL + user.photo} />
            </div>

            <div>
              <h1>{user.name}</h1>
              <span className="full-profile-location muted-text">{user.city}, {user.state}</span>
              <div><span> {user.age} years old</span></div>
            </div>

            <div>
              <Button onClick={openPopupbox}>Edit Profile</Button>
              <PopupboxContainer />
            </div>

          </Paper>

          {/* About Me Card */}
          <Paper margin="2em 2em" style={{ float: "left", width:"40%" }} className='cancer-type-card'>
            <div className="profile-section-header">About Me</div>
            <p className="muted-text">{user.age} years old!</p>
            <ProfileIconRow field={"Personality"} answer={user.personality} icon={<EmojiPeopleIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Details"} answer={<div className="full-profile-das">
              <p>{user.details_about_self}</p>
            </div>} icon={<NotesIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Work Status"} answer={user.work_status} icon={<WorkIcon className="full-profile-icon" />} />
          </Paper>

          {/* Cancer Type Card */}
          <Paper margin="2em 2em" style={{ float: "right", width:"40%" }} className='cancer-type-card'>
            <div className="profile-section-header">Cancer Type</div>

            <p>{user.cancer_location} cancer</p>
            <ProfileIconRow field={"Treatment description"} answer={user.treatment_description} icon={null} />
            <ProfileIconRow field={"Treatment status"} answer={user.treatment_status} icon={null} />

            <ProfileIconRow field={"Part of wellness program?"} answer={user.part_of_wellness_program ? "✅" : "No"} icon={null} />

            {user.part_of_wellness_program ? <ProfileIconRow field={"Which wellness program?"} answer={user.which_wellness_program} icon={null} /> : null}
          </Paper>

          {/* Activity/Fitness Card */}
          <Paper margin="2em 0em" style={{ width:"100%" }} className='activity-fitness-type-card'>
            <div className="profile-section-header">Activity/Fitness</div>

            <ProfileIconRow field={"Reasons for Match"} answer={user.reason_for_match} icon={null} />

            <ProfileIconRow field={"Fitness Level"} answer={user.fitness_level} icon={<FitnessCenterIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Activities"} answer={<ChipList />} icon={<SportsTennisIcon className={"full-profile-icon"} />} />

            <ProfileIconRow field={"Prefered exercise location"} answer={user.preferred_excercise_location} icon={<ExploreIcon className={"full-profile-icon"} />} />

            <ProfileIconRow field={"Prefered exercise time"} answer={user.prefered_exercise_time} icon={<ScheduleIcon className={"full-profile-icon"} />} />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default UserSection
