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



const store = useDataStore();

const history = useHistory();

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

var profile = store.profile;

const handleBackToView = (event: React.MouseEvent) => {
  event.preventDefault();
  store.editMode = false;
  console.log("In handleBackToView");
  history.push("/profile");
}

const ValidationSchema = Yup.object().shape({
  reason_for_match: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  cancer_location: Yup.string()
    .required("Required"),
});


const EditProfile = () => { 
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

  return(
  
  <div>
    <Default>
    <div className='editProfile'>
    <h1>Edit Profile</h1>
    <h3> All changes will become part of your profile.</h3>
    </div>

    <Formik
      initialValues={{
        // About Me
        activity_ids: profile.activity_ids.map(String),
        other_favorite_activities: profile.other_favorite_activities,
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
        part_of_wellness_program: (profile.part_of_wellness_program || false),
        which_wellness_program: profile.which_wellness_program
      }}
      validationSchema={ValidationSchema}
      validate={values => {
        let errors = {};
        return errors;
      }}
      onSubmit={async values => {
        await sleep(1000);
        //alert(JSON.stringify(values, null, 2));
          let url = PROFILEURL + "/"  + store.profile.id + ".json" ;
          //About Me
          profile.activity_ids = values.activity_ids.map(Number);
          profile.other_favorite_activities = values.other_favorite_activities;
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
          profile.part_of_wellness_program = values.part_of_wellness_program;
          profile.which_wellness_program = values.which_wellness_program;

          axios.patch(url, { profile: profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} ).then(res => {
            // do good things
            store.profile = profile;
            console.log(JSON.stringify(res));
            store.editMode = false;
            console.log("In handleBackToView");
            history.push("/profile");
        })
        .catch(err => {
              if (err.response) {
                // client received an error response (5xx, 4xx)
              } else if (err.request) {
                // client never received a response, or request never left
              } else {
                // anything else
              }
            }) // end of error block
        }} // end of onSubmit
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
          {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
          <div className="Questions">
          <div className="Questions">
            <b>Favorite activities (check all that apply)</b>
          </div>
          <div className="Answers">
          <label>
            {stringActivities.map(item => (<label> {item.name} <Field type="checkbox" name="activity_ids" value={item.id}></Field>&nbsp;&nbsp;&nbsp; </label>	)  )}
          </label>
          </div>

          
          <div className="Questions">
            <b>Do you have any other favorite activities? </b>
          </div>
          <label>
            <textarea name="other_favorite_activities" placeholder="Enter any other favorite activity" rows={1} cols={100}/>
          </label>

          <div className="Questions">
             <label htmlFor="fitnessLevel"><b>How would you describe your current fitness level? </b> </label>
          </div>
          <Field
            component="select"
            id="fitness_level"
            name="fitness_level"
          >
          <option value="" label="- Select One -" />
          {FITNESS_LEVEL_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
         {/*} <select onChange={e => props.inputChange(e, "fitness_level")} defaultValue={props.currentEditProfile.fitness_level}>	
           
        </select>*/}

          <div className="Questions">
            <b>Identify your top reasons for wanting to become more active:</b>
            <div className="Answers">
          <label>
            {stringReasons.map(item => (<label> {item.name} <Field type="checkbox" name="exercise_reason_ids" value={item.id}></Field>&nbsp;&nbsp;&nbsp; </label>	)  )}
          </label>
          </div>
          </div>

          <div className="Questions">
          <label htmlFor="prefered_exercise_location"><b>Where do you prefer to be active?</b> </label>
          <div className="Answers">
          <Field
            component="select"
            id="prefered_exercise_location"
            name="prefered_exercise_location"
          >
          <option value="" label="- Select One -" />
          {PREFERRED_EXERCISE_LOCATIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>
          </div>

          <div className="Questions">
          <label htmlFor="prefered_exercise_time"><b>When do you prefer to be active?</b></label>
          <div className="Answers">
          <Field
            component="select"
            id="prefered_exercise_time"
            name="prefered_exercise_time"
          >
          <option value="" label="- Select One -" />
          {PREFERRED_TIME_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>
          </div>

          <div className="Questions">
            <label htmlFor="reason_for_match"><b>What is the main reason you want to be matched with an exercise partner?  </b> </label>
            <div className="Answers">
            <input
              type="text"
              name="reason_for_match"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.reason_for_match}
              size={100}
              className={"global-input" + (touched.reason_for_match && errors.reason_for_match ? "has-error" : null)}
            />
            <Error touched={touched.reason_for_match} message={errors.reason_for_match} />
            </div>
          </div>


          <div className="Questions">
            <label htmlFor="personality"><b>How would you describe your personality?</b> </label>
            <div className="Answers">
            <Field
              component="select"
              id="personality"
              name="personality"
            >
            <option value="" label="- Select One -" />
            {PERSONALITY_DESCRIPTION.map(item => (<option key={item}	value={item}>	{item}</option>	))}
            </Field>
          </div>
          </div>

          <div className="Questions">
            <label htmlFor="work_status"><b> Which of the following best describes your work situation?</b> </label>
            <div className="Answers">
            <Field
              component="select"
              id="work_status"
              name="work_status"
            >
            <option value="" label="- Select One -" />
            {WORK_STATUS_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
            </Field>
          </div>
          </div>

          <div className="Questions">
            <label htmlFor="details_about_self"><b>About Me: Use this space for anything else you would like to share.  </b></label>
            <div className="Answers">
            <textarea name="details_about_self" placeholder="Details about self" rows={7} cols={100}/>
            </div>
          </div>

          <div className="Questions">
          <label htmlFor="cancer_location"><b>What was your primary cancer diagnosis?</b></label>
          <div className="Answers">
          <Field
            component="select"
            id="cancer_location"
            name="cancer_location"
          >
          <option value="" label="- Select One -" />
          {CANCERLOCATIONLIST.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          <Error touched={touched.cancer_location} message={errors.cancer_location} />
          </div>
          </div>

          <div className="Questions">
            <label htmlFor="other_cancer_location"><b>Additional Cancer Information (e.g., stage, year diagnosed, DCIS, TNBC):  </b></label>
            <div className="Answers">
            <textarea name="other_cancer_location" placeholder="Additional Cancer Information" rows={2} cols={100}/>
          </div>
          </div>

          <div className="Questions">
          <label htmlFor="treatment_status"><b>Which of the following best describes you?</b></label>
          <div className="Answers">
          <Field
            component="select"
            id="treatment_status"
            name="treatment_status"
          >
          {TREATMENT_STATUS_DESCRIPTIONS.map(item => (<option key={item}  value={item}> {item}</option> ))}
          </Field>
          </div>
          </div>


          <div className="Questions">
            <label htmlFor="treatment_description"><b> Please briefly describe your cancer treatments:  </b></label>
            <div className="Answers">
            <textarea name="treatment_description" placeholder="Treatment description" rows={3} cols={100}/>
          </div>
          </div>
          

         

          <div className="Questions">
              <label htmlFor="treatment_status"><b> Have you ever been part of a support group or wellness program following your cancer diagnosis?:</b></label>
              <Field
              name="part_of_wellness_program"
              render={({ field }) => (
                <>
                  <div className="radio-item">
                    <input
                      {...field}
                      id="yes"
                      value={true}
                      checked={field.value === true}
                      name="type"
                      type="radio"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>

                  <div className="radio-item">
                    <input
                      {...field}
                      id="no"
                      value={false}
                      name="type"
                      checked={field.value === 'false'}
                      type="radio"
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </>
              )}
            />
          </div>  
          
             
          <div>
            <div className="Questions">
              <label htmlFor="which_wellness_program"><b>If yes, what program? (list the name and location if possible, for example: INOVA Life with Cancer-Breast Cancer Support Group, Fairfax):  </b></label>
              <textarea name="which_wellness_program" placeholder="Which wellness program" rows={3} cols={100}/>
            </div> 
            <button className="Button" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          </div>
          
        </Form>
      )}
    </Formik>
    </Default>
  </div>
);
}
export default EditProfile;