import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { REGISTERURL} from "../../../constants/matcher";
import Button from '../../Styled/Button';
import Paper from '../../Styled/Paper';
import './Steps.scss'
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../../constants/ProfileConstants";

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const ConfirmStep = () => {
  const store = useDataStore();
  //const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });
  const [inputSubmitted, setInputSubmitted] = useState(false);
 
  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/wizard/5");
    }
  }, []);
  
  const handleSubmit = async e => {
    e.preventDefault();
    setInputSubmitted(true);
  }
  
  useEffect(() => {
    const fetchData = async () => {
     
      if (inputSubmitted) {
        try {
            const result = await axios.get(REGISTERURL + "/" + store.current_user_id + "/email_confirmation", { withCredentials: true });
            console.log(JSON.stringify(result));
            console.log(result.data.username);
            history.push("/wizard/5");
        } catch (error) {
          //console.log(JSON.stringify(error));
          console.log(error.message);
          //setIsError(true);
        }
      }
    };
    fetchData();

  }, [inputSubmitted]);

  return (
    <div className="form-container user-section-wrapper">
      <div className="user-section-data">
        <Paper>
          <div className="profile-section-header">Email Confirmation</div>
            <Fragment>
              
              <form onSubmit={handleSubmit}>
                  <p> Click button below to submit your profile. An email will be sent to you with instructions to confirm your email.</p>
                  <Button
                      type='submit'
                      value='Upload'
                >Submit Profile</Button>
              </form>
            </Fragment>
        </Paper>
      </div>
    </div>
  
  );
}
export default ConfirmStep;
