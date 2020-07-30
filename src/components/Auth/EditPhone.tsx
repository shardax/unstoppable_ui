import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEPHONEURL, VALIDPHONEURL } from "../../constants/matcher";
import Button from '../Styled/Button';
import Input from '../Styled/input';
import { displayToast } from '../Toast/Toast';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

interface IStateProps {
  stateProps: {
    setShowPhone: React.Dispatch<React.SetStateAction<boolean>>
  }
}
  
const EditPhone = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleCancelPhone = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowPhone(false);
    }

    const ValidationSchema = Yup.object().shape({
        phone: Yup.string()
          .matches(phoneRegExp, 'Phone number is not valid')
          .required("Required!!")
        /*  .test('Unique Username','Username already been taken', 
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
          )  */ 
      });
      
    const setPhone = (name) => {
      store.profile.phone = name;
      localStorage.setItem("userStore", JSON.stringify(store));
    }
  
    return (
      <Formik
        initialValues={{
          phone: "",
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
                const result = await axios.patch(SAVEPHONEURL,
                  { "phone": values.phone, "id": store.current_user_id},
                  { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
                });
                console.log(JSON.stringify(result));
                if (result.data.status != "error") {
                  setPhone(values.phone);
                  values.phone =  result.data.phone;;
                  console.log("updated phone="+ store.profile.phone);
                  props.stateProps.setShowPhone(false);
                  history.push("/settings");
                  displayToast("Successfully updated phone number ✅", "success", 3000, "top-right")
                }
                else {
                console.log("printint error  message")
                console.log(result.data.message);
                setErrorMessage(result.data.message);
                displayToast("Failed to update phone number", "error", 3000, "top-right") 
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
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder={store.profile.phone}
                className={"login-form " + (touched.phone && errors.phone ? "has-error" : null)}
              />
              <Error touched={touched.phone} message={errors.phone} />
              <Error touched={touched.phone} message={errorMessage} />
            </div>
  
            <div className="input-row">
            <Button type="submit" margin="0em 0em" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="submit" margin="0em 1.5em"  onClick={handleCancelPhone}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default EditPhone;
