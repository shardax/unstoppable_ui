import React, {useState, useEffect} from "react";
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS} from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import Error from "../LogIn/Error";
import './EditProfile.scss'
import styled from '@emotion/styled';
//import Input from '../Styled/input';
import Input from '../Styled/Input';
import Button from '../Styled/Button';
import Textarea from '../Styled/Textarea';
import Select from '../Styled/Select';
import Paper from '../Styled/Paper';
import UploadPhoto from './UploadPhoto'
//import UploadPhoto from './UploadPhoto.js'

import { displayToast } from '../Toast/Toast';
import { ProfileProps } from "../../UserStore";



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

interface IEditProfile {
  editControls: {
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const EditProfile: React.FC<IEditProfile> = ({editControls}) => { 
  const store = useDataStore();
  const history = useHistory();
  let profile = store.profile;

  let stringActivities: { id: string, name: string }[] = Object.keys(store.activities).map(function (key) {
    const id = store.activities[key].id.toString()
    const name = store.activities[key].name.toString();
    return ({ id, name});
  });
  let stringReasons: { id: string, name: string }[] = Object.keys(store.exerciseReasons).map(function (key) {
    const id = store.exerciseReasons[key].id.toString()
    const name = store.exerciseReasons[key].name.toString();
    return ({ id, name});
  });

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    editControls.setEditMode(false)
  }

  return(
  
  <div>
    <Formik
      initialValues={{
        // About Me
        activity_ids: profile.activity_ids.map(String),
        other_favorite_activities: profile.other_favorite_activities,
        virtual_partner: profile.virtual_partner ? "Yes":"No",
        fitness_level: profile.fitness_level,
        exercise_reason_ids: profile.exercise_reason_ids.map(String),
        prefered_exercise_location: profile.prefered_exercise_location,
        prefered_exercise_time: profile.prefered_exercise_time,
        reason_for_match: profile.reason_for_match,
        personality: profile.personality,
        work_status: profile.work_status,
        details_about_self: profile.details_about_self,
        //Cancer History
        cancer_location: profile.cancer_location,
        other_cancer_location: profile.other_cancer_location,
        treatment_status: profile.treatment_status,
        treatment_description:profile.treatment_description,
        part_of_wellness_program: (profile.part_of_wellness_program),
        part_of_wellness_string: profile.part_of_wellness_program ? "Yes":"No",
        which_wellness_program: profile.which_wellness_program,
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
            let url = PROFILEURL + "/"  + store.profile.id + ".json" ;
            //About Me
            profile.activity_ids = values.activity_ids.map(Number);
            profile.other_favorite_activities = values.other_favorite_activities;
            profile.virtual_partner = (values.virtual_partner == "Yes")? true:false
            profile.fitness_level = values.fitness_level;
            profile.exercise_reason_ids = values.exercise_reason_ids.map(Number);
            profile.prefered_exercise_location = values.prefered_exercise_location;
            profile.prefered_exercise_time = values.prefered_exercise_time;
            profile.reason_for_match = values.reason_for_match;
            profile.personality = values.personality;
            profile.work_status = values.work_status;
            profile.details_about_self = values.details_about_self;
            //Cancer History
            profile.cancer_location = values.cancer_location;
            profile.other_cancer_location = values.other_cancer_location;
            profile.treatment_status = values.treatment_status;
            profile.treatment_description = values.treatment_description;
            profile.part_of_wellness_program = (values.part_of_wellness_string == "Yes")? true:false
            profile.which_wellness_program = values.which_wellness_program;
            // Saving data on server
            const res = await axios.patch(url, { profile: profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} )
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
                    {PERSONALITY_DESCRIPTION.map(item => (<option key={item}	value={item}>	{item}</option>	))}
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
                  {WORK_STATUS_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
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
            <Paper>
          <div className="profile-section-header">Details about Diagnosis</div>
          <div className="question-wrapper">
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
          <Error touched={touched.cancer_location} message={errors.cancer_location} />
          </div>
          </div>

          <div className="question-wrapper">
            <label htmlFor="other_cancer_location">Additional Cancer Information (e.g., stage, year diagnosed, DCIS, TNBC):  </label>
            <div className="Answers">
            <Field name="other_cancer_location" as={Textarea} placeHolder="Additional Cancer Information" rows={2} cols={50}/>
          </div>
          </div>

          <div className="question-wrapper">
          <label htmlFor="treatment_status">Which of the following best describes you?</label>
          <div className="Answers">
          <Field
            as={Select}
            id="treatment_status"
            name="treatment_status"
          >
          {TREATMENT_STATUS_DESCRIPTIONS.map(item => (<option key={item}  value={item}> {item}</option> ))}
          </Field>
          </div>
          </div>


          <div className="question-wrapper">
            <label htmlFor="treatment_description">Please briefly describe your cancer treatments: </label>
            <div className="Answers">
            <Field name="treatment_description" as={Textarea} placeHolder="Treatment description" rows={2} cols={50}/>
          </div>
          </div>

          <div className="question-wrapper">
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
          </div>  
            <div>
              <div className="question-wrapper">
                <label htmlFor="which_wellness_program">If yes, what program? (list the name and location if possible, for example: INOVA Life with Cancer-Breast Cancer Support Group, Fairfax): </label>
                <Field  name="which_wellness_program" as={Input} placeoHlder="Which wellness program" />
              </div> 
            </div>
            </Paper>

            
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
              {FITNESS_LEVEL_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
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
                {stringReasons.map(item => (<label> {item.name} <Field type="checkbox" name="exercise_reason_ids" value={item.id}></Field>&nbsp;&nbsp;&nbsp; </label>	)  )}
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
              {PREFERRED_EXERCISE_LOCATIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
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
              {PREFERRED_TIME_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
              </Field>
            </div>
          </div>

          <div className="question-wrapper">
            <label htmlFor="reason_for_match">What is the main reason you want to be matched with an exercise partner?  </label>
            <div className="Answers">
            <Field name="reason_for_match"  as={Textarea} placeHolder="Reason for Matching With Partner" />
            {/* <Input></Input> */}
            <Error touched={touched.reason_for_match} message={errors.reason_for_match} />
            </div>
          </div>
        </Paper>
        <Button margin="2em 0em" padding="10px 20px" disabled={isSubmitting}>
                Submit
            </Button>
            <Button background="white" color="#6429B9" border="1px solid #6429B9" margin="2em 1.5em" padding="10px 20px" onClick={handleCancel}>
                Cancel
            </Button>
        </div>
        <div className="user-metadata">
          <Paper>
            <div className="profile-section-header">Profile Picture</div>
            <UploadPhoto />
            <Button
              type='submit'
              value='Upload'
        >Submit</Button>
          </Paper>
        </div>
            
        </div>
        </Form>
      )}
    </Formik>
  </div>
);
}
export default EditProfile;