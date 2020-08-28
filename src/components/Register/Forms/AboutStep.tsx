import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { useHistory, Prompt, Redirect } from 'react-router-dom';
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
import { createBrowserHistory } from 'history'

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const PromptIfDirty = () => {
  const formik = useFormikContext();
  return (
    <Prompt
      when={formik.dirty && formik.submitCount === 0}
      message="Are you sure you want to leave? You have with unsaved changes."
    />
  );
};

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

interface IAboutStep {
  editControls: {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const AboutStep: React.FC<IAboutStep> = ({ editControls }) => {
  const store = useDataStore();
  //const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });
  let profile = store.profile;

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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
          history.push("/wizard/1");
          //return <Redirect to="/wizard/1" />
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
       //   fetchData();
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
                  <PromptIfDirty />
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
export default AboutStep;