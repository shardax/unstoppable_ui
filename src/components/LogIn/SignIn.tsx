import React, { useState, useEffect} from "react";
import {RouteComponentProps, useHistory, Redirect} from 'react-router-dom';
import axios from "axios";
import {useDataStore} from "../UserContext";
import { LOGINURL } from "../constants/matcher";

interface Props extends RouteComponentProps{}

const SignIn: React.FC<Props> = ({  }) => {

  const history = useHistory();

  const url = LOGINURL;
  
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputSubmitted(true);
  }

  const handleRefresh = (event: any) => {
    event.preventDefault();
    setInputUserName("");
    setInputPassword("");
    setInputSubmitted(false);
    setErrorMessage("");
    setIsError(false);
  }

  const currentUserStore = useDataStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      currentUserStore.isLoggedIn = false;
 
      try {
        if (inputSubmitted) {
          let data = { user: {"username": inputUserName, "password": inputPassword}}
          const result = await axios.post(url, data, { withCredentials: true });
          console.log(JSON.stringify(result));
          console.log(result.data.username);
          currentUserStore.username =  result.data.username;
          currentUserStore.isLoggedIn = true;
          currentUserStore.profile = result.data.profile;
          currentUserStore.profileId = result.data.profile.id;
          currentUserStore.avatarPath= result.data.photo;
          console.log("Printing store values")
          console.log(currentUserStore.username);
          console.log(currentUserStore.isLoggedIn);
          console.log(currentUserStore.profile.id);
        }
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        if (error.message.includes("401")) {
          setErrorMessage("Invalid Username or Password.");
        } else {
          setErrorMessage(error.message);
        }
        setIsError(true);
      }
      console.log("store.isLoggedIn)");
      console.log(currentUserStore.isLoggedIn);
      if(currentUserStore.isLoggedIn){
        history.push("/home");
      } else {
        history.push("/login")
      }
    };
    fetchData();

  }, [inputSubmitted]);

    return (
    <div>
      <form onSubmit={handleSubmit}>
      { errorMessage && <h3 className="error"> { errorMessage } </h3> }
        <div className="form-group">
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={inputUserName}
            onChange={event => setInputUserName(event.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <input 
          type="password"
          name="password"
          placeholder="Password"
          value={inputPassword}
          onChange={event => setInputPassword(event.target.value)}
          required
          />
         </div>
         {!isError &&  <button type="submit">Login</button>}
         {isError &&  <button name="refresh" onClick={handleRefresh as any}>Refresh and Login</button>}
      </form>
      </div>
      );
    }

    export default SignIn;