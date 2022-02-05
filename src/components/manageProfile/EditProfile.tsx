import "./EditProfile.scss";

import * as Yup from "yup";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  CANCERLOCATIONLIST,
  FITNESS_LEVEL_DESCRIPTIONS,
  PERSONALITY_DESCRIPTION,
  PREFERRED_EXERCISE_LOCATIONS,
  PREFERRED_TIME_DESCRIPTIONS,
  TREATMENT_STATUS_DESCRIPTIONS,
  WORK_STATUS_DESCRIPTIONS,
} from "../../constants/ProfileConstants";
import { Field, Form, Formik } from "formik";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import {
  PopupboxContainer,
  PopupboxManager
} from 'react-popupbox';
import React, { useEffect, useState } from "react";

import Button from "../Styled/Button";
import Checkbox from '@material-ui/core/Checkbox';
import Collapsible from "react-collapsible";
import Default from "../../layouts/Default";
import Error from "../LogIn/Error";
//import Input from '../Styled/input';
import Input from "../Styled/Input";
import Paper from "../Styled/Paper";
import { ProfileProps } from "../../UserStore";
import Select from "../Styled/Select";
import Textarea from "../Styled/Textarea";
import UploadPhoto from "./UploadPhoto";
import axios from "axios";
import { displayToast } from "../Toast/Toast";
import { useDataStore } from "../../UserContext";
import { useHistory } from "react-router-dom";

//import UploadPhoto from './UploadPhoto.js'

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className={"radio-item"}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id || false}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
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
  cancer_location: Yup.string().required("Required"),
});

interface IEditProfile {
  editControls: {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const EditProfile: React.FC<IEditProfile> = ({ editControls }) => {
  const store = useDataStore();
  const history = useHistory();
  const [inputSubmitted, setInputSubmitted] = useState(false);
  // const [toggle, setTogglePanel] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  let profile = store.profile;

  let stringActivities: { id: string; name: string }[] = Object.keys(
    store.activities
  ).map(function (key) {
    const id = store.activities[key].id.toString();
    const name = store.activities[key].name.toString();
    return { id, name };
  });
  let stringReasons: { id: string; name: string }[] = Object.keys(
    store.exerciseReasons
  ).map(function (key) {
    const id = store.exerciseReasons[key].id.toString();
    const name = store.exerciseReasons[key].name.toString();
    return { id, name };
  });

  const handleCancel = (event: React.MouseEvent) => {
    PopupboxManager.close()
    event.preventDefault();
    editControls.setEditMode(false);
  };

  const [checked, setChecked] = React.useState(false);

  const handleCheck= (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const content = (
    <div className="page">
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
          reason_for_match: profile.reason_for_match,
          personality: profile.personality,
          work_status: profile.work_status,
          details_about_self: profile.details_about_self,
          //Cancer History
          cancer_location: profile.cancer_location,
          other_cancer_location: profile.other_cancer_location,
          treatment_status: profile.treatment_status,
          treatment_description: profile.treatment_description,
          part_of_wellness_program: profile.part_of_wellness_program,
          part_of_wellness_string: profile.part_of_wellness_program
            ? "Yes"
            : "No",
          which_wellness_program: profile.which_wellness_program,
        }}
        validationSchema={ValidationSchema}
        validate={(values) => {
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
              let url = PROFILEURL + "/" + store.profile.id + ".json";
              //About Me
              profile.activity_ids = values.activity_ids.map(Number);
              profile.other_favorite_activities =
                values.other_favorite_activities;
              profile.virtual_partner =
                values.virtual_partner == "Yes" ? true : false;
              profile.fitness_level = values.fitness_level;
              profile.exercise_reason_ids =
                values.exercise_reason_ids.map(Number);
              profile.prefered_exercise_location =
                values.prefered_exercise_location;
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
              profile.part_of_wellness_program =
                values.part_of_wellness_string == "Yes" ? true : false;
              profile.which_wellness_program = values.which_wellness_program;
              // Saving data on server
              const res = await axios.patch(
                url,
                { profile: profile },
                {
                  withCredentials: true,
                  headers: { "Access-Control-Allow-Origin": "*" },
                }
              );
              store.profile = profile;
              console.log(JSON.stringify(res));
              editControls.setEditMode(false);
              console.log("In handleBackToView");
              history.push("/profile");
              displayToast(
                "Successfully updated profile ✅",
                "success",
                3000,
                "top-right"
              );
            } catch (err) {
              displayToast(
                "Failed to update profile",
                "error",
                3000,
                "top-right"
              );
              if (err) {
                console.log(err);

                if (err) {
                  // client received an error response (5xx, 4xx)
                } else if (err) {
                  // client never received a response, or request never left
                } else {
                  // anything else
                }
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
          setFieldValue,
        }) => (
          <Form>
            <div className="question-wrapper">
              <div>
              <label htmlFor="work_status">Current Work Status</label>
              </div>
              <span style={{ display: "inline-block" }}>
                <Field
                  component={RadioButton}
                  name="work_status"
                  id="Full-Time"
                  label="Full-Time"
                />
              </span>
              <span style={{ display: "inline-block" }}>
                <Field
                  component={RadioButton}
                  name="work_status"
                  id="Part-Time"
                  label="Part-Time"
                />
              </span>
              <span style={{ display: "inline-block" }}>
                <Field
                  component={RadioButton}
                  name="work_status"
                  id="Unemployed"
                  label="Unemployed"
                />
              </span>
            </div>
            <div className="form-container user-section-wrapper">
              <div className="user-section-data">
                <div className="item">
                  <div className="title" onClick={() => toggle(0)}>
                    <h2>About me </h2>
                    <span>{selected == 0 ? <BsChevronUp/> : <BsChevronDown/>}</span>
                  </div>
                  {/* <Collapsible className="profile-section-header" trigger="About me 😀 ">
                   */}
                  <div className={selected == 0 ? "content show" : "content"}>
                    {/* <div className="profile-section-header">About me 😀</div> */}
                    <div className="question-wrapper">
                      <label htmlFor="personality">
                        How would you describe your personality?
                      </label>
                      <div className="Answers">
                        <Field as={Select} id="personality" name="personality">
                          <option value="" label="- Select One -" />
                          {PERSONALITY_DESCRIPTION.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="work_status">
                        Which of the following best describes your work
                        situation?
                      </label>
                      <div className="Answers">
                        <Field as={Select} id="work_status" name="work_status">
                          <option value="" label="- Select One -" />
                          {WORK_STATUS_DESCRIPTIONS.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="details_about_self">
                        About Me: Use this space for anything else you would
                        like to share.
                      </label>
                      <div className="Answers">
                        <Field
                          name="details_about_self"
                          as={Textarea}
                          placeHolder="Details about self"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Collapsible> */}
                <div className="item">
                  <div className="title" onClick={() => toggle(1)}>
                    <h2>Details about Diagnosis </h2>
                    <span>{selected == 1 ? <BsChevronUp/> : <BsChevronDown/>}</span>
                  </div>

                  <div className={selected == 1 ? "content show" : "content"}>
                    <div className="question-wrapper">
                      <label htmlFor="cancer_location">
                        What was your primary cancer diagnosis?
                      </label>
                      <div className="Answers">
                        <Field
                          as={Select}
                          id="cancer_location"
                          name="cancer_location"
                        >
                          <option value="" label="- Select One -" />
                          {CANCERLOCATIONLIST.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                        <Error
                          touched={touched.cancer_location}
                          message={errors.cancer_location}
                        />
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="other_cancer_location">
                        Additional Cancer Information (e.g., stage, year
                        diagnosed, DCIS, TNBC):{" "}
                      </label>
                      <div className="Answers">
                        <Field
                          name="other_cancer_location"
                          as={Textarea}
                          placeHolder="Additional Cancer Information"
                          rows={2}
                          cols={50}
                        />
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="treatment_status">
                        Which of the following best describes you?
                      </label>
                      <div className="Answers">
                        <Field
                          as={Select}
                          id="treatment_status"
                          name="treatment_status"
                        >
                          {TREATMENT_STATUS_DESCRIPTIONS.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="treatment_description">
                        Please briefly describe your cancer treatments:{" "}
                      </label>
                      <div className="Answers">
                        <Field
                          name="treatment_description"
                          as={Textarea}
                          placeHolder="Treatment description"
                          rows={2}
                          cols={50}
                        />
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="part_of_wellness_program">
                        Have you ever been part of a support group or wellness
                        program following your cancer diagnosis?:
                      </label>
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
                        <label htmlFor="which_wellness_program">
                          If yes, what program? (list the name and location if
                          possible, for example: INOVA Life with Cancer-Breast
                          Cancer Support Group, Fairfax):{" "}
                        </label>
                        <Field
                          name="which_wellness_program"
                          as={Input}
                          placeoHlder="Which wellness program"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="title" onClick={() => toggle(2)}>
                    <h2>Activity/Fitness</h2>
                    <span>{selected == 2 ? <BsChevronUp/> : <BsChevronDown/>}</span>
                  </div>

                  <div className={selected == 2 ? "content show" : "content"}>
                    <div className="question-wrapper">
                      <div className="question-title">
                        Favorite activities (check all that apply)
                      </div>
                      <div className="Answers">
                        <label>
                          {stringActivities.map((item) => (
                            <label>
                              {item.name + " "}
                              <Field
                                id={item.id}
                                type="checkbox"
                                name="activity_ids"
                                value={item.id}
                              ></Field>
                              &nbsp;&nbsp;&nbsp;
                            </label>
                          ))}
                        </label>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <div className="question-title">
                        Do you have any other favorite activities?
                      </div>
                      <label>
                        <Input
                          name="other_favorite_activities"
                          placeholder="Enter any other favorite activity"
                        />
                      </label>
                    </div>

                    <div className="question-wrapper">
                      <div className="question-title">
                        <label htmlFor="fitnessLevel">
                          How would you describe your current fitness level?
                        </label>
                      </div>
                      <div className="Answers">
                        <Field
                          as={Select}
                          id="fitness_level"
                          name="fitness_level"
                        >
                          <option value="" label="- Select One -" />
                          {FITNESS_LEVEL_DESCRIPTIONS.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
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
                        Identify your top reasons for wanting to become more
                        active:
                      </div>
                      <div className="Answers">
                        <label>
                          {stringReasons.map((item) => (
                            <label>
                              {" "}
                              {item.name}{" "}
                              {/* <Field
                                id={item.id}
                                type="checkbox"
                                name="exercise_reason_ids"
                                value={item.id}
                              ></Field> */}
                                {item.id}           
                              <Checkbox
                                  id={item.id}
                                  name="exercise_reason_ids"
                                  color="primary"
                                  // inputProps={{ 'aria-label': 'primary checkbox' }}
                                  value={item.id}
                                />
                              &nbsp;&nbsp;&nbsp;{" "}
                            </label>
                          ))}
                        </label>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="prefered_exercise_location">
                        Where do you prefer to be active?
                      </label>
                      <div className="Answers">
                        <Field
                          as={Select}
                          id="prefered_exercise_location"
                          name="prefered_exercise_location"
                        >
                          <option value="" label="- Select One -" />
                          {PREFERRED_EXERCISE_LOCATIONS.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="prefered_exercise_time">
                        When do you prefer to be active?
                      </label>
                      <div className="Answers">
                        <Field
                          as={Select}
                          id="prefered_exercise_time"
                          name="prefered_exercise_time"
                        >
                          <option value="" label="- Select One -" />
                          {PREFERRED_TIME_DESCRIPTIONS.map((item) => (
                            <option key={item} value={item}>
                              {" "}
                              {item}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="question-wrapper">
                      <label htmlFor="reason_for_match">
                        What is the main reason you want to be matched with an
                        exercise partner?{" "}
                      </label>
                      <div className="Answers">
                        <Field
                          name="reason_for_match"
                          as={Textarea}
                          placeHolder="Reason for Matching With Partner"
                        />
                        {/* <Input></Input> */}
                        <Error
                          touched={touched.reason_for_match}
                          message={errors.reason_for_match}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submitCancel">
                  <Button
                    color="#F1658C"
                    background="#FFE7ED"
                    borderRadius="6px"
                    margin="2em 1.5em"
                    padding="10px 20px"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    margin="2em 0em"
                    padding="10px 20px"
                    background="#F1658C"
                    borderRadius="6px"
                    disabled={isSubmitting}
                  >
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* <div className="user-metadata">
        <Paper>
          <div className="profile-section-header">Profile Picture</div>
          <UploadPhoto fromWizard={false} />
        </Paper>
      </div> */}
    </div>
  );

  return content
};
export default EditProfile;
