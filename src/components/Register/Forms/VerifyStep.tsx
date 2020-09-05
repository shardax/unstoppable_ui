import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { REGISTERURL} from "../../../constants/matcher";
import Button from '../../Styled/Button';
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const VerifyStep = () => {
  const store = useDataStore();
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const history = createBrowserHistory({ forceRefresh: true });
   
  const handleResendConfirmationLink = async e => {
    e.preventDefault();
    setInputSubmitted(true);
  }
  
  useEffect(() => {
    const fetchData = async () => {
     
      try {
          const result = await axios.get(REGISTERURL + "/" + store.current_user_id + "/email_confirmation", { withCredentials: true });
          console.log(JSON.stringify(result));
          console.log(result.data.username);
        
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        
        //setIsError(true);
      }
      history.push("/confirm");

    };
    fetchData();

  }, [inputSubmitted]);

  return ( 
      <div >
      <h1><span>Welcome to 2Unstoppable  {store.username} !</span></h1>
      <p > <span>We are so glad that you signed up and created a profile.</span></p>
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
    </Fragment>
      <br/>
      
      </div>
  )
  }
  export default VerifyStep;