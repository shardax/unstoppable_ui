import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import {useDataStore} from "../UserContext";
import Default from '../layouts/Default';
import SignIn2 from '../components/LogIn/SignIn2'

export default function Home() {
  const storedData = localStorage.getItem("userStore");
  const store = useDataStore();

  if (!storedData) {
    return (<SignIn2 />)
  } else {
    if (!store.isLoggedIn) {
      return (<SignIn2 />)
    } else {
      return (
        <Default>
          <BrowseProfiles />
        </Default>
      )
    }
  }