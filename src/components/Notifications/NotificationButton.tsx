import "./NotificationButton.scss";

import React, { useEffect, useState } from "react";
import Button from "../Styled/Button";
import { Link, NavLink } from 'react-router-dom';
import NotificationIcon from '../../images/NotificationIcon.png';

export const NotificationButton = () => {

    // dummy data for notification
    const [newNotif, setNewNotif] = useState<any>({
        image: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
        header: "Finish Setting Up Your Profile",
        description: "Make more connections when your profile is completed. Click here to start!",
        date: new Date("January 6, 2022"),
        color: "#9560A8",
        read: false,
    });

    const checkCreateNotification = () => {
        if (newNotif != null) {
            return (<div className="notification-popup">
                <p className="notification-text">{newNotif.header}</p>
                <Button className="notification-action-btn"><Link to={"/complete-profile/0"} style={{ color: "#fff" }}>LETS GO</Link></Button>
                <Button className="notification-close-btn" onClick={() => closeNotification()}>X</Button>
            </div>)
        }
    };

    const closeNotification = () => {
        setNewNotif(null);
    };

    return <div className="notification-group">
        <NavLink className="notification-link" to="/notifications"><img src={NotificationIcon} className="notification-icon" />
        </NavLink>
        {checkCreateNotification()}
    </div>

}