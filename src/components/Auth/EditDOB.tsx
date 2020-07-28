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
import { SAVEDOBURL } from "../../constants/matcher";

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
          dob: "",
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

          


          
          let newDOB = new Date(values.dob);
          var year = newDOB.getFullYear();
          var month = newDOB.getMonth()+1;
          var day = newDOB.getDate();

          console.log(year);
          console.log(month);
          console.log(day);
          
         //dob(3i)"=> values.day, "dob(2i)"=>values.month, "dob(1i)"=>values.year}

         const saveData = async () => {
          try {
              const result = await axios.patch(SAVEDOBURL,
                { "id": store.current_user_id, "dob(3i)": day, "dob(2i)": month, "dob(1i)": year},
                { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
              });
              console.log(JSON.stringify(result));
              if (result.data.status != "error") {
                store.setDOB(result.data.dob);
                //values.username =  result.data.username;;
                //console.log("updated username="+ store.username);
                //props.stateProps.setShowUsername(false);

                history.push("/settings");
              }
              else {
              console.log("printint error  message")
              console.log(result.data.message);
              setErrorMessage(result.data.message);
              }
          } catch (error) {
          console.log(JSON.stringify(error));
          setErrorMessage(error.message);
          }
      };
      saveData();
          
          
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
              <DatePicker name="dob" />
              
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
