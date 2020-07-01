import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import Default from '../layouts/Default'

export default function Home() {
  return (
    <Default>
      <h1 className="primary-text">Browse Profiles</h1>
      <BrowseProfiles />
    </Default>
  )
}
