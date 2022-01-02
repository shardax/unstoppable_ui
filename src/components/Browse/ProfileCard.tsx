import "./Browse.scss";

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, { useEffect, useState } from "react";

import AgeIcon from '@material-ui/icons/DataUsage';
import Button from '../Styled/Button';
import ChatIcon from "@material-ui/icons/Chat";
import Checkbox from '@material-ui/core/Checkbox';
import DiscreteSlider from "../Common/DiscreteSlider";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Link } from "react-router-dom";
import LocationIcon from '@material-ui/icons/LocationOn';
import TimeAgo from "timeago-react";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";

const ProfileCardView = ({ profile}) => {
  const store = useDataStore();


  const updateLikedProfiles = async (type: 'like' | 'unlike', id: number) => {
    try {
      let url = PROFILEURL + "/" + store.profile.id + ".json" ;
      if (type ==="like") {
        store.likeProfile(id)
      } else if (type==="unlike") {
        store.unlikeProfile(id)
      }
      const result = await axios.patch(url, { profile: store.profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} )
    } catch (e) {
      console.log(e)
    }
  }

  const ProfileCard = ({profile}) => useObserver(() => (
    <div className="single-profile-wrapper" key={profile.id}>
      <Link to={"/user/" + profile.id}>
        <img className="single-profile-image" src={ROOTURL + profile.photo} />
      </Link>
      <div className="single-profile-body">
        <div>
          <Link to={"/user/" + profile.id}>
            <div
              style={{
                  backgroundColor: profile.active ? '#B7FFBF' : 'white'
              }}
              >
                  
                  {profile.cancer_location == "Other/Rare Cancer" ? <p className="other-cancer-type-card"> {profile.cancer_location} </p> : 
                  profile.cancer_location == "Brain" ? <p className="brain-cancer-type-card"> {profile.cancer_location} Cancer</p> : <p className="cancer-type-card"> {profile.cancer_location} Cancer</p> }
                  <h5 className="profile-username profile-name-loc">{profile.name} </h5>
                  
              </div>
          </Link>
          
          <span className="profile-location"><LocationIcon className="profile-icon"></LocationIcon>{profile.city}, {profile.state}</span>
          <p className="other-profile-card-data"><AgeIcon className="profile-icon"></AgeIcon>{profile.age} years old</p>
  
          <Link to={"/userMessage" + "/" + profile.user_id}>
              
              <p className="other-profile-message-data"> <ChatIcon className="message-icon"></ChatIcon> Message</p>
          
          </Link>
          
        </div>
        <div>
          <p className="lastLoginTime">Last login <TimeAgo
                  datetime={profile.last_seen_at}
                  locale='en.US'
                /></p>
  
      {/*
        {profile.active && <Tooltip title={<TimeAgo
                  datetime={profile.last_seen_at}
                  locale='en.US'
                />}>
          <Brightness1Icon  style={{ color: "#4DED30", fontSize: "medium"}}/>
        </Tooltip >}
        {!profile.active && <Tooltip title={<TimeAgo
                  datetime={profile.last_seen_at}
                  locale='en.US'
                />}>
          <Brightness1Icon  style={{ color: "#D4D4D4", fontSize: "medium"}}/>
        </Tooltip >}
        
       {store.profile.liked_profiles.includes(profile.id)  ? <FavoriteIcon onClick={() => updateLikedProfiles("unlike", profile.id)} className="favorite-profile-icon" /> : <FavoriteBorderIcon onClick={() => updateLikedProfiles("like", profile.id)} className="favorite-profile-icon" />} */}
        </div>
      </div>
    </div>
  ))



  

    
    return <ProfileCard profile={profile}/>
};

export default ProfileCardView;
