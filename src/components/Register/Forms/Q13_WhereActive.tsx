import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL} from "../../../constants/matcher";
import { PREFERRED_EXERCISE_LOCATIONS } from "../../../constants/ProfileConstants"
import Button from '../../Styled/Button';  
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../../constants/ProfileConstants";

// const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const PromptIfDirty = () => {
  const formik = useFormikContext();
  return (
    <Prompt
      when={formik.dirty && formik.submitCount === 0}
      message="Are you sure you want to leave? You have with unsaved changes."
    />
  );
};

const Q13_WhereActive = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/12");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/14");
  }
  return (
    <div>
      <Formik
        initialValues={{
          preferred_exercise_locations: [],
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 500);
          
          const fetchData = async () => {
            try {
              let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";

              // joins the array of responses from preferred_exercise_locations, excluding the beginning empty string, and assigns it to profile's exercise location value 
              profile.prefered_exercise_location = values.preferred_exercise_locations.slice(0).join(', ');

              // Saving data on server
              const res = await axios.patch(url,
                              { profile: profile },
                              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"} }
                            )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted){
                history.push("/complete-profile/12");
              } else {
                  history.push("/complete-profile/14");
              }
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
              <div className="form-container">
                  <div className="question-header">Where do you prefer to be active?</div>
                  <div className="question-number">13/16 Questions</div>
                  <div className="form-question-wrapper">
                    <div className="question-answers">
                      
                    {PREFERRED_EXERCISE_LOCATIONS.map(item => (
                      <div className="form-checkbox-item">
                        <Field id={item} type="checkbox" name="preferred_exercise_locations" value={item}></Field>
                        <label htmlFor={item}>{item + " "}</label>
                      </div>
                    ))}

                      {/* <Field
                        as={Select}
                        id="personality"
                        name="personality"
                      >
                        <option value="" label="- Select One -" />
                        {PERSONALITY_DESCRIPTION.map(item => (<option key={item} value={item}>	{item}</option>))}
                      </Field> */}
                    </div>
                  </div>
                
                  <PromptIfDirty />
                  <Button disabled={isSubmitting}>
                      Save &amp; Continue
                  </Button>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
}
export default Q13_WhereActive;