import React from 'react';
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import axios from "axios";
import Error from "./Error";
import './SignIn.scss'
import { RESETPASSWORDURL } from "../../constants/matcher";
import ReCAPTCHA from "react-google-recaptcha";

const store = useDataStore();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 
function onChange(value) {
  console.log("Captcha value:", value);
}

const ValidationSchema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    changepassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
        )
    })
  });


const ForgotPassword = () => {

  const currentUserStore = useDataStore()

  
  return (
    <Formik
      initialValues={{
        password: "",
        changepassword: ""
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
            
            const result = await axios.post(RESETPASSWORDURL, {user: { password: values.password, confirmpassword: values.confirmpassword  }, }, { withCredentials: true });
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
         <label for="password">Password</label>
            <input
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
            <span class="error" style={{ color: "red" }}>
              {errors.password}
            </span>

            <label for="password">Confirm Password</label>
            <input
              type="password"
              name="changepassword"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.changepassword}
            />
            <span class="error" style={{ color: "red" }}>
              {errors.changepassword}
            </span>

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

export default ForgotPassword;