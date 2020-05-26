import React, {Component, useContext} from 'react'
import SignOut from '../components/SignOut'
import { UserContext } from "../UserContext";


export default function Logout() {
  return (
  <div>
    <SignOut />
  </div>)
  }