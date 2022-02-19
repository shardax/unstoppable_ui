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
import LocationIcon from "@material-ui/icons/LocationOn";
import AgeIcon from "@material-ui/icons/DataUsageTwoTone";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BorderColorIcon from '@material-ui/icons/BorderColorTwoTone';
// import LoginIcon from '@mui/icon/LoginIcon';
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
          {icon} <span>{field}</span> &nbsp; : &nbsp; <span className="field-answer muted-text">{answer}</span>
        </div>
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

            <div className="primary-info" style={{ width:"60%" }}>
              <div className="profile-section-header-primary">{user.name}</div>
              <div><LocationIcon className="profile-icon"></LocationIcon>{user.city}, {user.state}</div>
              <div><AgeIcon className="profile-icon"></AgeIcon><span> {user.age} years old</span></div>
              <div><AgeIcon className="profile-icon"></AgeIcon><span> Last login <TimeAgo datetime={user.last_seen_at} locale='en.US'/> </span></div> 
              {/* <div><AgeIcon className="profile-icon"></AgeIcon><span> Profile Created <TimeAgo datetime={user.last_seen_at} locale='en.US'/> </span></div> */}
            </div>  

            <div className="edit-button" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button onClick={openPopupbox} style={{textTransform: "uppercase"}} > <BorderColorIcon></BorderColorIcon> &nbsp; Edit Profile</Button>
              <PopupboxContainer />
            </div>

          </Paper>

          {/* About Me Card */}
          <Paper margin="2em 2em" style={{ float: "left", width:"40%" }} className='cancer-type-card'>
            <div className="profile-section-header">About Me</div>
            {/* <p className="muted-text">{user.age} years old</p> */}
            <ProfileIconRow field={"Age"} answer={user.age} icon={<BorderColorIcon className="full-profile-icon" />} />
            <ProfileIconRow field={"Personality"} answer={user.personality} icon={<EmojiPeopleIcon className="full-profile-icon" />} />
            <ProfileIconRow field={"Work Status"} answer={user.work_status} icon={<WorkIcon className="full-profile-icon" />} />
            <ProfileIconRow field={"Details"} answer={<p>{user.details_about_self}</p>} icon={<NotesIcon className="full-profile-icon" />} />
          </Paper>

          {/* Cancer Type Card */}
          <Paper margin="2em 2em" style={{ float: "right", width:"40%" }} className='cancer-type-card'>
            <div className="profile-section-header">Cancer Type</div>

            <ProfileIconRow field={"Cancer"} answer={user.cancer_location} icon={null} />
            <ProfileIconRow field={"Treatment Description"} answer={user.treatment_description} icon={null} />
            <ProfileIconRow field={"Treatment Status"} answer={user.treatment_status} icon={<LocalHospitalIcon className="full-profile-icon"/>} />
            <ProfileIconRow field={"Part of Wellness Program?"} answer={user.part_of_wellness_program ? "✅" : "No"} icon={<FavoriteIcon/>} />
            {user.part_of_wellness_program ? <ProfileIconRow field={"Which Wellness Program?"} answer={user.which_wellness_program} icon={<FavoriteIcon/>} /> : null}
            {user.part_of_wellness_program ? <ProfileIconRow field={"Profile Created"} answer={user.which_wellness_program} icon={null} /> : null}
            {user.part_of_wellness_program ? <ProfileIconRow field={"Last Login"} answer={user.which_wellness_program} icon={null} /> : null}
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
