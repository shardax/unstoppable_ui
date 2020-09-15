import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { REGISTERURL, PROFILEURL} from "../../../constants/matcher";
import {STEP_CONFIRMED_EMAIL} from "../../../constants/ProfileConstants";
import Button from '../../Styled/Button';
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const VerifyStep = () => {
  const store = useDataStore();
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const history = createBrowserHistory({ forceRefresh: true });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationToken, setConfirmationToken] = useState("");
  const [confirmationTokenMatch, setConfirmationTokenMatch] = useState(false);
   
  const handleResendConfirmationLink = async e => {
    e.preventDefault();
    setInputSubmitted(true);
  }

  const handleCheckConfirmationToken = async e => {
    e.preventDefault();
    if (confirmationToken == store.confirm_token) {
      console.log("GOOD MATCH!");
      setConfirmationTokenMatch(true);
      console.log(confirmationTokenMatch);
    } else {
      console.log("BAD MATCH!");
      setErrorMessage("The token didnot match. Please reenter token");
      // Set error messsage that should be displayed
    }
  }

  const handleRefresh = (event: any) => {
    event.preventDefault();
    setConfirmationToken("");
    setInputSubmitted(false);
    setErrorMessage("");
    setIsError(false);
  }
  // When the user entered confirmation token matches the token on the server, the step_status of the profile on the server
  // is updated to "Email Confirmed"
  useEffect(() => {
    const fetchData = async () => {
      if (confirmationTokenMatch) {
        try {
            let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";
            let profile = store.profile;
            profile.step_status = STEP_CONFIRMED_EMAIL;
            const res = await axios.patch(url, 
              { profile: profile },
              { withCredentials: true,
                  headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}}
              )
            console.log(JSON.stringify(res));
            store.profile.step_status = STEP_CONFIRMED_EMAIL;
            store.user_confirmed = true;
            localStorage.setItem("userStore", JSON.stringify(store));
            //history.push("/home");
        } catch (error) {
          //console.log(JSON.stringify(error));
          console.log(error.message);
          //setIsError(true);
        }
      }
    };
    fetchData();

  }, [confirmationTokenMatch]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (inputSubmitted) {
        try {
            const result = await axios.get(REGISTERURL + "/" + store.current_user_id + "/email_confirmation", { withCredentials: true });
            console.log(JSON.stringify(result));
            console.log(result.data.username);
        } catch (error) {
          //console.log(JSON.stringify(error));
          console.log(error.message);
          //setIsError(true);
        }
      }
    };
    fetchData();

  }, [inputSubmitted]);


  const VerifyConfirmToken = () => {
    {/*alert(JSON.stringify(message));*/}
    return (
      <div >
        <h1><span>Welcome to 2Unstoppable  {store.username} !</span></h1>
        <p> <span>We are so glad that you signed up and created a profile.</span></p>
        <p > Before you can begin connecting with other members, please confirm your account. </p>
        <p> An email has been sent to  {store.email} </p>
        <p> If you cannot find your confirmation email, click below. </p>
        <Fragment>
          <form onSubmit={handleResendConfirmationLink}>
              <Button
                  type='submit'
                  value='resend'
            >Resend</Button>
          </form>
          <br/>
          <p> Please Enter Confirmation token </p>
        </Fragment>
        
      <form onSubmit={handleCheckConfirmationToken}>
      { errorMessage && <h3 className="error"> { errorMessage } </h3> }
        <div className="form-group">
          <input
            type="confirmationToken"
            name="confirmationToken"
            placeholder="Token"
            value={confirmationToken}
            onChange={event => setConfirmationToken(event.target.value)}
            required
            />
        </div> 
        
         {!isError &&  <button type="submit">Check Confirmation Token</button>}
         {isError &&  <button name="refresh" onClick={handleRefresh as any}>Refresh and Renter</button>}
      </form>       

      </div>
    )
  }

  const handleLogin = async e => {
    e.preventDefault();
    history.push("/logout");
  }

  const ForwardUserToLogin = () => {
   
    return ( 
      <div>
        <p> You have have successfully confirmed your pin. </p>
        <Fragment>
          <form onSubmit={handleLogin}>
              <Button
                  type='submit'
                  value='login'
            >Login</Button>
          </form>
          <br/>
          <p> Please Enter Confirmation token </p>
        </Fragment>
      </div>
    )
  }


  return(
  <div>
    {confirmationTokenMatch ? (<ForwardUserToLogin />) :  (<div >
        <h1><span>Welcome to 2Unstoppable  {store.username} !</span></h1>
        <p> <span>We are so glad that you signed up and created a profile.</span></p>
        <p > Before you can begin connecting with other members, please confirm your account. </p>
        <p> An email has been sent to  {store.email} </p>
        <p> If you cannot find your confirmation email, click below. </p>
        <Fragment>
          <form onSubmit={handleResendConfirmationLink}>
              <Button
                  type='submit'
                  value='resend'
            >Resend</Button>
          </form>
          <br/>
          <p> Please Enter Confirmation token </p>
        </Fragment>
        
      <form onSubmit={handleCheckConfirmationToken}>
      { errorMessage && <h3 className="error"> { errorMessage } </h3> }
        <div className="form-group">
          <input
            type="confirmationToken"
            name="confirmationToken"
            placeholder="Token"
            value={confirmationToken}
            onChange={event => setConfirmationToken(event.target.value)}
            required
            />
        </div> 
        
         {!isError &&  <button type="submit">Check Confirmation Token</button>}
         {isError &&  <button name="refresh" onClick={handleRefresh as any}>Refresh and Renter</button>}
      </form>       

      </div>)}
   </div>   
      
  )
}
  export default VerifyStep;