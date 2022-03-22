import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL} from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION, ACTIVITY_IDS } from "../../../constants/ProfileConstants"
import Button from '../../Styled/Button'; 
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../../constants/ProfileConstants";

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


const Q9_FavoriteActivities = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  const [filled, setFilled] = useState(false);

  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/7");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/10");
  }
  return (
    <div>
      <Formik
        initialValues={{
          activities: profile.activity_ids,
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
              console.log(profile.activity_ids);
              
              // for every activity the user has selected (values.activity_ids), create an array of the ids by looking up the activity from the store. 
              
              const activity_ids = [] as any; 

              values.activities.forEach(activityName => {
                var act_tuple = store.activities.find(activity_tuples => activity_tuples['name'] === String(activityName));
                if (typeof(act_tuple) === 'undefined') {
                  throw "activity was undefined, major error"
                } else {
                  activity_ids.push(act_tuple['id']);
                }
              });

              profile.activity_ids = activity_ids;

              // Saving data on server
              const res = await axios.patch(url,
                              { profile: profile },
                              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"} }
                            )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted){
                history.push("/complete-profile/7");
              } else {
                  history.push("/complete-profile/9");
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
                <div className="user-section-data">
                    <div className="question-header"> Favorite activities (check all that apply):</div>
                    <div className="question-number">9/16 Questions</div>
                    <div className="form-question-wrapper">
                      {ACTIVITY_IDS.map(item => (
                        <div className="form-checkbox-item">
                          <Field id={item} type="checkbox" name="activities" value={item} onClick={()=>setFilled(true)}></Field>
                          <label htmlFor={item}>{item + " "}</label>
                        </div>
                      ))}
                    </div>
                  
                    <PromptIfDirty />

                    <Button id="prev" margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}  
                    onClick={(e)=>{setPrevSubmitted(true)}}>
                      Prev
                    </Button>

                    <Button margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}>
                        Next
                    </Button>

                </div>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
}
export default Q9_FavoriteActivities;