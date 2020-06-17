import React, {useState, useEffect} from "react";
import axios from "axios";
import {useDataStore} from "../UserContext";
import { LOGOUTURL } from "../constants/matcher";

//export default function SignOut() {
const SignOut: React.FC = ({  }) => {

  const url = LOGOUTURL;
  
  const store = useDataStore();
  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(url, { withCredentials: true });
        console.log('👉 Returned data:', response);
        store.username = "";
        store.isLoggedIn = false;
        localStorage.clear();
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
        // error
      }
    }
    fetchData();

  }, []);
    
    return (
    <div>
      
    </div>
      );
}

export default SignOut;

