import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { UserContext, useStore } from "../UserContext";

export default function SignOut() {

  const [url, setUrl] = useState(
    'http://localhost:3001/users/sign_out',
  );
  
  const [logoutSubmitted, setLogoutSubmitted] = useState(false);
  
  const handleLogout = (event: MouseEvent) => {
    event.preventDefault();
    setLogoutSubmitted(true);
  }

  const store = useStore();
  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.delete(url, { withCredentials: true });
        console.log('👉 Returned data:', response);
        //setValue({username: result.data.name, isLoggedIn: true});
        store.username = "";
        store.isLoggedIn = false;
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
    }
    fetchData();

  }, [logoutSubmitted]);
    
    return (
    <div>
      <button onClick={() => handleLogout}>Login</button>
    </div>
      );
}

//export default SignOut;

