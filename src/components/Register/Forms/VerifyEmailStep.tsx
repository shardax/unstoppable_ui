import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDataStore } from "../../../UserContext";
import axios from "axios";
import { REGISTERURL, PROFILEURL} from "../../../constants/matcher";
import {STEP_CONFIRMED_EMAIL} from "../../../constants/ProfileConstants";
import Button from '../../Styled/Button';
import Input from '../../Styled/Input';
import Paper from '../../Styled/Paper';
import './Steps.scss'
import { createBrowserHistory } from 'history'

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const VerifyEmailStep = () => {
  const store = useDataStore();
  const [resendSubmitted, setResendSubmitted] = useState(false);
  const history = createBrowserHistory({ forceRefresh: true });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationToken, setConfirmationToken] = useState("");
  const [confirmationTokenMatch, setConfirmationTokenMatch] = useState(false);
   
  const handleResendConfirmationLink = async e => {
    e.preventDefault();
    setResendSubmitted(true);
  }

  const handleLogin = async e => {
    e.preventDefault();
    history.push("/logout");
  }

  useEffect(() => {
    setTimeout(() => {
      history.push("/logout");
     }, 120000);
  })

  const ResendMessage = () => {

    useEffect(() => {
      const fetchData = async () => {
        if (resendSubmitted) {
          try {
              const result = axios.get(REGISTERURL + "/" + store.current_user_id + "/resend_confirmation_json",{ withCredentials: true});
              console.log(JSON.stringify(result));
              setTimeout(() => {
                history.push("/logout");
               }, 5000);
          } catch (error) {
            //console.log(JSON.stringify(error));
            console.log(error.message);
            //setIsError(true);
          }
        }
      };
      fetchData();
    }, [resendSubmitted]);

   
    return ( 
      <div>
        <p> An email has been sent to your Account. Please confirm your email. </p>
      </div>
    )
  }

  return(
  <div>
    <div className="form-container user-section-wrapper">
      <div className="user-section-data">
        <Paper>
          <div className="profile-section-header">Email Confirmation</div>
          {resendSubmitted ? (<ResendMessage />) :  (<div>
              <h2><span>Welcome to 2Unstoppable  {store.username} !</span></h2>
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
              </Fragment>
            </div>)}
        </Paper>
      </div>
    </div>
   </div>   
      
  )
}
  export default VerifyEmailStep;