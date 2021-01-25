import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory, useParams} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "./Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { FORGOTPASSWORDURL } from "../../constants/matcher";
import Button from '../Styled/Button';
import Input from '../Styled/Input';
import { displayToast } from '../Toast/Toast';

  
const ForgotPasswordForm = () => {
    const store = useDataStore();
    const tokenId  = useParams();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleCancelPassword = (event: React.MouseEvent) => {
      event.preventDefault();
      
    }

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Does not meet requirements")
          .required("New Password Required!!"), 
          password_confirmation: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Does not meet requirements")
          .when("newpassword", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newpassword")],
              "both passwords need to be the same"
              )
          })
          .required(" Confirm New Password Required!!"),
      });
  
    return (
      <Formik
        initialValues={{
          password: '',
          password_confirmation: '',
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
            try {
              
              const result = await axios.patch(FORGOTPASSWORDURL,
                { user: {"password": values.password,"password_confirmation": values.password_confirmation, "reset_token": tokenId["tokenId"]}},
                { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
              });
                //history.push("/passwordChanged")
                displayToast("Successfully updated password ✅", "success", 3000, "top-right")
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
            <div className="input-row">
              <div className="input-format">
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="New password"
                  className={"login-form " + (touched.password && errors.password ? "has-error" : null)}
                />
                <Error touched={touched.password} message={errors.password} />
                <Error touched={touched.password} message={errorMessage} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-format"></div>
              <Input
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm New password"
                className={"login-form " + (touched.password_confirmation && errors.password_confirmation ? "has-error" : null)}
              />
              <Error touched={touched.password_confirmation} message={errors.password_confirmation} />
              <Error touched={touched.password_confirmation} message={errorMessage} />
            </div>
            <div>
            (8 characters minimum, must contain at least 1 uppercase, 1 lowercase, and 1 number)
            </div>
            <div>
              <Button type="submit" margin="0em 0em" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="submit" margin="0em 1.5em"  onClick={handleCancelPassword}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default ForgotPasswordForm;
