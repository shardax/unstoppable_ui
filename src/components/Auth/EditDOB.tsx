import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import { PROFILEURL } from "../../constants/matcher";

interface IStateProps {
  stateProps: {
    setShowUsername: React.Dispatch<React.SetStateAction<boolean>>
  }
}
  


const EditDOB= (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const ValidationSchema = Yup.object().shape({
      age: Yup.number()
      .min(18, "Must be 18 years old or older to register"),
      });
      
    const setUsername = (name) => {
      store.username = name;
      localStorage.setItem("userStore", JSON.stringify(store));
    }
  
    return (
      <Formik
        initialValues={{
          date: "",
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
            <h2>Change DOB</h2>
            <div className="input-row">
              <label>Name</label>
              <DatePicker name="date" />
              
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
  

export default EditDOB;
