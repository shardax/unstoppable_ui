import React, {useState, useEffect} from "react";
import axios from "axios";
import {useStore} from "../UserContext";
import { LOGOUTURL } from "../constants/matcher";

//export default function SignOut() {
const SignOut: React.FC = ({  }) => {

  const url = LOGOUTURL;
  
  const store = useStore();
  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(url, { withCredentials: true });
        console.log('👉 Returned data:', response);
        store.username = "";
        store.isLoggedIn = false;
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

