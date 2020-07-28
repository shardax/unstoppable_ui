import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEPASSWORDURL } from "../../constants/matcher";
import Button from '../Button/Button';
import Input from '../Input/input';

interface IStateProps {
  stateProps: {
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  }
}


  
const EditPassword = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleCancelPassword = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowPassword(false);
    }

    const ValidationSchema = Yup.object().shape({
        currentpassword: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/)
          .required("Current Password Required!!"), 
        newpassword: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/)
          .required("New Password Required!!"), 
        confirmnewpassword: Yup.string()
          .min(8, "Must be at least 8 characters long!")
          .required("Required")
          .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/)
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
  
          const saveData = async () => {
       
        saveData();
        }}}
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
              <Input
                type="text"
                name="currentpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Current password"
                className={"login-form " + (touched.currentpassword && errors.currentpassword ? "has-error" : null)}
              />
              <Input
                type="text"
                name="newpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="New password"
                className={"login-form " + (touched.newpassword && errors.newpassword ? "has-error" : null)}
              />
              <Input
                type="text"
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
  
            <div className="input-row">
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
