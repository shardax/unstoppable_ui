import React from 'react'
import {NavLink} from 'react-router-dom';

import People from '../../assets/images/2unstoppable-people.png'
import SearchIcon from '@material-ui/icons/Search';
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
const pageLinks = [
  {
    to: '/home',
    label: 'Browse',
    icon: <SearchIcon />
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: <ForumIcon />
  },
  {
    to: '/profile',
    label: 'My Profile',
    icon: <PersonIcon />
  },
]


const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="logo-sidenav-wrapper">
        <img src={People} className="logo-sidenav" />
      </div>
      <div>
        <h4 className="Unstoppable">2Unstoppable</h4>
      </div>
      <div className="all-links-wrapper">
        {pageLinks.map((page: any) => (
          <NavLink className="navlink-wrapper" activeClassName="navlink-active" to={page.to}>
            {page.icon}
            <span className="navlink-label">{page.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
