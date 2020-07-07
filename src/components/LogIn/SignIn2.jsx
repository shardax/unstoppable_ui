import React, { useState} from "react";
import {useHistory} from 'react-router-dom';
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

  const currentUserStore = useDataStore()

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={ValidationSchema}
      validate={values => {
        let errors = {};

        // Validate the Postal Code conditionally based on the chosen Country
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);


        setIsError(false);
        currentUserStore.isLoggedIn = false;
   
        const fetchData = async () => {
          setIsError(false);
          currentUserStore.isLoggedIn = false;
     
          try {
            
              let data = { user: {"username": values.username, "password": values.password}}
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
              className={"global-input " + (touched.username && errors.username ? "has-error" : null)}
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
              className={"global-input " + (touched.password && errors.password ? "has-error" : null)}
            />
            <Error touched={touched.password} message={errors.password} />
          </div>

          <div className="input-row">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn2;