import React from 'react'
import Navigation from '../components/Navigation/Navigation';
import './index.scss'
import SideNav from '../components/Navigation/SideNav';
import TopNav from '../components/Navigation/TopNav';

const Default: React.FC = ({ children }) => {
  return (
    <>
      <div className="default-main-view">
        <div className="sidenav-position">
          <SideNav></SideNav>
        </div>
        <div className="default-layout-main">
          <div>
            <TopNav />
          </div>
          <div className="format-children-default">
          {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Default
