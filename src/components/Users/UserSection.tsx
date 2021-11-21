import './index.scss';

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, { useEffect, useState } from 'react'

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

const UserSection: React.FC<{ user: any, me: boolean }> = ({ user, me }) => {
  const store = useDataStore()

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
          <h1 style={{ fontSize: "26px" }}>{user.name}  · <span className="full-profile-location muted-text">{user.city}, {user.state}</span>
          </h1>
          <div
            style={{
              backgroundColor: user.active ? '#4DED30' : 'white'
            }}
          >
            <p style={{ fontSize: "20px" }}>
              <span> Last login at:&nbsp;&nbsp;
                <TimeAgo
                  datetime={user.last_seen_at}
                  locale='en.US'
                />
              </span>
            </p>
          </div>


            {/* <ProfileIconRow field={"Avatar Image"} answer={
              <div className="photo-cropper">
                <img className="user-section-image" src={ROOTURL + user.photo} />
              </div>
            } icon={null} />

            <ProfileIconBlock field={"User Name"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={user.name} readOnly />
              </div>
            } icon={null} />

            <ProfileIconBlock field={"Email Address"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={user.email} readOnly />
              </div>
            } icon={null} /> */}











          <Paper margin="2em 0em">
            <div className="profile-section-header">About me 😀</div>
            <p className="muted-text">{user.age} years old!</p>
            <ProfileIconRow field={"Personality"} answer={user.personality} icon={<EmojiPeopleIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Details"} answer={<div className="full-profile-das">
              <p>{user.details_about_self}</p>
            </div>} icon={<NotesIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Work Status"} answer={user.work_status} icon={<WorkIcon className="full-profile-icon" />} />
          </Paper>

          <Paper margin="2em 0em">
            <div className="profile-section-header">Details about Diagnosis</div>

            <p>{user.cancer_location} cancer</p>
            <ProfileIconRow field={"Treatment description"} answer={user.treatment_description} icon={null} />
            <ProfileIconRow field={"Treatment status"} answer={user.treatment_status} icon={null} />

            <ProfileIconRow field={"Part of wellness program?"} answer={user.part_of_wellness_program ? "✅" : "No"} icon={null} />

            {user.part_of_wellness_program ? <ProfileIconRow field={"Which wellness program?"} answer={user.which_wellness_program} icon={null} /> : null}
          </Paper>

          <Paper margin="2em 0em">
            <div className="profile-section-header">Activity/Fitness</div>

            <ProfileIconRow field={"Reasons for Match"} answer={user.reason_for_match} icon={null} />

            <ProfileIconRow field={"Fitness Level"} answer={user.fitness_level} icon={<FitnessCenterIcon className="full-profile-icon" />} />

            <ProfileIconRow field={"Activities"} answer={<ChipList />} icon={<SportsTennisIcon className={"full-profile-icon"} />} />

            <ProfileIconRow field={"Prefered exercise location"} answer={user.preferred_excercise_location} icon={<ExploreIcon className={"full-profile-icon"} />} />

            <ProfileIconRow field={"Prefered exercise time"} answer={user.prefered_exercise_time} icon={<ScheduleIcon className={"full-profile-icon"} />} />
          </Paper>
        </div>
        <div className="user-metadata">
          <img className="user-section-image" src={ROOTURL + user.photo} />
          {me ? null : (
            <div style={{ display: "flex" }}>
              <Link style={{ textDecoration: "underline" }} to="/messages">
                <Button margin="0em 0.3em 0em 0em" padding="4px 12px" fontSize="14px" borderRadius="20px" >Message {user.name}</Button>
              </Link>
              <Button margin="0em 0em" background="white" padding="4px 12px" fontSize="14px" borderRadius="20px" color={colors.primary} border={"1px solid" + colors.primary}>Save as Favorite</Button>
            </div>
          )}
          {me ? (
            <div>
              <h6>Liked Profiles</h6>
              {store.profile.liked_profiles.map((id: number) => (
                <LikedProfile id={id} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UserSection
