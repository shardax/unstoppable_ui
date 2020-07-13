import React from 'react'
import './Navigation.scss';
import { useDataStore } from "../../UserContext";


//Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { NavLink, Link } from 'react-router-dom';

const sideNavLinks = [
  {
    to: "/home",
    name: "Home",
    icon: <HomeIcon />
  },
  {
    to: "/profile",
    name: "Profile",
    icon: <AccountCircleIcon />
  },
  {
    to: "/messages",
    name: "Messages",
    icon: <MessageIcon />
  }
]

const SideNav = () => {
  const store = useDataStore()

  return (
    <div className="sidenav-wrapper">
      <div className="sidebar-title">{store.username}</div>
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

      <Link className="sidenav-link-content" to={"/logout"}><ExitToAppIcon /> <span className="sidenav-link-name">Logout</span></Link>

    </div>
  )
}

export default SideNav
