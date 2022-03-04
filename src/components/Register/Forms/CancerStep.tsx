import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import { useDataStore } from "../../../UserContext";
import axios from "axios";
import { PROFILEURL } from "../../../constants/matcher";
import { CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import * as Yup from 'yup';
import Error from "../../LogIn/Error";
import Input from '../../Styled/Input';
import Button from '../../Styled/Button';
import Textarea from '../../Styled/Textarea';
import Select from '../../Styled/Select';
import Paper from '../../Styled/Paper';
import './Steps.scss'
import '../../manageProfile/EditProfile.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../../constants/ProfileConstants";


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
    cancer_location: Yup.string()
        .required("Required"),
});

const CancerStep = () => {
    const store = useDataStore();
    const history = createBrowserHistory({ forceRefresh: true });
    const [prevSubmitted, setPrevSubmitted] = useState(false);
    //const history = useHistory();
    let profile = store.profile;

    useEffect(() => {
        if (store.profile.step_status === STEP_EMAIL_CONFIRMATION_SENT) {
          history.push("/wizard/5");
        }
      }, [])

    const handleCancel = (event: React.MouseEvent) => {
        event.preventDefault();

    }

    return (

        <div>
            <Formik
                initialValues={{
                    //Cancer History
                    cancer_location: (profile.cancer_location === null) ? "" : profile.cancer_location,
                    other_cancer_location: profile.other_cancer_location,
                    treatment_status: profile.treatment_status,
                    treatment_description: profile.treatment_description,
                    part_of_wellness_program: (profile.part_of_wellness_program),
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
                            let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";
                            //Cancer History
                            profile.cancer_location = values.cancer_location;
                            profile.other_cancer_location = values.other_cancer_location;
                            profile.treatment_status = values.treatment_status;
                            profile.treatment_description = values.treatment_description;
                            profile.part_of_wellness_program = (values.part_of_wellness_string === "Yes") ? true : false
                            profile.which_wellness_program = values.which_wellness_program;

                            // Saving data on server
                            const res = await axios.patch(url, 
                                                    { profile: profile },
                                                    { withCredentials: true,
                                                        headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}}
                                                    )
                            store.profile = profile;
                            localStorage.setItem("userStore", JSON.stringify(store));
                            displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
                            if (prevSubmitted){
                                history.push("/wizard/0");
                            } else {
                                history.push("/wizard/2");
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
                                        {(!values.cancer_location) && <Error touched={touched.cancer_location} message="Cancer Location is a required field. Please select value." />}
                                        <Button id="prev" margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}  
                                            onClick={(e)=>{setPrevSubmitted(true)}}>
                                            Prev
                                        </Button>
                                        <Button margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}>
                                            Next
                                        </Button>
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