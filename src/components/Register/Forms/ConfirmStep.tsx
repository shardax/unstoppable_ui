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

const ConfirmStep = () => {
  const store = useDataStore();
  //const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });
  const [inputSubmitted, setInputSubmitted] = useState(false);
  let profile = store.profile;
 
  
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
    <Fragment>
      
      <form onSubmit={handleSubmit}>
        
          <Button
              type='submit'
              value='Upload'
        >Submit Profile</Button>
      </form>
    </Fragment>
  
  );
}
export default ConfirmStep;
