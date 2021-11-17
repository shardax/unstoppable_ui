import './SignIn.scss';

import * as Yup from "yup";

import {AGE_RANGE_CONSTANT, STEP_CONFIRMED_EMAIL, STEP_EMAIL_CONFIRMATION_SENT} from "../../constants/ProfileConstants";
import {Link, useHistory} from 'react-router-dom';
import React, { useState } from "react";
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

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

// import {displayToast} from "../Toast/Toast";

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});


const SignIn2 = () => {
  const history = useHistory();
  const url = LOGINURL;
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          resetForm();
          setSubmitting(false);
        }, 500);

        const fetchData = async () => {
          setIsError(false);
          store.isLoggedIn = false;
     
          try {
            const result = await axios.post(url,
              { user: {"username": values.username, "password": values.password}},
              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
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
              setErrorMessage("Invalid Username or Password.");
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
        <form className="form-spacing" style={{backgroundColor: 'white', borderRadius: '8px', 
        width: '480px', height: '550px'}} onSubmit={handleSubmit}>
          <div className="all">
          <img src={logo} alt="Logo"  width="325" height="150"/>
          </div>
          <h2 className="all">Sign In</h2>
          { errorMessage && <h3 className="error"> { errorMessage } </h3> }
          <div className="input-row all">
            
            <div className="input-format">
            <span>
              <FontAwesomeIcon icon={faUser} />
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={(touched.username && errors.username ? "has-error" : null)}
                padding={"1em"}
                border="1px solid #f0f0f0"
                focusBorder="1px solid #6429B9"
                fontSize="14px"
              />
              </span>
            </div>
            <Error touched={touched.username} message={errors.username} />
          </div>
          <div className="register all">
            <Link to='/forgot-username' activeclassname="active">Forgot Your Username?</Link>
          </div>

          <div className="input-row all">
            <div className="input-format">
            <span>
              <FontAwesomeIcon icon={faLock} />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={(touched.password && errors.password ? "has-error" : null)}
                padding={"1em"}
                border="1px solid #f0f0f0"
                focusBorder="1px solid #6429B9"
                fontSize="14px"
              />
              </span>
            </div>
            <Error touched={touched.password} message={errors.password} />
          </div>
          <div className="register all">
            <Link to='/forgot-password' activeclassname="active">Forgot Your Password?</Link>
          </div>

          <div className="input-row all">
            <Button type="submit" disabled={isSubmitting} padding="8px 150px" style={{background: "#F1658C"}}>
              SIGN IN
            </Button>
          </div>
          <br/>
          <div className="all">Don't have an account?</div>
          <div className="register all">
            <Link to='/register' activeclassname="active" padding="8px 150px" style={{background: "#FFE7ED"}}>
              <Button type="submit" padding="8px 150px" style={{background: "#FFE7ED", color: "#F1658C"}}>Sign Up</Button>
            </Link>
          </div>

        </form>
      )}
    </Formik>
  );
}

export default SignIn2;