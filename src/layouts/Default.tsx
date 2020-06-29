import React from 'react'
import Navigation from '../components/Navigation/Navigation';
import './index.scss'

const Default: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="default-layout-main">
        {children}
      </div>
    </>
  )
}

export default Default
