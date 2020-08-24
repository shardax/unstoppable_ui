import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import { useDataStore } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import Default from '../../../layouts/Default'
import * as Yup from 'yup';
import Error from "../../LogIn/Error";
import styled from '@emotion/styled';
import Input from '../../Styled/Input';
import Button from '../../Styled/Button';
import Textarea from '../../Styled/Textarea';
import Select from '../../Styled/Select';
import Paper from '../../Styled/Paper';
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { ProfileProps } from "../../../UserStore";

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

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

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

const ValidationSchema = Yup.object().shape({
  reason_for_match: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  cancer_location: Yup.string()
    .required("Required"),
});

interface IAboutStep {
  editControls: {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  }
  handleNext:{}
}

const AboutStep: React.FC<IAboutStep> = ({ editControls,handleNext }, props) => {
  const store = useDataStore();
  const history = useHistory();
  let profile = store.profile;
  const classes = useStyles();

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

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    editControls.setEditMode(false)
  }

  return (
    <div>
      <Formik
        initialValues={{
          // About Me
          personality: profile.personality,
          work_status: profile.work_status,
          details_about_self: profile.details_about_self,
        }}
        validationSchema={ValidationSchema}
        validate={values => {
          let errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);

          const fetchData = async () => {
            try {
              //alert(JSON.stringify(profile, null, 2));
              let url = PROFILEURL + "/" + store.profile.id + ".json";
              //About Me
              profile.personality = values.personality;
              profile.work_status = values.work_status;
              profile.details_about_self = values.details_about_self;
              // Saving data on server
              const res = await axios.patch(url, { profile: profile }, { withCredentials: true, headers: { "Access-Control-Allow-Origin": "*" } })
              store.profile = profile;
              console.log(JSON.stringify(res));
              editControls.setEditMode(false)
              console.log("In handleBackToView");
              history.push("/profile");
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
            } catch (err) {
              displayToast("Failed to update profile", "error", 3000, "top-right")
              if (err.response) {
                // client received an error response (5xx, 4xx)
              } else if (err.request) {
                // client never received a response, or request never left
              } else {
                // anything else
              }
            }
          };
          fetchData();
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
            <Form>
              <div className="form-container user-section-wrapper">
                <div className="user-section-data">
                  <Paper>
                    <div className="profile-section-header">About me 😀</div>
                    <div className="question-wrapper">
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
                    </div>

                    <div className="question-wrapper">
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
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="details_about_self">About Me: Use this space for anything else you would like to share.</label>
                      <div className="Answers">
                        <Field name="details_about_self" as={Textarea} placeHolder="Details about self" />
                      </div>
                    </div>
                  </Paper>
                </div>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
}
export default AboutStep;