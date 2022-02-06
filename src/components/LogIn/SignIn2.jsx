import './SignIn.scss';

import * as Yup from "yup";

import {AGE_RANGE_CONSTANT, STEP_CONFIRMED_EMAIL, STEP_EMAIL_CONFIRMATION_SENT} from "../../constants/ProfileConstants";
import {Link, useHistory} from 'react-router-dom';
import React, { useState } from "react";
import { faEye, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import Button from '../Styled/Button'
import Error from "./Error";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import Autosuggest from "react-autosuggest";
import { Formik } from "formik";
import Input from '../Styled/Input'
import { LOGINURL } from "../../constants/matcher";
import {SearchParamsStore} from "../../UserStore";

import axios from "axios";

import logo from '../../images/2Unstoppable_logo.png';
import {useDataStore} from "../../UserContext";
import {View, TextInput} from "react";
import { text } from '@fortawesome/fontawesome-svg-core';

axios.defaults.withCredentials = true;
// import {displayToast} from "../Toast/Toast";

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required(`ⓘ  This field is required`),
  password: Yup.string()
    .required("ⓘ  This field is required")
});


const SignIn2 = () => {
  const history = useHistory();
  const url = LOGINURL;
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const store = useDataStore()

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={ValidationSchema}
      validate={values => {
        let errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          //resetForm();
          setSubmitting(false);
        }, 500);

        const fetchData = async () => {
          setIsError(false);
          store.isLoggedIn = false;
     
          try {
            const result = await axios.post(url,
              { user: {"username": values.username, "password": values.password}},
              {headers: {"Access-Control-Allow-Origin": "*", contentType: "application/json; charset=utf-8", "Accept": "application/json", "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials':true} 
            });
              console.log(JSON.stringify(result));
              console.log(result.data.username);
              store.username =  result.data.username;
              store.current_user_id = result.data.current_user_id;
              store.email = result.data.email;
              store.isLoggedIn = true;
              store.profile = result.data.profile;
              store.profileId = result.data.profile.id;
              store.avatarPath = result.data.photo;
              store.phone = result.data.phone_number;
              store.activities = result.data.all_activities;
              store.exerciseReasons = result.data.all_exercise_reasons;
              store.confirm_token = result.data.confirm_token;
              store.user_confirmed = (store.profile.step_status == STEP_CONFIRMED_EMAIL) ? true:false
              store.uniqueLists.unique_state_codes = result.data.unique_state_codes;
              store.uniqueLists.unique_zipcodes = result.data.unique_zipcodes;
              store.uniqueLists.unique_cities = result.data.unique_cities;
              store.savedSearchParams = new SearchParamsStore();
              if (result.data.search_params) {
                store.savedSearchParams = result.data.search_params;
              }
              console.log(JSON.stringify(store.savedSearchParams));
              localStorage.setItem("userStore", JSON.stringify(store));
          } catch (error) {
            console.log(error.message);
            if (error.message.includes("401")) {
              setErrorMessage("ⓘ Oops! Username or password is incorrect.");
            } else {
              setErrorMessage(error.message);
            }
            setIsError(true);
          }
          if (store.isLoggedIn){
            if (store.user_confirmed)
              history.push("/home");
            else {
              if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT)
                 history.push("/wizard/5");
              else
              history.push("/wizard/0");
            }
          } else {
            history.push("/login")
          }
        };
        /* Login and fetch initial data */
        fetchData();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        // form for signing in 
        <form className="form-spacing sign-in-card" style={{backgroundColor: 'white', borderRadius: '8px', 
        width: '480px'}} onSubmit={handleSubmit}>
          
            <div>
              <img src={logo} className="logo-image" alt="Logo" width="300"/>
            </div>
          
            <h2 className="sign-in-header">Sign In</h2>
            {/* { errorMessage && <h3 className="error"> { errorMessage } </h3> } */}

            <div className="signin-wrapper">
            
            <div className="input-row">
              <div className="input-format">
              
                <FontAwesomeIcon icon={faUser} className="iconInInputFormat"/>
                <Input 
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={(touched.username && errors.username ? "has-error" : null)}
                  padding = "10px 10px 10px 50px"
                  border="1px solid #f0f0f0"
                  focusBorder="1px solid #6429B9"
                  fontSize="14px"
                />
                
              </div>
              <Error touched={touched.username} message={errorMessage} />
            </div>

          <div className="register all">
            <Link to='/forgot-username' activeclassname="active">Forgot Your Username?</Link>
          </div>

          

            <div className="input-row">
              <div className="input-format">
              
                <FontAwesomeIcon icon={faLock} className="iconInInputFormat"/>
                
                <Input
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  className={(touched.password && errors.password ? "has-error" : null)}
                  padding = "10px 50px 10px 50px"
                  border="1px solid #f0f0f0"
                  focusBorder="1px solid #6429B9"
                  fontSize="14px"
                />
                <FontAwesomeIcon icon={faEye} className="passwordVisibilityEye" onClick={
                  function togglePassword () {
                    values.showPassword = !values.showPassword;
                    var password = document.getElementsByName("password")[0];
                    const type = password.getAttribute("type") === "password" ? "text" : "password";
                    password.setAttribute("type", type);
                  }
                }/>
                
                
              </div>
              <Error touched={touched.password} message={errorMessage} />
            </div>

          <div className="register all">
            <Link to='/forgot-password' activeclassname="active">Forgot Your Password?</Link>
          </div>
            
            {/* forgot password  */}
            <div className="last-input-row">
              <Button className="login-buttons" type="submit" disabled={isSubmitting} style={{background: "#F1658C"}}>
                SIGN IN
              </Button>
            </div>
            {/* Commenting this part out since new members gain membership through the new Wix website */ }
            {/* Dont have an account? */}
            {/*<hr/>
            <h6 className="no-account-header">Don't have an account?</h6>
            <div className="register">
              <Link to='/register' activeclassname="active">
                <Button className="login-buttons" type="submit" style={{background: "#FFE7ED", color: "#F1658C"}}>SIGN UP</Button>
              </Link>
            </div>*/}
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn2;
