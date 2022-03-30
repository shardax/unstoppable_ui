import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import {useDataStore} from "../UserContext";
import Default from '../layouts/Default';
import {Redirect} from 'react-router-dom';
import CompleteProfile from '../components/Browse/CompleteProfile' 


export default function Home() {
  const storedData = localStorage.getItem("userStore");
  const store = useDataStore();

  if (!storedData && ((store && !store.isLoggedIn))) {
    return <Redirect to="/login" />
  }
  
  if (JSON.parse(storedData).completed_profile == true) {
  return (
    <Default>
      <BrowseProfiles/>
    </Default>
  )
  } else {
    return (
      <Default>
        <CompleteProfile/>
      </Default>
    )
  }
}