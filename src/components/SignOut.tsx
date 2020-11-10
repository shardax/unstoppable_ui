import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {useDataStore} from "../UserContext";
import { LOGOUTURL } from "../constants/matcher";

//export default function SignOut() {
const SignOut: React.FC = ({  }) => {
  const url = LOGOUTURL;
  const store = useDataStore();
  const history = useHistory();
  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(url, { withCredentials: true });
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
    fetchData();

  }, []);
    
    return (
    <div>
      
    </div>
      );
}

export default SignOut;

