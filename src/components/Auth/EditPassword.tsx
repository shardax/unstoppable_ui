import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEPASSWORDURL } from "../../constants/matcher";
import Button from '../Styled/Button';
import Input from '../Styled/input';
import { displayToast } from '../Toast/Toast';

interface IStateProps {
  stateProps: {
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  }
}


  
const EditPassword = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleCancelPassword = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowPassword(false);
    }

    const ValidationSchema = Yup.object().shape({
        currentpassword: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Does not meet requirements")
          .required("Current Password Required!!"), 
        newpassword: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Does not meet requirements")
          .required("New Password Required!!"), 
        confirmnewpassword: Yup.string()
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
          currentpassword: '',
          newpassword: '',
          confirmnewpassword: '',
        }}
        validationSchema={ValidationSchema}
        validate={values => {
          let errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
  
          const fetchData = async () => {
            //setIsError(false);
          //  store.isLoggedIn = false;
       
            try {
              const result = await axios.post(SAVEPASSWORDURL,
                { user: {"current_password": values.currentpassword, "password": values.newpassword,"password_confirmation": values.confirmnewpassword}},
                { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
              });
                console.log(JSON.stringify(result));
                console.log(result.data.username);
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
            <div>
              <Input
                type="password"
                name="currentpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Current password"
                className={"login-form " + (touched.currentpassword && errors.currentpassword ? "has-error" : null)}
              />
              <Input
                type="password"
                name="newpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="New password"
                className={"login-form " + (touched.newpassword && errors.newpassword ? "has-error" : null)}
              />
              <Input
                type="password"
                name="confirmnewpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm New password"
                className={"login-form " + (touched.confirmnewpassword && errors.confirmnewpassword ? "has-error" : null)}
              />
              <Error touched={touched.currentpassword} message={errors.currentpassword} />
              <Error touched={touched.currentpassword} message={errorMessage} />
              <Error touched={touched.newpassword} message={errors.newpassword} />
              <Error touched={touched.newpassword} message={errorMessage} />
              <Error touched={touched.confirmnewpassword} message={errors.confirmnewpassword} />
              <Error touched={touched.confirmnewpassword} message={errorMessage} />
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
  

export default EditPassword;
