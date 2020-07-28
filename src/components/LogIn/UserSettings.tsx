import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { ProfileStore, ProfileProps } from '../../UserStore';
import EditUsername from '../Auth/EditUsername';
import EditEmail from '../Auth/EditEmail';
import EditZipcode from '../Auth/EditZipcode';
import { useFormik } from 'formik';
import axios from "axios";
import {useObserver} from 'mobx-react'
import { PROFILEURL, ROOTURL, SAVEUSERNAMEURL, VALIDUSERNAMEURL} from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
//import {PrintUserInfo, DisplayProfileActivityNames, DisplayExerciseReasons} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './UserSettings.scss'
import * as Yup from 'yup';
import Input from '../Input/input';
import Button from '../Button/Button'


const UserSettings = (props: ProfileProps) => {
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
 
  const profile = props.profile;
 
  

  

  const setUsername = (name) => {
    store.username = name;
    localStorage.setItem("userStore", JSON.stringify(store));
  }
  const handleEditEmail = (event: React.MouseEvent) => {
   event.preventDefault();
   setShowEmail(!showEmail);
  }
   const handleEditUsername = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowUsername(!showUsername);
   }
   const handleEditPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
   }
   const handleEditDOB = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDOB(!showDOB);
   }
   const handleEditZipcode = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowZipcode(!showZipcode);
   }

   const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
   // editControls.setEditMode(false)
  }

   const EditEmail1 = () => {
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
        <h5>Email: </h5>
        <div className="account-settings-field-row">
            {!showEmail &&
              <span style={{fontSize: "18px"}}>
                {store.email}
              </span>
            }
            { showEmail && 
              <Input 
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              />
            }
          {!showEmail &&
            <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditEmail}>
              Edit
            </Button>
          }
          { showEmail &&
            <Button type="submit">Save</Button>
          }
        </div>
    </form>
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
      <p>Password: </p>
      <div className="account-settings-field-row">
        {!showPassword &&
          <span style={{fontSize: "18px"}}>
            ***********
          </span>
        }
        {showPassword && 
          <Input 
            type="text"
            name="currentpassword"
            placeholder="Current password"
            onChange={formik.handleChange}
            value={formik.values.currentpassword}
          />
        }
          <div>
            { showPassword && 
              <Input 
              type="text"
              name="newpassword"
              placeholder="New Password"
              onChange={formik.handleChange}
              value={formik.values.newpassword}
              />
            }
            { showPassword && 
              <Input 
              type="text"
              name="confirmnewpassword"
              placeholder="Confirm New Password"
              onChange={formik.handleChange}
              value={formik.values.confirmnewpassword}
              />
            }
          </div>
        <div>
          {!showPassword &&
            <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditPassword}>
              Edit
            </Button>
          }
          { showPassword &&
            <Button type="submit">
              Save</Button>
          }
        </div>
      </div>
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
    return (
      <form onSubmit={formik.handleSubmit}>
        <h5>Date of Birth: </h5>
        <div className="account-settings-field-row">
          {!showDOB &&
            <span style={{fontSize: "18px"}}>
              {store.profile.dob}
            </span>
          }
          <div>
            { showDOB && 
              <Input 
              type="text"
              name="DOB"
              onChange={formik.handleChange}
              value={formik.values.DOB}
              />
            }
            {!showDOB &&
              <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditDOB}>
                Edit
              </Button>
            }
            { showDOB &&
              <Button type="submit">
                Save</Button>
            }
          </div>
        </div>
      </form>
    )
  }

   const EditZipcode1 = () => {
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
        <h6>Zipcode: </h6>
        <div className="account-settings-field-row">
            {!showZipcode &&
              <span style={{fontSize: "18px"}}>
                {store.profile.zipcode}
              </span>
            }
            { showZipcode && 
              <Input 
              type="text"
              name="zipcode"
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              />
            }
          {!showZipcode &&
            <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditZipcode}>
              Edit
            </Button>
          }
          { showZipcode &&
            <Button type="submit">
              Save
            </Button>
          }
      </div>
    </form>
    )
   }
   

  return (
    <Default>
      <div className="Values">
        <h3>Account Settings</h3>
        <hr></hr>
        <div>
          <h5>Email: </h5>
          <div className="account-settings-field-row">
            {!showEmail &&
              <span style={{fontSize: "18px"}}>
                {store.email}
              </span>
            }
            {!showEmail &&
              <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditEmail}>
                Edit
              </Button>
            }
            { showEmail &&
              <EditEmail stateProps={{setShowEmail}}/>
            }
            </div>
        </div>
        <hr></hr>
        <div>
          <h5>Username: </h5>
          <div className="account-settings-field-row">
            {!showUsername &&
              <span style={{fontSize: "18px"}}>
                {store.username}
              </span>
            }
            {!showUsername &&
              <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditUsername}>
                Edit
              </Button>
            }
            { showUsername &&
              <EditUsername stateProps={{setShowUsername}}/>
            }
            </div>
        </div>
        <hr></hr>
        <EditPassword/>
        <hr></hr>
        <EditDOB/>
        <hr></hr>
        <div>
          <h5>Zipcode: </h5>
          <div className="account-settings-field-row">
            {!showZipcode &&
              <span style={{fontSize: "18px"}}>
                {store.profile.zipcode}
              </span>
            }
            {!showZipcode &&
              <Button fontSize="12px" padding="0px 6px" margin="0px 4px" background="white" color="#6429B9" border="1px solid #6429B9" onClick={handleEditZipcode}>
                Edit
              </Button>
            }
            { showZipcode &&
              <EditZipcode stateProps={{setShowZipcode}}/>
            }
            </div>
        </div>
      </div>
    </Default>
  );   
}
export default UserSettings;
  