import React from 'react';
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import * as Yup from 'yup';
import axios from "axios";
import Error from "./Error";
import './SignIn.scss';
import { FORGOTUSERNAMEURL } from "../../constants/matcher";
import ReCAPTCHA from "react-google-recaptcha";
import Paper from '../Styled/Paper';
import Input from '../Styled/Input';
import Button from '../Styled/Button';

const store = useDataStore();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 
const recaptchaRef = React.createRef();

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
        <div style={{ margin: "25px auto", maxWidth: "600px"}} className="form-spacing">
          <form onSubmit={handleSubmit}>
            <Paper>
              <h2>Forgot Username</h2>
              <h5>Please enter the email you used to sign up and we will send you an email with your username.</h5>
            
              <div className="input-row">
                <label>Email</label>
                <Input
                  margin="0em 1em"
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={(touched.email && errors.email ? "has-error" : null)}
                />
                <Error touched={touched.email} message={errors.email} />
              </div>

              <div className="input-row">
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
              <form onSubmit={() => { recaptchaRef.current.execute(); }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6LdpusYUAAAAAMlMPRc3ljtC7He3A0XywRmhEt0U"
                />
            </form>
            </Paper>
          </form>
          </div>
        )}
    </Formik>
  );
}

export default ForgotUsername;