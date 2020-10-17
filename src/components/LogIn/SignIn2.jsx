import React, { useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import './SignIn.scss';
//import Autosuggest from "react-autosuggest";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error";
import {useDataStore} from "../../UserContext";
import { LOGINURL } from "../../constants/matcher";
import {STEP_CONFIRMED_EMAIL, STEP_EMAIL_CONFIRMATION_SENT} from "../../constants/ProfileConstants";
import Input from '../Styled/Input'
import Button from '../Styled/Button'
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
              store.activities = result.data.all_activities;
              store.exerciseReasons = result.data.all_exercise_reasons;
              store.confirm_token = result.data.confirm_token;
              store.user_confirmed = (store.profile.step_status == STEP_CONFIRMED_EMAIL) ? true:false
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
        <form className="form-spacing" onSubmit={handleSubmit}>
          <h2>Login</h2>
          { errorMessage && <h3 className="error"> { errorMessage } </h3> }
          <div className="input-row">
            <div className="input-format">
              <label>Name</label>
              <Input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={(touched.username && errors.username ? "has-error" : null)}
                padding={"1em"}
                border="1px solid #f0f0f0"
                focusBorder="1px solid #6429B9"
                fontSize="14px"
              />
            </div>
            <Error touched={touched.username} message={errors.username} />
          </div>

          <div className="input-row">
            <div className="input-format">
              <label>Password</label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={(touched.password && errors.password ? "has-error" : null)}
                padding={"1em"}
                border="1px solid #f0f0f0"
                focusBorder="1px solid #6429B9"
                fontSize="14px"
              />
            </div>
            <Error touched={touched.password} message={errors.password} />
          </div>

          <div className="input-row">
            <Button type="submit" disabled={isSubmitting} padding="8px 30px">
              Log in
            </Button>
          </div>
          <div className="register">
            <Link to='/register' activeclassname="active">Sign Up</Link>
          </div>
          <div className="register">
            <Link to='/fusername' activeclassname="active">Forgot Your Username?</Link>
          </div>
          <div className="register">
            <Link to='/fpassword' activeclassname="active">Forgot Your Password?</Link>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn2;