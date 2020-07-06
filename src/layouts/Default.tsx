import React from 'react'
import Navigation from '../components/Navigation/Navigation';
import './index.scss'
import SideNav from '../components/Navigation/SideNav';

const Default: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="default-main-view">
        <SideNav></SideNav>
        <div className="default-layout-main">
          <div className="format-children-default">
          {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Default
