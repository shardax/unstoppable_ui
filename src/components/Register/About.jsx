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
import Input from '../Styled/Input';
import Button from '../Styled/Button';
import Textarea from '../Styled/Textarea';
import Select from '../Styled/Select';
import { displayToast } from '../Toast/Toast';
import EditProfile from '../manageProfile/EditProfile';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
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
  return ['About Me', 'Cancer History', 'Upload Photo', 'Confirm Email'];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <EditProfile />;
    case 1:
      return 'Cancer History';
    case 2:
      return 'Upload Photo';
    case 3:
      return 'Confirm Email';
    default:
      return 'Unknown step';
  }
}
export default function About() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <img src={UnsIcon} className="logo" />
      <h1>Create Your Profile</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
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
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
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