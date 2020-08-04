import React, {useState} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import {Formik} from 'formik';
import Error from "../LogIn/Error";
import axios from "axios";
import '../LogIn/UserSettings.scss'
import * as Yup from 'yup';
import { SAVEZIPCODEURL } from "../../constants/matcher";
import Button from '../Styled/Button';
import Input from '../Styled/Input';
import { displayToast } from '../Toast/Toast';

interface IStateProps {
  stateProps: {
    setShowZipcode: React.Dispatch<React.SetStateAction<boolean>>
  }
}


  
const EditZipcode = (props: IStateProps) => {
    const store = useDataStore();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const handleCancelZipcode = (event: React.MouseEvent) => {
      event.preventDefault();
      props.stateProps.setShowZipcode(false);
    }

    const ValidationSchema = Yup.object().shape({
        zipcode: Yup.string()
          .matches(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/, "Please enter a valid US or CA zip/postal code.")
          .required("Required"),
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
                if (result.data.status !== "error") {
                  setZipcode(values.zipcode);
                  values.zipcode =  result.data.zipcode;;
                  console.log("updated zipcodee="+ store.profile.zipcode);
                  props.stateProps.setShowZipcode(false);
                  history.push("/settings");
                  displayToast("Successfully updated zipcode ✅", "success", 3000, "top-right")
                }
                else {
                console.log("printint error  message")
                console.log(result.data.message);
                setErrorMessage(result.data.message);
                displayToast("Failed to update zipcode", "error", 3000, "top-right") 
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
                name="zipcode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipcode}
                placeholder={store.profile.zipcode}
                className={"login-form " + (touched.zipcode && errors.zipcode ? "has-error" : null)}
              />
              <Error touched={touched.zipcode} message={errors.zipcode} />
              <Error touched={touched.zipcode} message={errorMessage} />
            </div>
  
            <div className="input-row">
              <Button type="submit" margin="0em 0em" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="submit" margin="0em 1.5em"  onClick={handleCancelZipcode}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
  

export default EditZipcode;
