import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import Default from '../layouts/Default';
import SideNav from '../components/Navigation/SideNav'

export default function Home() {
  return (
    <Default>
      <h3>Browse Profiles</h3>
      <BrowseProfiles />
    </Default>
  )
}
