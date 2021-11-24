import React, {useState, useEffect} from 'react';
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import axios from "axios";
import Error from "./Error";
import './SignIn.scss'
import { SENDUSERNAMEURL } from "../../constants/matcher";
import ReCAPTCHA from "react-google-recaptcha";
import Paper from '../Styled/Paper';
import Input from '../Styled/Input';
import Button from '../Styled/Button';
import { createBrowserHistory } from 'history'
import UnsIcon from '../../images/2Unstoppable_logo.png'

const store = useDataStore();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 
const recaptchaRef = React.createRef();

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
  .email("Must be an email address")
  .max(255, "Too Long!")
  .required("Required")
});


const ForgotPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const history = createBrowserHistory({ forceRefresh: true });
  const currentUserStore = useDataStore()

  useEffect(() => {
    if (sentEmail) {
      history.push("/sentEmail")
    }
  }, [sentEmail]);

  
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
              const result = await axios.post(SENDUSERNAMEURL, {user: { email: values.email  }, stype:"P" }, { withCredentials: true });
              console.log(JSON.stringify(result));
              setSentEmail(true);
          } catch (error) {
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
            <div style={{ display: "flex", justifyContent: "center"}}>
                <div className = "logoImage"><img className="logoImage" src={UnsIcon} alt=""/></div>
            </div>
            <div className = "forgot">Forgot Password?</div>
            <div className = "enterInfo">Please enter the email you used to sign up and we will send you instructions on how to reset your password</div>
          
            {/* <div className="input-row"> */}
              <div className="address">Email Address:</div>
              <Input
                margin="0em 1em"
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={"global-input login-form " + (touched.email && errors.email ? "has-error" : null)}
             />
              <Error touched={touched.email} message={errors.email} />
            {/* </div> */}

            <div className="input-row">
              <Button type="submit" disabled={isSubmitting}>
                SUBMIT
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

export default ForgotPassword;