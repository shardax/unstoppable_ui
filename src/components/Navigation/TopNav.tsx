import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './Navigation.scss'

const TopNav = () => {
  return (
    <div className="topnav-wrapper">
      <MenuIcon className="hamburger-top" />
      <span className="unstoppable-title-topnav">2Unstoppable</span>
    </div>
  )
}

export default TopNav
