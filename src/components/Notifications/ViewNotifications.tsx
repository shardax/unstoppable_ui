import "./ViewNotifications.scss";

import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

import { useDataStore } from "../../UserContext";
import NotificationItem from "./NotificationItem";

const ViewNotifications: React.FC = ({}) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);

  // Oldest at top
  const sortAsc = function(a, b) {
    return a.date.getTime() - b.date.getTime()
  };
  // Most recent at top
  const sortDesc = function(a, b) {
    return b.date.getTime() - a.date.getTime()
  };

  const exampleNotifications = [
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
      header:"Finish Setting Up Your Profile:",
      description:"Make more connections when your profile is completed. Click here to start!",
      date: new Date("January 6, 2022")
    },
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
      header:"Melody just sent you a message:",
      description:"Hi! I just noticed we have similar cancer diagnoses, I would love to connect with you!",
      date: new Date("October 21, 2021")
    }
  ]

  return (
    <div>
      <div className="notification-header">
        <h3>Notifications</h3>
        <h4>Sort By:</h4>
      </div>
      <div className="interactables">
        <DropdownButton id="sort-by" title="Most Recent">
          {/*<Dropdown.Item onClick={}>Oldest</Dropdown.Item>*/}
          <Dropdown.Item>Oldest</Dropdown.Item>
        </DropdownButton>

        <Button className="clear-all-btn">CLEAR ALL</Button>
      </div>

      <hr className="horizontal-line"/>

      <div className="notification-list">
        {exampleNotifications.length ? exampleNotifications.sort(sortDesc).map((notification: any) => (
          <NotificationItem notification={notification} />
        )) : <p className="no-notification-message">You have no new notifications at this time</p>}
      </div>
    </div>
  );
};
export default ViewNotifications;
