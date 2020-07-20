import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { ProfileStore, ProfileProps } from '../../UserStore';
import { useFormik, Formik } from 'formik';
import axios from "axios";
import {useObserver} from 'mobx-react'
import {PROFILEURL, ROOTURL} from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
//import {PrintUserInfo, DisplayProfileActivityNames, DisplayExerciseReasons} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './UserSettings.scss'
import * as Yup from 'yup';
import Error from "./Error";


const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});


const UserSettings = () => {
  const store = useDataStore();
  const history = useHistory();
  const [showEmail, setShowEmail] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDOB, setShowDOB] = useState(false);
  const [showZipcode, setShowZipcode] = useState(false);
  const [changeEmail, setChangeEmail] = useState(store.email);
  const [changeUsername, setChangeUsername] = useState(store.username);
  const [changeDOB, setChangeDOB] = useState(store.profile.dob);
  const [changeZipcode, setChangeZipcode] = useState(store.profile.zipcode);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 
 
  useEffect(() => {

   // Gte user data from Server



  }, [])

  const setUsername = (name) => {
    store.username = name;
    localStorage.setItem("userStore", JSON.stringify(store));
  }
  const handleEditEmail = (event) => {
   event.preventDefault();
   setShowEmail(!showEmail);
  }
   const handleEditUsername = (event) => {
    event.preventDefault();
    setShowUsername(!showUsername);
   }
   const handleEditPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
   }
   const handleEditDOB = (event) => {
    event.preventDefault();
    setShowDOB(!showDOB);
   }
   const handleEditZipcode = (event) => {
    event.preventDefault();
    setShowZipcode(!showZipcode);
   }

   const EditEmail = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        setShowEmail(!showEmail);
      },
    });
    return(
      <form onSubmit={formik.handleSubmit}>
      <table>
      <tr>
        <td>
          <h5><b>Email: </b></h5>
        </td>
        <td>
            {!showEmail &&
              <div style={{fontSize: 20}}>
              {store.email}
              </div>
            }
            { showEmail && 
              <input 
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              />
            }
        </td>
        <td>
          {!showEmail &&
            <button className="editButton" onClick={handleEditEmail}>
                  Edit
            </button>
          }
          { showEmail &&
            <button type="submit">Save</button>
          }
        </td>
      </tr>
    </table>
    </form>
    )
   }

   const EditUsername = () => {

    return (
    <Formik
    initialValues={{
      username: "",
      password: ""
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
        setShowUsername(!showUsername);
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
       { errorMessage && <h3 className="error"> { errorMessage } </h3> }
      <table>
      <tr>
        <td>
          <h5><b>Username: </b></h5>
        </td>
        <td>
            {!showUsername &&
              <div style={{fontSize: 20}}>
              {store.username}
              </div>
            }
            { showUsername && 
              <input 
              type="text"
              name="username"
              onChange={handleChange}
              value={values.username}
              className={"global-input login-form " + (touched.username && errors.username ? "has-error" : null)}
              />
            } 
            <Error touched={touched.username} message={errors.username} />
        </td>
        <td>
          {!showUsername &&
            <button className="editButton" onClick={handleEditUsername}>
                  Edit
            </button>
          }
          { showUsername &&
            <button type="submit"  disabled={isSubmitting}>
              Save
            </button>
          }
        </td>
      </tr>
    </table>
    </form>
      )}
    </Formik>
    )
   }
   

   const EditPassword = () => {
    const formik = useFormik({
      initialValues: {
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        setShowPassword(!showPassword);
      },
    });
    return(
      <form onSubmit={formik.handleSubmit}>
      <table>
      <tr>
        <td>
          <h5><b>Password: </b></h5>
        </td>
        <td>
            {!showPassword &&
              <div style={{fontSize: 20}}>
               <h5><b>XXXXXXXX</b></h5>
              </div>
            }
            {showPassword && 
              <input 
              type="text"
              name="currentpassword"
              placeholder="Current password"
              onChange={formik.handleChange}
              value={formik.values.currentpassword}
              />
            }
            { showPassword && 
              <input 
              type="text"
              name="newpassword"
              placeholder="New Password"
              onChange={formik.handleChange}
              value={formik.values.newpassword}
              />
            }
            { showPassword && 
              <input 
              type="text"
              name="confirmnewpassword"
              placeholder="Confirm New Password"
              onChange={formik.handleChange}
              value={formik.values.confirmnewpassword}
              />
            }
        </td>
        <td>
          {!showPassword &&
            <button className="editButton" onClick={handleEditPassword}>
                  Edit
            </button>
          }
          { showPassword &&
            <button type="submit">
              Save</button>
          }
        </td>
      </tr>
    </table>
    </form>
    )
   }

   const EditDOB = () => {
    const formik = useFormik({
      initialValues: {
        DOB: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        setShowDOB(!showDOB);
      },
    });
    return(
      <form onSubmit={formik.handleSubmit}>
      <table>
      <tr>
        <td>
          <h5><b>Date of Birth: </b></h5>
        </td>
        <td>
            {!showDOB &&
              <div style={{fontSize: 20}}>
              {store.profile.dob}
              </div>
            }
            { showDOB && 
              <input 
              type="text"
              name="DOB"
              onChange={formik.handleChange}
              value={formik.values.DOB}
              />
            }
        </td>
        <td>
          {!showDOB &&
            <button className="editButton" onClick={handleEditDOB}>
                  Edit
            </button>
          }
          { showDOB &&
            <button type="submit">
              Save</button>
          }
        </td>
      </tr>
    </table>
    </form>
    )
   }

   const EditZipcode = () => {
    const formik = useFormik({
      initialValues: {
        zipcode: '',
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        setShowZipcode(!showZipcode);
      },
    });
    return(
      <form onSubmit={formik.handleSubmit}>
      <table>
      <tr>
        <td>
          <h5><b>Zipcode: </b></h5>
        </td>
        <td>
            {!showZipcode &&
              <div style={{fontSize: 20}}>
              {store.profile.zipcode}
              </div>
            }
            { showZipcode && 
              <input 
              type="text"
              name="zipcode"
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              />
            }
        </td>
        <td>
          {!showZipcode &&
            <button className="editButton" onClick={handleEditZipcode}>
                  Edit
            </button>
          }
          { showZipcode &&
            <button type="submit">
              Save</button>
          }
        </td>
      </tr>
    </table>
    </form>
    )
   }
   

  return (
    <Default>
        <div>
          <React.Fragment>
            <CssBaseline />
              <Container maxWidth="xl"> 
                <div className="profile-box">
                  <table className="header">
                      <tr>
                        <td>
                          <h1> Account Settings </h1>
                      </td>
                      </tr>
                    </table>
                </div>     
                <div className="Values">
                  <EditEmail/>
                  <EditUsername/>
                  <EditPassword/>
                  <EditDOB/>
                <EditZipcode/> 
               </div>

              </Container>
         </React.Fragment> 
        </div>
    </Default>
      );   
}
export default UserSettings;
  