import "./ViewNotifications.scss";

import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

import { useDataStore } from "../../UserContext";
import NotificationItem from "./NotificationItem";
import { NotificationButton } from "./NotificationButton";

const ViewNotifications: React.FC = ({}) => {
  const store = useDataStore();
  const [notificationList, setNotificationList] = useState([
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fc4ad9f3cb2ddcfdd81c5a4c825e6461e1075975/stock4.png",
      header:"Finish Setting Up Your Profile:",
      description:"Make more connections when your profile is completed. Click here to start!",
      date: new Date("January 6, 2022"),
      color: "#9560A8",
      read: false,
    },
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fc4ad9f3cb2ddcfdd81c5a4c825e6461e1075975/stock4.png",
      header:"Melody just sent you a message:",
      description:"Hi! I just noticed we have similar cancer diagnoses, I would love to connect with you!",
      date: new Date("October 21, 2021"),
      color: "#F1658C",
      read: true,
    }
  ]);
  const sortModes = [
    "Most Recent",
    "Oldest",
  ]
  const [sortMode, setSortMode] = useState(sortModes[0]);

  // Oldest at top
  const sortAsc = function(a, b) {
    return a.date.getTime() - b.date.getTime()
  };
  // Most recent at top
  const sortDesc = function(a, b) {
    return b.date.getTime() - a.date.getTime()
  };

  // Maps a sortMode to a sortFunc
  const getSortFunc = function(mode) {
    switch (mode) {
      case sortModes[0]:
        return sortDesc;
      case sortModes[1]:
        return sortAsc;
    }
  }
  const [sortFunc, setSortFunc] = useState(() => getSortFunc(sortMode))

  // When the user clicks a dropdown item: re-sorts the notification list based on chosen item
  const dropdownOnClick = function(mode) {
    setSortMode(mode);
    setSortFunc(() => getSortFunc(mode));
  };

  const clearNotifications = function() {
    setNotificationList([]);
  };

  return (
    <div>
      <div className="notification-btn-holder">
        <NotificationButton />
      </div>
      
      <div className="notification-header">
        <h3>Notifications</h3>
        <h4>Sort By:</h4>
      </div>
      <div className="interactables">
        <DropdownButton id="sort-by" title={sortMode}>
          {sortModes.map((mode) => {
            if (mode != sortMode) {
              return <Dropdown.Item onClick={() => dropdownOnClick(mode)}>{mode}</Dropdown.Item>
            }
          })}
        </DropdownButton>

        {notificationList.length ? <Button className="clear-btn" onClick={()=>clearNotifications()}>CLEAR ALL</Button> :
        <Button className="clear-btn" disabled>CLEARED</Button>}
      </div>

      <hr className="horizontal-line"/>

      <div className="notification-list">
        {notificationList.length ? notificationList.sort(sortFunc).map((notification: any) => (
          <NotificationItem notification={notification} />
        )) : <p className="no-notification-message">You have no new notifications at this time</p>}
      </div>
    </div>
  );
};
export default ViewNotifications;