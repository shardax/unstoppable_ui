import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import Default from '../layouts/Default';

export default function Home() {
  return (
    <Default>
      <h3>Browse Profiles</h3>
      <BrowseProfiles />
    </Default>
  )
}
