import "./ViewNotifications.scss";

import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useDataStore } from "../../UserContext";
import NotificationItem from "./NotificationItem";

const ViewNotifications: React.FC = ({}) => {
  const store = useDataStore();
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);

  const exampleNotifications = [
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
      header:"Finish Setting Up Your Profile:",
      description:"Make more connections when your profile is completed. Click here to start!"
    },
    {
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
      header:"Melody just sent you a message:",
      description:"Hi! I just noticed we have similar cancer diagnoses, I would love to connect with you!"
    }
  ]

  return (
    <div>
      <div className="notification-header">
        <h3>Notifications</h3>
      </div>

      <div className="notification-list">
        {exampleNotifications.map((notification: any) => (
          <NotificationItem notification={notification} />
        ))}
      </div>
    </div>
  );
};
export default ViewNotifications;
