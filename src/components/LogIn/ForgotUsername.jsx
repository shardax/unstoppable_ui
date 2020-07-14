import React from 'react';
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import axios from "axios";
import Error from "./Error";
import './SignIn.scss'
import { FORGOTUSERNAMEURL } from "../../constants/matcher";
import ReCAPTCHA from "react-google-recaptcha";

const store = useDataStore();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 
function onChange(value) {
  console.log("Captcha value:", value);
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
  .email("Must be an email address")
  .max(255, "Too Long!")
  .required("Required")
});


const ForgotUsername = () => {

  const currentUserStore = useDataStore()

  
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ValidationSchema}
      validate={values => {
        let errors = {};
        
        return errors;
      }}
         
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
         // alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
   
        const fetchData = async () => {
          try {
            
            const result = await axios.post(FORGOTUSERNAMEURL, {user: { email: values.email  }}, { withCredentials: true });
              console.log(JSON.stringify(result));
          } catch (error) {
            //console.log(JSON.stringify(error));
            console.log(error.message);
              if (error.message.includes("401")) {
                // setErrorMessage("Invalid Email");
             } else {
                 // setErrorMessage(error.message);
              }
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
          <h2>Forgot Username</h2>
          <h5>Please enter the email you used to sign up and we will send you an email with your username.</h5>
         
          <div className="input-row">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={"global-input login-form " + (touched.email && errors.email ? "has-error" : null)}
            />
            <Error touched={touched.email} message={errors.email} />
          </div>

          <div className="input-row">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <ReCAPTCHA
            sitekey="6LdpusYUAAAAAMlMPRc3ljtC7He3A0XywRmhEt0U"
            onChange={onChange}
          />,
        </form>
      )}
    </Formik>
  );
}

export default ForgotUsername;