import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL} from "../../../constants/matcher";
import { ACTIVITY_REASONS} from "../../../constants/ProfileConstants"
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


const Q10_ReasonsActive = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  const [filled, setFilled] = useState(false);

  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/8");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/11");
  }
  return (
    <div>
      <Formik
        initialValues={{
          // About Me
          reasons: profile.exercise_reason_ids,
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

              // for every reason the user has selected (values.reasons), create an array of the ids by looking up the reason from the store. 
              const reason_ids = [] as any; 

              
              values.reasons.forEach(reasonName => {
                var rea_tuple = store.exerciseReasons.find(reason_tuples => reason_tuples['name'] === String(reasonName));
                if (typeof(rea_tuple) === 'undefined') {
                  throw "activity was undefined, major error"
                } else {
                  reason_ids.push(rea_tuple['id']);
                }
              });

              profile.exercise_reason_ids = reason_ids;
              // Saving data on server
              const res = await axios.patch(url,
                              { profile: profile },
                              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"} }
                            )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted){
                history.push("/complete-profile/8");
              } else {
                  history.push("/complete-profile/10");
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
                    <div className="question-header">Identify your top reasons for wanting to become more active</div>   
                    <div> (check all that apply) :</div>
                    <div className="question-number">10/16 Questions</div>
                    <div className="form-question-wrapper">
                      {ACTIVITY_REASONS.map(item => (
                        <div className="form-checkbox-item">
                          <Field id={item} type="checkbox" name="reasons" value={item} onClick={()=>setFilled(true)}></Field>
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
export default Q10_ReasonsActive;