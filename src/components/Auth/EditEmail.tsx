import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEEMAILURL, VALIDEMAILURL } from "../../constants/matcher";
import Button from '../Button/Button';
import Input from '../Input/input';

interface IStateProps {
  stateProps: {
    setShowEmail: React.Dispatch<React.SetStateAction<boolean>>
  }
}
  
const EditEmail = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleCancelEmail = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowEmail(false);
    }


    const ValidationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required("Required!!")
     .test('Unique Email','Email already been taken', 
              function(value){return new Promise((resolve, reject) => {        
                  axios.post(VALIDEMAILURL,  { "email": value, "id": store.current_user_id},{ withCredentials: true,
                  headers: {
                    contentType: "application/json; charset=utf-8",
                }})
                 .then(res => {
                   if(res.data.message === 'Email already been taken'){
                     console.log(res.data.message);
                     resolve(false);
                  } else {
                    console.log("Email valid")
                    resolve(true);
                  }
                })
              })}
            )  
      });
      
    const setEmail = (email) => {
      store.email = email;
      localStorage.setItem("userStore", JSON.stringify(store));
    }
  
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
  
          const saveData = async () => {
       
            try {
                const result = await axios.patch(SAVEEMAILURL,
                  { "email": values.email, "id": store.current_user_id},
                  { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
                });
                console.log(JSON.stringify(result));
                if (result.data.status != "error") {
                  setEmail(values.email);
                  values.email =  result.data.email;;
                  console.log("updated email="+ store.email);
                  props.stateProps.setShowEmail(false);
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
              <Input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={store.email}
                className={"login-form " + (touched.email && errors.email ? "has-error" : null)}
              />
              <Error touched={touched.email} message={errors.email} />
              <Error touched={touched.email} message={errorMessage} />
            </div>
  
            <div className="input-row">
            <Button type="submit" margin="0em 0em" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="submit" margin="0em 1.5em"  onClick={handleCancelEmail}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default EditEmail;
