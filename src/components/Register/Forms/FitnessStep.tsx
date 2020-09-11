import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import { useDataStore } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import Default from '../../../layouts/Default'
import * as Yup from 'yup';
import Error from "./Error";
import styled from '@emotion/styled';
import Input from '../../Styled/Input';
import Button from '../../Styled/Button';
import Textarea from '../../Styled/Textarea';
import Select from '../../Styled/Select';
import Paper from '../../Styled/Paper';
import './Steps.scss'
import './EditProfile.scss'
import { displayToast } from '../../Toast/Toast';
import { ProfileProps } from "../../../UserStore";
import { createBrowserHistory } from 'history'


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
});

interface IFitnessStep {
  editControls: {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const FitnessStep: React.FC<IFitnessStep> = ({ editControls }) => {
  const store = useDataStore();
  //const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });
  let profile = store.profile;

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
          activity_ids: profile.activity_ids.map(String),
          other_favorite_activities: profile.other_favorite_activities,
          virtual_partner: profile.virtual_partner ? "Yes" : "No",
          fitness_level: profile.fitness_level,
          exercise_reason_ids: profile.exercise_reason_ids.map(String),
          prefered_exercise_location: profile.prefered_exercise_location,
          prefered_exercise_time: profile.prefered_exercise_time,
          reason_for_match: (profile.reason_for_match === null) ? "" : profile.reason_for_match,
        }}
        validationSchema={ValidationSchema}
        validate={values => {
          let errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //setSubmitting(true);
         // setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));
            //resetForm();
           // setSubmitting(false);
          //}, 500);
          

          const fetchData = async () => {
            try {
              //alert(JSON.stringify(profile, null, 2));
              let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";
              //About Me
              profile.activity_ids = values.activity_ids.map(Number);
              profile.other_favorite_activities = values.other_favorite_activities;
              profile.virtual_partner = (values.virtual_partner == "Yes") ? true : false
              profile.fitness_level = values.fitness_level;
              profile.exercise_reason_ids = values.exercise_reason_ids.map(Number);
              profile.prefered_exercise_location = values.prefered_exercise_location;
              profile.prefered_exercise_time = values.prefered_exercise_time;
              profile.reason_for_match = values.reason_for_match;
              // Saving data on server
              const res = await axios.patch(url, 
                                      { profile: profile }, 
                                      { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}}
                                    )
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              history.push("/wizard/3");
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
                    <div className="profile-section-header">Activity/Fitness</div>
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

                    <div className="question-wrapper">
                      <div className="question-title">
                        Do you have any other favorite activities?
            </div>
                      <label>
                        <Input name="other_favorite_activities" placeholder="Enter any other favorite activity" />
                      </label>
                    </div>

                    <div className="question-wrapper">
                      <div className="question-title">
                        <label htmlFor="fitnessLevel">How would you describe your current fitness level?</label>
                      </div>
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
                    </div>

                    <div className="question-wrapper">
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
                    </div>

                    <div className="question-wrapper">
                      <div className="question-title">
                        Identify your top reasons for wanting to become more active:
            </div>
                      <div className="Answers">
                        <label>
                          {stringReasons.map(item => (<label> {item.name} <Field type="checkbox" name="exercise_reason_ids" value={item.id}></Field>&nbsp;&nbsp;&nbsp; </label>))}
                        </label>
                      </div>
                    </div>

                    <div className="question-wrapper">
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
                    </div>

                    <div className="question-wrapper">
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
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="reason_for_match">What is the main reason you want to be matched with an exercise partner?  </label>
                      <div className="Answers">
                        <Field name="reason_for_match" as={Textarea} placeHolder="Reason for Matching With Partner" />
                        {/* <Input></Input> */}
                        <Error touched={touched.reason_for_match} message={errors.reason_for_match} />
                      </div>
                    </div>
                  </Paper>
                  <Button margin="2em 0em" padding="10px 20px" disabled={isSubmitting}>
                     Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
}
export default FitnessStep;