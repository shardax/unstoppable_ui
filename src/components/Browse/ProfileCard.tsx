import "./Browse.scss";

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, { useEffect, useState } from "react";

import Brightness1Icon from "@material-ui/icons/Brightness1";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";

const ProfileCard = ({ profile}) => {
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



  

    
    return useObserver(() => (
      <div className="single-profile-wrapper" key={profile.id}>
        <Link to={"/user/" + profile.id}>
          <img className="single-profile-image" src={ROOTURL + profile.photo} />
        </Link>
        <div className="single-profile-body">
          <div>
            <Link to={"/user/" + profile.id}>
              <div
                style={{
                  backgroundColor: profile.active ? "#B7FFBF" : "white",
                }}
              >
                <h5 className="profile-username profile-name-loc">
                  {profile.name} ·{" "}
                  <span className="profile-location">
                    {profile.city}, {profile.state}
                  </span>
                </h5>
              </div>
            </Link>
            <p className="other-profile-card-data">
              {profile.cancer_location} Cancer
            </p>
            <p className="other-profile-card-data">{profile.age} years old</p>
          </div>
          <div>
            {profile.active && (
              <Tooltip
                title={
                  <TimeAgo datetime={profile.last_seen_at} locale="en.US" />
                }
              >
                <Brightness1Icon
                  style={{ color: "#4DED30", fontSize: "medium" }}
                />
              </Tooltip>
            )}
            {!profile.active && (
              <Tooltip
                title={
                  <TimeAgo datetime={profile.last_seen_at} locale="en.US" />
                }
              >
                <Brightness1Icon
                  style={{ color: "#D4D4D4", fontSize: "medium" }}
                />
              </Tooltip>
            )}
            <Link to={"/userMessage" + "/" + profile.user_id}>
              <ChatIcon className="favorite-profile-icon"></ChatIcon>
            </Link>
            {store.profile.liked_profiles.includes(profile.id) ? (
              <FavoriteIcon
                onClick={() => updateLikedProfiles("unlike", profile.id)}
                className="favorite-profile-icon"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => updateLikedProfiles("like", profile.id)}
                className="favorite-profile-icon"
              />
            )}
          </div>
        </div>
      </div>
    ));
};

export default ProfileCard;
