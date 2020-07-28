import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEUSERNAMEURL, VALIDUSERNAMEURL } from "../../constants/matcher";
import Button from '../Button/Button';
import Input from '../Input/input';

interface IStateProps {
  stateProps: {
    setShowUsername: React.Dispatch<React.SetStateAction<boolean>>
  }
}
  
const EditUsername = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleCancelUsername = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowUsername(false);
    }

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
          .min(2, "Too Short!")
          .max(255, "Too Long!")
          .required("Required!!")
          .test('Unique Username','Username already been taken', 
              function(value){return new Promise((resolve, reject) => {        
                  axios.post(VALIDUSERNAMEURL,  { "username": value, "id": store.current_user_id},{ withCredentials: true,
                  headers: {
                    contentType: "application/json; charset=utf-8",
                }})
                 .then(res => {
                   if(res.data.message === 'Username already been taken'){
                     console.log(res.data.message);
                     resolve(false);
                  } else {
                    console.log("User valid")
                    resolve(true);
                  }
                })
              })}
          )   
      });
      
    const setUsername = (name) => {
      store.username = name;
      localStorage.setItem("userStore", JSON.stringify(store));
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
           // alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
  
          const saveData = async () => {
       
            try {
                const result = await axios.patch(SAVEUSERNAMEURL,
                  { "username": values.username, "id": store.current_user_id},
                  { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
                });
                console.log(JSON.stringify(result));
                if (result.data.status != "error") {
                  setUsername(values.username);
                  values.username =  result.data.username;;
                  console.log("updated username="+ store.username);
                  props.stateProps.setShowUsername(false);
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
            <div className="input-row">
              <label>Name</label>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={"login-form " + (touched.username && errors.username ? "has-error" : null)}
              />
              <Error touched={touched.username} message={errors.username} />
              <Error touched={touched.username} message={errorMessage} />
            </div>
  
            <div className="input-row">
            <Button type="submit" margin="0em 0em" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="submit" margin="0em 1.5em"  onClick={handleCancelUsername}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default EditUsername;
