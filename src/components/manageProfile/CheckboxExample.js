import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Debug } from './Debug';
import {useDataStore} from "../../UserContext";
import {PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, ACTIVITIES} from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'
const store = useDataStore();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
        other_favorite_activities: "Dancing" //store.profile.other_favorite_activities
      }}
      onSubmit={async values => {
        await sleep(1000);
        alert(JSON.stringify(values, null, 2));
      }}
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


  

          <Field
            component="select"
            id="location"
            name="location"
          >
            <option value="NY">New York</option>
            <option value="SF">San Francisco</option>
            <option value="CH">Chicago</option>
            <option value="OTHER">Other</option>
          </Field>
          <label>
            <Field type="checkbox" name="terms" />I accept the terms and
            conditions.
          </label>
          {/* Here's how you can use a checkbox to show / hide another field */}
          {!!values.terms ? (
            <div>
              <label>
                <Field type="checkbox" name="newsletter" />
                Send me the newsletter <em style={{ color: 'rebeccapurple' }}>
                  (This is only shown if terms = true)
                </em>
              </label>
            </div>
          ) : null}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          
        </Form>
      )}
    </Formik>
    </Default>
  </div>
);

export default CheckboxExample;