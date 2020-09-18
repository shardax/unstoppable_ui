import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import {useDataStore} from "../UserContext";
import Default from '../layouts/Default';
import {Redirect} from 'react-router-dom'

export default function Home() {
  const storedData = localStorage.getItem("userStore");
  const store = useDataStore();

  if (!storedData && ((store && !store.isLoggedIn))) {
    return <Redirect to="/login" />
  }

  if (!store.user_confirmed) {
    return <Redirect to="/wizard/0" />
  }
  
  return (
    <Default>
      <BrowseProfiles />
    </Default>
  )
}