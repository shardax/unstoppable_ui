import React from 'react'
import './Navigation.scss';
import { useDataStore } from "../../UserContext";
import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import { Avatar } from 'antd';
import UnsIcon from '../../images/2unstoppable.png'
import { useObserver } from 'mobx-react'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';


import { NavLink, Link } from 'react-router-dom';

const sideNavLinks = [
  {
    to: "/home",
    name: "Home",
    icon: <HomeIcon />
  },
  {
    to: "/profile",
    name: "My Profile",
    icon: <AccountCircleIcon />
  },
  {
    to: "/messages",
    name: "Messages",
    icon: <MessageIcon />
  }
]

const optionLinks = [
  {
    to: "/settings",
    name: "Settings",
    icon: <SettingsIcon />
  },
  {
    to: "/logout",
    name: "Logout",
    icon: <ExitToAppIcon />
  }
]

const SideNav = () => {
  const store = useDataStore()

  return useObserver(() => (
    <div className="sidenav-wrapper">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img className="logo-navbar" src={UnsIcon} alt="" />
      </div>
      <div className="username-avatar-sidenav">
        <Avatar src={ROOTURL + store.avatarPath} size="large" />
        
        <DropdownButton id="dropdown-basic-button" title={store.username}>
          <Dropdown.Item href="/profile">Edit Profile</Dropdown.Item>
          <Dropdown.Item href="/settings">Account Settings</Dropdown.Item>
          <Dropdown.Item href="/logout">Log Out</Dropdown.Item>
        </DropdownButton>

      </div>

      <hr className="horizontal-break" />

      <div className="main-navlink">
        {sideNavLinks.map((link: any) => (
          <div className="sidenav-link">
            <NavLink className="sidenav-link-content" activeClassName="sidenav-link-content-active" to={link.to}>{link.icon} <span className="sidenav-link-name">{link.name}</span></NavLink>
          </div>
        ))}
      </div>
    </div>
  ))
}

export default SideNav
