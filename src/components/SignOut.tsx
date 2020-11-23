import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {useDataStore} from "../UserContext";
import { LOGOUTURL, SAVESEARCHPARAMSURL } from "../constants/matcher";

//export default function SignOut() {
const SignOut: React.FC = ({  }) => {
  const url = LOGOUTURL;
  const store = useDataStore();
  const history = useHistory();
  
  useEffect(() => {

    // Save Search Params prior to logging off
    const saveSearchParamsData = async () => {
      try {
        const result = await axios.patch(SAVESEARCHPARAMSURL,
          { "search_user_params": store.savedSearchParams, "id": store.current_user_id},
          { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
        });
        console.log('👉 Returned data:', result);
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
        // error
      }
    }
    
    saveSearchParamsData();
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(LOGOUTURL, { withCredentials: true });
        console.log('👉 Returned data:', response);
        store.username = "";
        store.isLoggedIn = false;
        store.clear();
        localStorage.removeItem("userStore");
        localStorage.clear();
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
        // error
      }
      history.push("/login")
    }
    setTimeout(() => {
      fetchData();
     }, 3000)
  }, []);
    
    return (
    <div>
      
    </div>
      );
}

export default SignOut;

