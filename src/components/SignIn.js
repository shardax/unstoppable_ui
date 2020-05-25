import React, {useContext, useState, useEffect} from "react";
import { observer, useAsObservableSource, useLocalStore } from "mobx-react"
import axios from "axios";
import { UserContext, StoreContext } from "../UserContext";

export default function SignIn() {

  const [url, setUrl] = useState(
    'http://localhost:3001/users/sign_in',
    //'http://uns1.herokuapp.com/users/sign_in',
  );
  const {value, setValue} = useContext(UserContext);
  const store = React.useContext(StoreContext)
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputSubmitted(true);
  }

  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        let data = { user: {"username": inputUserName, "password": inputPassword}}
        const result = await axios.post(url, data, { withCredentials: true });
        console.log(JSON.stringify(result));
        console.log(result.data.username);
        //setValue({username: result.data.name, isLoggedIn: true});
        //setData(result.data);
        store.username =  result.data.username;
        store.isLoggedIn = true;
        console.log("Printing store values")
        console.log(store.username);
        console.log(store.isLoggedIn);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [inputSubmitted]);
    
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="username"
          name="username"
          placeholder="Username"
          value={inputUserName}
          onChange={event => setInputUserName(event.target.value)}
          required
          />
          <input 
          type="password"
          name="password"
          placeholder="Password"
          value={inputPassword}
          onChange={event => setInputPassword(event.target.value)}
          required
          />
          <button type="submit">Login</button>
      </form>
      </div>
      );  }

