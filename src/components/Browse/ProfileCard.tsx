import "./Browse.scss";

import {
  AGE_RANGE_CONSTANT,
  CANCERLOCATIONLIST,
  DISTANCE_WITHIN_CONSTANT,
} from "../../constants/ProfileConstants";
import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";

// accordian imports
import Accordion from "@material-ui/core/Accordion";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import {AdvancedSearch} from "./AdvancedSearch"
import AgeIcon from "@material-ui/icons/DataUsage";
import { BiSortAlt2 } from "react-icons/bi";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Button from "../Styled/Button";
// chat imports
import ChatIcon from "@material-ui/icons/Chat";
import { Link, NavLink } from 'react-router-dom';
import LocationIcon from "@material-ui/icons/LocationOn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {MenuPopupState} from "./SortByMenu";
// import NotificationIcon from '../../images/NotificationIcon.png';
import Pagination from "react-js-pagination";
import Radio from "@material-ui/core/Radio";
import RangeSlider from "../Common/RangeSlider";
import { SearchParamsStore } from "../../UserStore";
import Select from "../Styled/Select";
import SortBarDisplay from "./SortBarDisplay";
import SortIcon from "@material-ui/icons/Sort";
import TimeAgo from "timeago-react";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "antd";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";
import { NotificationButton } from "../Notifications/NotificationButton";

export const ProfileCardView = ({ profile}) => {
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

  const ProfileCard = ({ profile }) =>
    useObserver(() => (
      <div className="single-profile-wrapper " key={profile.id}>
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
                {getCancerCard({ profile })}

                <h5 className="profile-username profile-name-loc">
                 <b> {profile.name}{" "} </b>
                </h5>
              </div>
            </Link>

            <div className="profile-location" style={{marginBottom: "10px"}}>
              <LocationIcon className="location-icon"></LocationIcon>
              <span className="profile-card-detail"> {profile.city}, {profile.state} </span>
            </div>
            <div className="other-profile-card-data">
              <AgeIcon className="profile-icon"></AgeIcon>
              <span className="profile-card-detail"> {profile.age} years old </span>
            </div>

            <Link to={"/userMessage" + "/" + profile.user_id}>
              <p className="other-profile-message-data">
                {" "}
                <ChatIcon className="message-icon"></ChatIcon> 
                Message 
              </p>
            </Link>
          </div>
          <div>
            <p>last login <TimeAgo datetime={profile.last_seen_at} locale="en.US" /> </p>
          </div>
          {/* <div>
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
           
          {/* </div> */}
        </div>
      </div>
    ));

    const getCancerCard = ({ profile }) => {
      if (profile.cancer_location == "Other/Rare Cancer") {
        return (
          <p className="cancer-type-card  other-cancer-type-card">
            {" "}
            {profile.cancer_location}{" "}
          </p>
        );
      } else if (profile.cancer_location == "Brain") {
        return (
          <p className="cancer-type-card brain-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Breast") {
        return (
          <p className="cancer-type-card breast-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Bladder") {
        return (
          <p className="cancer-type-card bladder-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Bone") {
        return (
          <p className="cancer-type-card bone-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Thyroid") {
        return (
          <p className="cancer-type-card thyroid-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Cervical") {
        return (
          <p className="cervical-cancer-type-card cervical-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Colorectal") {
        return (
          <p className="cancer-type-card colorectal-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Esophageal") {
        return (
          <p className="cancer-type-card esophageal-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Gall Bladder") {
        return (
          <p className="cancer-type-card gall-bladder-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Gastric") {
        return (
          <p className="cancer-type-card gastric-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Head and Neck") {
        return (
          <p className="cancer-type-card head-and-neck-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Kidney") {
        return (
          <p className="cancer-type-card kidney-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Leukemia") {
        return (
          <p className="cancer-type-card leukemia-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Liver") {
        return (
          <p className="cancer-type-card liver-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Lung") {
        return (
          <p className="cancer-type-card lung-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Melanoma") {
        return (
          <p className="cancer-type-card melanoma-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Multiple Myeloma") {
        return (
          <p className="cancer-type-card multiple-myeloma-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Ovarian") {
        return (
          <p className="cancer-type-card ovarian-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Pancreatic") {
        return (
          <p className="cancer-type-card pancreatic-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else if (profile.cancer_location == "Sarcoma") {
        return (
          <p className="cancer-type-card sarcoma-cancer-type-card">
            {profile.cancer_location} Cancer
          </p>
        );
      } else {
        return (
          <p className="cancer-type-card"> {profile.cancer_location} Cancer</p>
        );
      }
    };



  

    
    return <ProfileCard profile={profile}/>
};


