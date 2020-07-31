import React from 'react'
import BrowseProfiles from '../components/Browse/BrowseProfiles'
import {useDataStore} from "../UserContext";
import Default from '../layouts/Default';
import SignIn2 from '../components/LogIn/SignIn2'

export default function Home() {
  const storedData = localStorage.getItem("userStore");
  if (!storedData) {
    return (<SignIn2 />)
  } else {
    const store = useDataStore();
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
}
