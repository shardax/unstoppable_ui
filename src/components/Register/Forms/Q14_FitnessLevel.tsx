import React, { useState, useEffect } from "react";
import { Formik, Field, Form, useFormikContext  } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL} from "../../../constants/matcher";
import { FITNESS_LEVEL_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import Error from "../../LogIn/Error";
import Button from '../../Styled/Button';   
import Select from '../../Styled/Select';
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


const Q14_FitnessLevel = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  const [filled, setFilled] = useState(false);
  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/13");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/15");
  }
  return (
    <div>
      <Formik
        initialValues={{
          cancer_location: (profile.cancer_location === null) ? "" : profile.cancer_location,
          fitness_level : profile.fitness_level, 
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
              
              profile.cancer_location = values.cancer_location;
              profile.fitness_level = values.fitness_level; 

              // Saving data on server
              const res = await axios.patch(url,
                              { profile: profile },
                              { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"} }
                            )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted){
                history.push("/complete-profile/13");
              } else {
                  history.push("/complete-profile/15");
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

                    <div className="question-header">How would you describe your current fitness level?</div>
                    <div className="question-number">14/17 Questions</div>
                    <div className="form-question-wrapper">
                        <div className="Answers">
                            <Field
                                as={Select}
                                id="fitness_level"
                                name="fitness_level"
                                onClick={()=>setFilled(true)}
                            >
                                <option value="" label="- Select One -" />
                                {FITNESS_LEVEL_DESCRIPTIONS.map(item => (<option key={item} value={item}>	{item}</option>))}
                            </Field>
                            <Error touched={touched.fitness_level} message={errors.fitness_level} />
                        </div>
                    </div>
                    <PromptIfDirty />

                    <Button id="prev" margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}  
                    onClick={(e)=>{setPrevSubmitted(true)}}>
                      Prev
                    </Button>

                    <Button margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting || !filled}>
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
export default Q14_FitnessLevel;