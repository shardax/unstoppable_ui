import React, { useState } from "react";
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
const required = value => (value ? undefined : "Required");
const store = useDataStore();
const history = useHistory();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var profile = store.profile;

const ValidationSchema = Yup.object().shape({
    reason_for_match: Yup.string()
      .min(1, "Too Short!")
      .max(255, "Too Long!")
      .required("Required"),
    cancer_location: Yup.string()
      .required("Required"),
  });
// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  let stringActivities= Object.keys(store.activities).map(function (key) {
    const id = store.activities[key].id.toString()
    const name = store.activities[key].name.toString();
    return ({ id, name});
  });
  let stringReasons=Object.keys(store.exerciseReasons).map(function (key) {
    const id = store.exerciseReasons[key].id.toString()
    const name = store.exerciseReasons[key].name.toString();
    return ({ id, name});
  });

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {formik => (
        <Form>
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

const About = (values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue) => (
  <div>
    <h1>Unstoppable About Me Questions</h1>
    <Wizard
      initialValues={{
        reason_for_match: "",
        cancer_location: "",
      }}
      onSubmit={async values =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
      <WizardStep
        onSubmit={() => console.log("Step1 onSubmit")}
        validationSchema={ValidationSchema}
      >
        <div>
          <label htmlFor="reason_for_match">What is the main reason you want to be matched with an exercise partner?  </label>
            <div className="Answers">
            <Field 
                name="reason_for_match"  
                as={Textarea} 
                placeHolder="Reason for Matching With Partner" />
            {/* <Input></Input> */}
            {/*<Error touched={touched.reason_for_match} message={errors.reason_for_match} />*/}
            </div>
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Step2 onSubmit")}
        validationSchema={ValidationSchema}
      >
        <div>
        <label htmlFor="cancer_location">What was your primary cancer diagnosis?</label>
          <div className="Answers">
          <Field
            as={Select}
            id="cancer_location"
            name="cancer_location"
          >
          <option value="" label="- Select One -" />
          {CANCERLOCATIONLIST.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          {/*<Error touched={touched.cancer_location} message={errors.cancer_location} />*/}
          </div>
        </div>
      </WizardStep>
    </Wizard>
  </div>
);

export default About;