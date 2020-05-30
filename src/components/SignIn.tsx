import React, { useState, useEffect} from "react";
import {RouteComponentProps, useHistory} from 'react-router-dom';
import axios from "axios";
import {useStore} from "../UserContext";
import { LOGINURL } from "../constants/matcher";

interface Props extends RouteComponentProps{}

const SignIn: React.FC<Props> = ({  }) => {

  const history = useHistory();

  const url = LOGINURL;
  
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputSubmitted(true);
  }

  const store = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      store.isLoggedIn = false;
 
      try {
        if (inputSubmitted) {
          let data = { user: {"username": inputUserName, "password": inputPassword}}
          const result = await axios.post(url, data, { withCredentials: true });
          console.log(JSON.stringify(result));
          console.log(result.data.username);
          store.username =  result.data.username;
          store.isLoggedIn = true;
          console.log("Printing store values")
          console.log(store.username);
          console.log(store.isLoggedIn);
        }
      } catch (error) {
        setIsError(true);
      }
      console.log("store.isLoggedIn)");
      console.log(store.isLoggedIn);
      if(store.isLoggedIn){
        history.push("/home");
      }
    };
    fetchData();

  }, [inputSubmitted]);

    return (
    <div>
      <form onSubmit={handleSubmit}>
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
         <button type="submit">Login</button>
      </form>
      </div>
      );
    }

    export default SignIn;
