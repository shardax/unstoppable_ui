import "./NotificationItem.scss";

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, { useEffect, useState } from "react";

import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";
import { Avatar } from "antd";

const NotificationItem = ({ notification }) => {
  const store = useDataStore();

  const NotificationItem = ({ notification }) => useObserver(() => (
    <div className="notification-item">
      <Avatar src={ROOTURL + notification.image} size={40} />
      <div className="notification-text">
        <h6 className="notification-header">
          {notification.header}
        </h6>
        <p className="notification-description">
          {notification.description}
        </p>
      </div>
    </div>
  ))

  return <NotificationItem notification={notification} />
};

export default NotificationItem;
