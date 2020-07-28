import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEZIPCODEURL } from "../../constants/matcher";
import Button from '../Button/Button';
import Input from '../Input/input';

interface IStateProps {
  stateProps: {
    setShowZipcode: React.Dispatch<React.SetStateAction<boolean>>
  }
}
  
const EditZipcode = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const ValidationSchema = Yup.object().shape({
        zipcode: Yup.string()
          .min(2, "Too Short!")
          .max(255, "Too Long!")
          .required("Required!!")
      /*    .test('Unique Zipcode','Zipcode already been taken', 
              function(value){return new Promise((resolve, reject) => {        
                  axios.post(VALIDZIPCODEURL,  { "zipcode": value, "id": store.current_user_id},{ withCredentials: true,
                  headers: {
                    contentType: "application/json; charset=utf-8",
                }})
                 .then(res => {
                   if(res.data.message === 'Zipcode already been taken'){
                     console.log(res.data.message);
                     resolve(false);
                  } else {
                    console.log("User valid")
                    resolve(true);
                  }
                })
              })}
          ) */  
      });
      
   const setZipcode = (name) => {
     store.profile.zipcode = name;
     localStorage.setItem("userStore", JSON.stringify(store));
    }
  
    return (
      <Formik
        initialValues={{
          zipcode: "",
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
                const result = await axios.patch(SAVEZIPCODEURL,
                  { "zipcode": values.zipcode, "id": store.current_user_id},
                  { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
                });
                console.log(JSON.stringify(result));
                if (result.data.status != "error") {
                  setZipcode(values.zipcode);
                  values.zipcode =  result.data.zipcode;;
                  console.log("updated zipcodee="+ store.profile.zipcode);
                  props.stateProps.setShowZipcode(false);
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
                name="zipcode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipcode}
                className={"login-form " + (touched.zipcode && errors.zipcode ? "has-error" : null)}
              />
              <Error touched={touched.zipcode} message={errors.zipcode} />
              <Error touched={touched.zipcode} message={errorMessage} />
            </div>
  
            <div className="input-row">
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default EditZipcode;
