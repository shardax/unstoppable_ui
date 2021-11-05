import './Navigation.scss';

import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import { Link, NavLink } from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Avatar} from 'antd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Icons
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import UnsIcon from '../../images/2unstoppable.png'
import { useDataStore } from "../../UserContext";
import {useObserver} from 'mobx-react'

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
    name: "Favorties",
    icon: <MessageIcon />
  },
  {
    to: "/messages",
    name: "Messages",
    icon: <MessageIcon />
  },
  {
    to: "/chatrooms",
    name: "Chatrooms",
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
        <img className="logo-navbar" src={UnsIcon} alt="" />
      </div>
      <div className="username-avatar-sidenav">
        <Avatar src={ROOTURL + store.avatarPath}  size= "large" />
        <div className="sidebar-title">{store.username}</div>
      </div>
      <div className="sidebar-subtitle primary-grey-text">{store.email ? store.email : "Email not defined."}</div>

      <hr className="horizontal-break" />

      <div className="main-navlink">  
        {sideNavLinks.map((link: any) => (
          <div className="sidenav-link">
            <NavLink className="sidenav-link-content" activeClassName="sidenav-link-content-active" to={link.to}>{link.icon} <span className="sidenav-link-name">{link.name}</span></NavLink>
          </div>
        ))}
      </div>  

      <hr className="horizontal-break" />
      <div className="main-navlink">
        {optionLinks.map((link: any) => (
            <div className="sidenav-link">
              <NavLink className="sidenav-link-content" activeClassName="sidenav-link-content-active" to={link.to}>{link.icon} <span className="sidenav-link-name">{link.name}</span></NavLink>
            </div>
          ))}
        </div>
    </div>
  ))
}

export default SideNav
