import React, {useState, useEffect} from "react";
import { Formik, Field, Form } from 'formik';
import {useDataStore} from "../../UserContext";
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, ACTIVITIES, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS} from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'
import * as Yup from 'yup';

const store = useDataStore();

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const validationSchema = Yup.object({
  reason_for_match: Yup.string().required("Required")
})


const CheckboxExample = () => (
  
  <div>
    <Default>
    <h1>Edit Profile</h1>
    <h3> All changes will become part of your profile.</h3>

    <Formik
      initialValues={{
        location: [],
        activites: ["Walking", "Yoga"],
        fitnessLevel: store.profile.fitness_level,
        personality: store.profile.personality,
        preferedExerciseLocation: store.profile.prefered_exercise_location,
        preferedExerciseTime: store.profile.prefered_exercise_time,
        workStatus: store.profile.work_status,
        cancerLocation: store.profile.cancer_location,
        treatmentStatus: store.profile.treatment_status,
        reason_for_match: store.profile.reason_for_match,
        details_about_self: store.profile.details_about_self,
        treatment_description:store.profile.treatment_description,
        other_favorite_activities: "Dancing" //store.profile.other_favorite_activities
      }}
      onSubmit={async values => {
        await sleep(1000);
        alert(JSON.stringify(values, null, 2));
          let url = PROFILEURL + "/"  + store.profile.id + ".json" ;
          axios.patch(url, { profile: store.profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} ).then(res => {
            // do good things
           
            console.log(JSON.stringify(res));
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
      {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
        <Form>
        
          <div className="label">Basic Info</div>
          
          {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
          <div className="label">
            <b>Favorite activities (check all that apply)</b>
          </div>
          <label>
            {/*export const ACTIVITIES = [[1,"Walking"], [2,"Running"], [3,"Cycling"], [4,"Weight Lifting"], [5,"Aerobics"], [6,"Swimming"], [7,"Team Sports"], [8,"Yoga"], [9,"Pilates"], [10,"Gardening"] ]*/}
            {ACTIVITIES.map(item => (<label> {item[1]} <Field type="checkbox" name="activities" value={item[1]}></Field> </label>	)  )}
          </label>
          <div className="label">
            <label htmlFor="other_favorite_activities"><b>Do you have any other favorite activities? </b></label>
            <Field name="other_favorite_activities" placeHoldee="Enter any other favorite activity"/>
          </div>
          

          {/* 
           The <select> element will also behave the same way if 
           you pass `multiple` prop to it. 



          */}
          <label htmlFor="fitnessLevel">How would you describe your current fitness level? </label>
          <Field
            component="select"
            id="fitness_level"
            name="fitnessLevel"
          >
          {FITNESS_LEVEL_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
         {/*} <select onChange={e => props.inputChange(e, "fitness_level")} defaultValue={props.currentEditProfile.fitness_level}>	
           
        </select>*/}
          <div>
          <label htmlFor="personality">How would you describe your personality? </label>
          <Field
            component="select"
            id="personallity"
            name="personality"
          >
          {PERSONALITY_DESCRIPTION.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div>
          <label htmlFor="preferedExerciseLocation">Where do you prefer to be active? </label>
          <Field
            component="select"
            id="preferedExerciseLocation"
            name="preferedExerciseLocation"
          >
          {PREFERRED_EXERCISE_LOCATIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div>
          <label htmlFor="preferedExerciseTime">When do you prefer to be active?</label>
          <Field
            component="select"
            id="preferedExerciseTime"
            name="preferedExerciseTime"
          >
          {PREFERRED_TIME_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div>
          <label htmlFor="workStatus"> Which of the following best describes your work situation? </label>
          <Field
            component="select"
            id="workStatus"
            name="workStatus"
          >
          {WORK_STATUS_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div>
          <label htmlFor="cancerLocation">What was your primary cancer diagnosis?</label>
          <Field
            component="select"
            id="cancerLocation"
            name="cancerLocation"
          >
          {CANCERLOCATIONLIST.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div>
          <label htmlFor="treatmentStatus">Which of the following best describes you?</label>
          <Field
            component="select"
            id="treatmentStatus"
            name="treatmentStatus"
          >
          {TREATMENT_STATUS_DESCRIPTIONS.map(item => (<option key={item}	value={item}>	{item}</option>	))}
          </Field>
          </div>

          <div className="label">
            <label htmlFor="reason_for_match"><b>What is the main reason you want to be matched with an exercise partner?  </b></label>
            <Field name="reason_for_match" placeHoldee="Enter reason for matching"/>
          </div>

          <div className="label">
            <label htmlFor="details_about_self"><b>About Me: Use this space for anything else you would like to share.  </b></label>
            <Field name="details_about_self" placeHoldee="details_about_self"/>
          </div>

          <div className="label">
            <label htmlFor="treatment_description"><b> Please briefly describe your cancer treatments:  </b></label>
            <Field name="treatment_description" placeHoldee="treatment_description"/>
          </div>

          
          <label>
            <Field type="checkbox" name="terms" />I accept the terms and
            conditions.
          </label>
          {/* Here's how you can use a checkbox to show / hide another field */}
          <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          </div>
          
        </Form>
      )}
    </Formik>
    </Default>
  </div>
);

export default CheckboxExample;