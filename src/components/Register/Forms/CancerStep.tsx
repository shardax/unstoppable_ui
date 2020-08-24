import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import { useDataStore } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import Default from '../../../layouts/Default'
import * as Yup from 'yup';
import Error from "../../LogIn/Error";
import styled from '@emotion/styled';
//import Input from '../Styled/input';
import Input from '../../Styled/Input';
import Button from '../../Styled/Button';
import Textarea from '../../Styled/Textarea';
import Select from '../../Styled/Select';
import Paper from '../../Styled/Paper';
import UploadPhoto from '../../manageProfile/UploadPhoto'
import './Steps.scss'
//import UploadPhoto from './UploadPhoto.js'

import { displayToast } from '../../Toast/Toast';
import { ProfileProps } from "../../../UserStore";



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

interface ICancerStep {
    editControls: {
        editMode: boolean,
        setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    }
    handleNext:{}
    handleBack:{}
}

const CancerStep: React.FC<ICancerStep> = ({ editControls }) => {
    const store = useDataStore();
    const history = useHistory();
    let profile = store.profile;

    let stringActivities: { id: string, name: string }[] = Object.keys(store.activities).map(function (key) {
        const id = store.activities[key].id.toString()
        const name = store.activities[key].name.toString();
        return ({ id, name });
    });
    let stringReasons: { id: string, name: string }[] = Object.keys(store.exerciseReasons).map(function (key) {
        const id = store.exerciseReasons[key].id.toString()
        const name = store.exerciseReasons[key].name.toString();
        return ({ id, name });
    });

    const handleCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        editControls.setEditMode(false)
    }

    return (

        <div>
            <Formik
                initialValues={{
                    //Cancer History
                    cancer_location: profile.cancer_location,
                    other_cancer_location: profile.other_cancer_location,
                    treatment_status: profile.treatment_status,
                    treatment_description: profile.treatment_description,
                    part_of_wellness_string: profile.part_of_wellness_program ? "Yes" : "No",
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
                            let url = PROFILEURL + "/" + store.profile.id + ".json";
                            //Cancer History
                            profile.cancer_location = values.cancer_location;
                            profile.other_cancer_location = values.other_cancer_location;
                            profile.treatment_status = values.treatment_status;
                            profile.treatment_description = values.treatment_description;
                            profile.part_of_wellness_program = (values.part_of_wellness_string == "Yes") ? true : false
                            profile.which_wellness_program = values.which_wellness_program;
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
                                                    {CANCERLOCATIONLIST.map(item => (<option key={item} value={item}>	{item}</option>))}
                                                </Field>
                                                <Error touched={touched.cancer_location} message={errors.cancer_location} />
                                            </div>
                                        </div>

                                        <div className="question-wrapper">
                                            <label htmlFor="other_cancer_location">Additional Cancer Information (e.g., stage, year diagnosed, DCIS, TNBC):  </label>
                                            <div className="Answers">
                                                <Field name="other_cancer_location" as={Textarea} placeHolder="Additional Cancer Information" rows={2} cols={50} />
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
                                                    {TREATMENT_STATUS_DESCRIPTIONS.map(item => (<option key={item} value={item}> {item}</option>))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="question-wrapper">
                                            <label htmlFor="treatment_description">Please briefly describe your cancer treatments: </label>
                                            <div className="Answers">
                                                <Field name="treatment_description" as={Textarea} placeHolder="Treatment description" rows={2} cols={50} />
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
                                                <Field name="which_wellness_program" as={Input} placeoHlder="Which wellness program" />
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}
export default CancerStep;