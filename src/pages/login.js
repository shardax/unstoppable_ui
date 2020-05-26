import React, {Component, useContext} from 'react'
import SignIn from '../components/SignIn'
import { UserContext } from "../UserContext";


export default function Login() {
  return (
  <div>
    <h1>Login</h1>
    <SignIn />
  </div>)
  }
