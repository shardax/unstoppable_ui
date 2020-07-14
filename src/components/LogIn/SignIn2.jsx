import React, { useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import './SignIn.scss'
//import Autosuggest from "react-autosuggest";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error";
import {useDataStore} from "../../UserContext";
import { LOGINURL } from "../../constants/matcher";

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
              const result = await axios.post(url, { user: {"username": values.username, "password": values.password}}, { withCredentials: true });
              console.log(JSON.stringify(result));
              console.log(result.data.username);
              store.username =  result.data.username;
              store.email = result.data.email;
              store.isLoggedIn = true;
              store.profile = result.data.profile;
              store.profileId = result.data.profile.id;
              store.avatarPath = result.data.photo;
              store.activities = result.data.all_activities;
              store.exerciseReasons = result.data.all_exercise_reasons;
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
          if(store.isLoggedIn){
            history.push("/home");
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
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          { errorMessage && <h3 className="error"> { errorMessage } </h3> }
          <div className="input-row">
            <label>Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={"global-input login-form " + (touched.username && errors.username ? "has-error" : null)}
            />
            <Error touched={touched.username} message={errors.username} />
          </div>

          <div className="input-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={"global-input login-form " + (touched.password && errors.password ? "has-error" : null)}
            />
            <Error touched={touched.password} message={errors.password} />
          </div>

          <div className="input-row">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <div className="register">
            <Link to='/register' activeClassName="active">Sign Up</Link>
          </div>
          <div className="register">
            <Link to='/fusername' activeClassName="active">Forgot Your Username?</Link>
          </div>
          <div className="register">
            <Link to='/fpassword' activeClassName="active">Forgot Your Password?</Link>
          </div>
          <div className="register">
            <Link to='/resetpassword' activeClassName="active">Reset Password</Link>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn2;