import React, {Component, useContext} from 'react'
import SignIn from '../components/SignIn'
import { UserContext } from "../UserContext";


export default function Login() {
//export default class Login extends Component {

  
    const {value, setValue} = useContext(UserContext);

  return (
  <div>
    <h1>Login  {value.username}</h1>
    <SignIn />
  </div>)
  }
