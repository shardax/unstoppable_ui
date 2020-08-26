import { Box, Card, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

import { useDataStore } from "../../UserContext";
import { useHistory } from 'react-router-dom';
import { PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../constants/ProfileConstants"
import UnsIcon from '../../images/2Unstoppable_logo.png';
import './About.scss';

import Select from '../Styled/Select';
import Textarea from '../Styled/Textarea';
import Error from "../LogIn/Error";
import Input from '../Styled/Input';
import Paper from '../Styled/Paper';
import Button from '../Styled/Button';
import colors from '../../assets/colors';

import UploadPhoto from '../manageProfile/UploadPhoto'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id || false}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={"radio-button"}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const aboutValidate = Yup.object().shape({
  personality: Yup.string()
    .required("Required"),
  work_status: Yup.string()
    .required("Required"),
  details_about_self: Yup.string()
    .required("Required"),
});

const cancerValidate = Yup.object().shape({
  cancer_location: Yup.string()
    .required("Required"),
  treatment_status: Yup.string()
    .required("Required"),
  treatment_description: Yup.string()
    .required("Required"),
  which_wellness_program: Yup.string(),
});

const fitnessValidate = Yup.object().shape({
  /*activity_ids: Yup.string()
    .required("Required"),*/
  virtual_partner: Yup.string()
    .required("Required"),
  fitness_level: Yup.string()
    .required("Required"),
  /*exercise_reason_ids: Yup.string()
    .required("Required"),*/
  prefered_exercise_location: Yup.string()
    .required("Required"),
  prefered_exercise_time: Yup.string()
    .required("Required"),
});

export default function Home() {
  const store = useDataStore();
  const history = useHistory();
  let profile = store.profile;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  let stringActivities: { id: string, name: string }[] = Object.keys(store.activities).map(function (key) {
    const id = store.activities[key].id.toString()
    const name = store.activities[key].name.toString();
    return ({ id, name });
  });
  let stringReasons: { id: string, name: string }[] = Object.keys(store.exerciseReasons).map(function (key) {
    const id = store.exerciseReasons[key].id.toString()
    const name = store.exerciseReasons[key].name.toString();
    return ({ id, name });
  });

  return (
    <div className="container">
      <img src={UnsIcon} className="logo" />
      <h2><b>Complete Your Profile</b></h2>
      <Paper className="instructions">
        <FormikStepper
          initialValues={{
            /*activity_ids: '',*/
            other_favorite_activities: '',
            virtual_partner: false,
            fitness_level: '',
            /*exercise_reason_ids: '',*/
            prefered_exercise_location: '',
            prefered_exercise_time: '',
            reason_for_match: '',
            personality: '',
            work_status: '',
            details_about_self: '',
            //Cancer History
            cancer_location: '',
            other_cancer_location: '',
            treatment_status: '',
            treatment_description: '',
            part_of_wellness_program: '',
            part_of_wellness_string: '',
            which_wellness_program: ''
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >
          <FormikStep
            label="About Me"
            validationSchema={aboutValidate}
          >
            <Box paddingBottom={2}>
              <label htmlFor="personality">How would you describe your personality?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="personality"
                  name="personality"
                >
                  <option value="" label="- Select One -" />
                  {PERSONALITY_DESCRIPTION.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box paddingBottom={2}>
              <label htmlFor="work_status">Which of the following best describes your work situation?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="work_status"
                  name="work_status"
                >
                  <option value="" label="- Select One -" />
                  {WORK_STATUS_DESCRIPTIONS.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box paddingBottom={2}>
              <label htmlFor="details_about_self">About Me: Use this space for anything else you would like to share.</label>
              <div className="Answers">
                <Field name="details_about_self" as={Textarea} placeHolder="Details about self" />
              </div>
            </Box>
          </FormikStep>

          {/*Cancer Step*/}
          <FormikStep
            label="Cancer History"
            validationSchema={cancerValidate}
          >
            <Box paddingBottom={2}>
              <label htmlFor="cancer_location">What was your primary cancer diagnosis?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="cancer_location"
                  name="cancer_location"
                >
                  <option value="" label="- Select One -" />
                  {CANCERLOCATIONLIST.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box paddingBottom={2}>
              <label htmlFor="other_cancer_location">Additional Cancer Information (e.g., stage, year diagnosed, DCIS, TNBC):  </label>
              <div className="Answers">
                <Field name="other_cancer_location" as={Textarea} placeHolder="Additional Cancer Information" rows={2} cols={50} />
              </div>
            </Box>
            <Box paddingBottom={2}>
              <label htmlFor="treatment_status">Which of the following best describes you?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="treatment_status"
                  name="treatment_status"
                >
                  {TREATMENT_STATUS_DESCRIPTIONS.map(item => (<option key={item} value={item}> {item}</option>))}
                </Field>
              </div>
            </Box>
            <Box>
              <label htmlFor="treatment_description">Please briefly describe your cancer treatments: </label>
              <div className="Answers">
                <Field name="treatment_description" as={Textarea} placeHolder="Treatment description" rows={2} cols={50} />
              </div>
            </Box>
            <Box>
              <label htmlFor="part_of_wellness_program">Have you ever been part of a support group or wellness program following your cancer diagnosis?:</label>
              <Field
                component={RadioButton}
                name="part_of_wellness_string"
                id="Yes"
                label="Yes"
              />
              <Field
                component={RadioButton}
                name="part_of_wellness_string"
                id="No"
                label="No"
              />
            </Box>
            <Box>
              <label htmlFor="which_wellness_program">If yes, what program? (list the name and location if possible, for example: INOVA Life with Cancer-Breast Cancer Support Group, Fairfax): </label>
              <Field name="which_wellness_program" as={Input} placeoHlder="Which wellness program" />
            </Box>
          </FormikStep>

          {/*Fitness Step*/}
          <FormikStep
            label="Fitness Status"
            validationSchema={fitnessValidate}
          >
            {/*<Box paddingBottom={2}>
              <div className="question-title">
                Favorite activities (check all that apply)
              </div>
              <div className="Answers">
                {stringActivities.map(item => (
                  <label>
                    {item.name + " "}
                    <Field id={item.id} type="checkbox" name="activity_ids" value={item.id}>
                    </Field>&nbsp;&nbsp;&nbsp;
                  </label>
                ))}
              </div>
                </Box>*/}
            <Box paddingBottom={2}>
              <div className="question-title">
                Do you have any other favorite activities?
            </div>
              <label>
                <Input name="other_favorite_activities" placeholder="Enter any other favorite activity" />
              </label>
            </Box>
            <Box paddingBottom={2}>
              <label htmlFor="fitnessLevel">How would you describe your current fitness level?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="fitness_level"
                  name="fitness_level"
                >
                  <option value="" label="- Select One -" />
                  {FITNESS_LEVEL_DESCRIPTIONS.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box>
              <div className="question-title">
                Would you like a virtual partner?
            </div>

              <Field
                component={RadioButton}
                name="virtual_partner"
                id="Yes"
                label="Yes"
              />
              <Field
                component={RadioButton}
                name="virtual_partner"
                id="No"
                label="No"
              />
            </Box>
            {/*<Box>
              <div className="question-title">
                Identify your top reasons for wanting to become more active:
            </div>
              <div className="Answers">
                <label>
                  {stringReasons.map(item => (<label> {item.name} <Field type="checkbox" name="exercise_reason_ids" value={item.id}></Field>&nbsp;&nbsp;&nbsp; </label>))}
                </label>
              </div>
            </Box>*/}
            <Box>
              <label htmlFor="prefered_exercise_location">Where do you prefer to be active?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="prefered_exercise_location"
                  name="prefered_exercise_location"
                >
                  <option value="" label="- Select One -" />
                  {PREFERRED_EXERCISE_LOCATIONS.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box>
              <label htmlFor="prefered_exercise_time">When do you prefer to be active?</label>
              <div className="Answers">
                <Field
                  as={Select}
                  id="prefered_exercise_time"
                  name="prefered_exercise_time"
                >
                  <option value="" label="- Select One -" />
                  {PREFERRED_TIME_DESCRIPTIONS.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
              </div>
            </Box>
            <Box>
              <label htmlFor="reason_for_match">What is the main reason you want to be matched with an exercise partner?  </label>
              <div className="Answers">
                <Field name="reason_for_match" as={Textarea} placeHolder="Reason for Matching With Partner" />
              </div>
            </Box>
          </FormikStep>
          <FormikStep
            label="Upload Photo"
          >
            <UploadPhoto />
          </FormikStep>
          <FormikStep
            label="Confirm Email"
          >
            <h3> An Email has been sent to your mailbox for a confirmation.</h3>
          </FormikStep>
        </FormikStepper>
      </Paper>
    </div>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const isStepOptional = (step: number) => {
    return step === 3;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  margin="2em 1.5em"
                  padding="10px 20px"
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            {isStepOptional(step) && (
              <Grid item>
              <Button
                margin="2em 1.5em"
                padding="10px 20px"
              >
                Skip
              </Button>
            </Grid>
            )}
            <Grid item>
              <Button
                margin="2em 1.5em"
                padding="10px 20px"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}