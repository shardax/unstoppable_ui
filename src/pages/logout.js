import React, {Component, useContext} from 'react'
import SignOut from '../components/SignOut'
import { UserContext } from "../UserContext";


export default function Logout() {
//export default class Login extends Component {

  
    const {value, setValue} = useContext(UserContext);

  return (
  <div>
    <h1>{value.username} Sign Off</h1>
    <SignOut />
  </div>)
  }