import './Navigation.scss';

import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import { Link, NavLink } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Avatar} from 'antd';
import { BsHeartFill } from "react-icons/bs";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import UnsIcon from '../../images/2Unstoppable_logo.png';
import { useDataStore } from "../../UserContext";
import {useObserver} from 'mobx-react';

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
    to: "/favorites",
    name: "Favorites",
    icon: <BsHeartFill size={18} />
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
      <div style={{ display: "flex", justifyContent: "center"}}>
        <Link to="/home"><img className="logo-navbar" src={UnsIcon} alt=""/></Link>
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

      <div className="bottomLinks">
        <div className="ULWrapper">
          <ul className="noBulletUnorderedList">
            <li><a href="https://2unstoppable.org/Terms-of-use/">Terms of Use</a></li>
            <li><a href="https://2unstoppable.org/privacy-policy/">Privacy</a></li>
            <li><a href="https://2unstoppable.org/Disclaimer/">Disclaimer</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>

        <hr className="bottomLinkDivider"></hr>
        <p color="white" className="bottomWhiteLinks">Registered 501(c)(3)</p>
        <p color="white" className="bottomWhiteLinks">© 2021 2Unstoppable - All Rights Reserved.</p>

      </div>
    </div>
  ))
}

export default SideNav
