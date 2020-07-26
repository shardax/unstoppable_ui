import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { useFormik, Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';


  
const EditUsername = () => {
    const store = useDataStore();
    const history = useHistory();
    const [showUsername, setShowUsername] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
   
    //interface AxiosRequestConfig {
    //  username: string;
   // }

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
          .min(2, "Too Short!")
          .max(255, "Too Long!")
          .required("Required!!")
          .test('Unique Username','Username already in use', 
              function(value){return new Promise((resolve, reject) => {        
                  axios.post('http://localhost:3001/account_settings/valid_username',  { "username": value, "id": store.current_user_id},{ withCredentials: true,
                  headers: {
                    contentType: "application/json; charset=utf-8",
                }})
                 // .then(res => {if(res.data.msg === 'Username already been taken'){resolve(false)} resolve(true)})
                 .then(res => {
                   if(res.data.message === 'Username already been taken'){
                     console.log(res.data.message);
                     setErrorMessage('Username already been taken');
                  } else {
                    console.log("USER GOOD!")
                  }
                })
              })}
          )   
      });
      

    const setUsername = (name) => {
      store.username = name;
      localStorage.setItem("userStore", JSON.stringify(store));
    }
  
    const handleEditUsername = () => {
     // event.preventDefault();
      setShowUsername(!showUsername);
     }
    
  
    return (
      <Formik
        initialValues={{
          username: "",
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
  
          const saveData = async () => {
            setIsError(false);
            store.isLoggedIn = false;
       
            try {
                let url = "http://localhost:3001"+  "/account_settings/change_username";
                const result = await axios.patch(url,
                { "username": values.username, "id": store.current_user_id},
                { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
                });
                console.log(JSON.stringify(result));
                if (result.data.status != "error") {
                setUsername(values.username);
                values.username =  result.data.username;;
                console.log("updated username="+ store.username);
                history.push("/usettings");
                }
                else {

                console.log("printint error  message")
                console.log(result.data.message);
                // parse and show error
                //setErrors(result.data.message)
                //errors.username = result.data.message;

                }
            } catch (error) {
            console.log(JSON.stringify(error));
            setErrorMessage(error.message);
            setIsError(true);
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
            <h2>Change Username</h2>
            <div className="input-row">
              <label>Name</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={"global-input login-form " + (touched.username && errors.username ? "has-error" : null)}
              />
              <Error touched={touched.username} message={errors.username} />
              <Error touched={touched.username} message={errorMessage} />
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
  

export default EditUsername
