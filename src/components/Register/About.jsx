import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import './About.scss'
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS} from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import Error from "../LogIn/Error";
import styled from '@emotion/styled';
//import Input from '../Styled/Input';
import Button from '../Styled/Button';
import Textarea from '../Styled/Textarea';
import Select from '../Styled/Select';
import { displayToast } from '../Toast/Toast';
import EditProfile from '../manageProfile/EditProfile';
import AboutStep from './AboutStep';
import CancerStep from './CancerStep';
import FitnessStep from './FitnessStep';
import UploadPhoto from '../manageProfile/UploadPhoto'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  logo: {
    width: '300px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(4),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
const ValidationSchema = Yup.object().shape({
  reason_for_match: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  cancer_location: Yup.string()
    .required("Required"),
});
function getSteps() {
  return ['About Me', 'Cancer History', 'Fitness Status', 'Upload Photo', 'Confirm Email'];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AboutStep />;
    case 1:
      return <CancerStep />;
    case 2:
        return <FitnessStep />;
    case 3:
      return <UploadPhoto />;
    case 4:
      return 'Confirm Email';
    default:
      return 'Unknown step';
  }
}
export default function About() {
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollToTop();
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (

    <div className={classes.root}>
      <img src={UnsIcon} className={classes.logo} />
      <h2>Create Your Profile</h2>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button 
                margin="2em 1.5em" 
                padding="10px 20px" 
                disabled={activeStep === 0} 
                onClick={handleBack} 
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                margin="2em 1.5em" 
                padding="10px 20px"
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
 
  );
}