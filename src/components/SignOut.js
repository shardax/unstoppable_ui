import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function SignOut() {

  const [url, setUrl] = useState(
    'http://localhost:3001/users/sign_out',
  );
  const {value, setValue} = useContext(UserContext);
  const [logoutSubmitted, setLogoutSubmitted] = useState(false);
  
  const handleLogout = (event) => {
    event.preventDefault();
    setLogoutSubmitted(true);
  }

  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(url, { withCredentials: true });
        console.log('👉 Returned data:', response);
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
    }
    fetchData();

  }, [logoutSubmitted]);
    
    return (
    <div>
      <button onClick={() => handleLogout()}>Login</button>
    </div>
      );
}

