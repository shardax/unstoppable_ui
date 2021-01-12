import React, {useState, useEffect} from "react";
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import * as Yup from 'yup';
import Error from "../LogIn/Error";
import '../manageProfile/EditProfile.scss'
import Input from '../Styled/Input';
import Button from '../Styled/Button';
import Textarea from '../Styled/Textarea';
import Select from '../Styled/Select';
import Paper from '../Styled/Paper';

import { displayToast } from '../Toast/Toast';



const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id || false}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={"radio-button"}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const AddChatroom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const history = useHistory();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setInputSubmitted(true);
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      
 
      try {
        if (inputSubmitted) {
          let data = { chatroom: {"name": name, "description": description}};
          //const result = await axios.post(ROOTURL+"/events", data, { withCredentials: true });

          const result = await axios.post(ROOTURL+ "/chatrooms",
            data,
            { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
          });

          //console.log(JSON.stringify(result));
          //console.log(result.data);
          history.push("chatrooms");
        }
      } catch (error) {
        //console.log(JSON.stringify(error));
        console.log(error.message);
        setIsError(true);
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
            type="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            />
        </div>
        <div className="form-group">
            <input 
            type="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
            />
         </div>
         
         {!isError &&  <button type="submit">Save</button>}
      </form>
      </div>
  )
}
export default AddChatroom;