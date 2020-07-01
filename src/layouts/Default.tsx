import React from 'react'
import Navigation from '../components/Navigation/Navigation';
import SideBar from '../components/Navigation/SideBar'
import './index.scss'

const Default: React.FC = ({ children }) => {
  return (
    <div className="default-wrapper">
      <div className="default-sidenav">
        <SideBar></SideBar>
      </div>
      <div className="default-body">
        <Navigation />
        <div className="default-layout-main">
          <div className="format-children-default">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Default
