import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import './Register.scss'
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import { useDataStore } from "../../UserContext";
import { REGISTERURL, VALIDUSERNAMEURL, VALIDEMAILURL } from "../../constants/matcher";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ReCAPTCHA from "react-google-recaptcha";
import { LOGINURL } from "../../constants/matcher";
//import { ReCaptcha } from 'react-recaptcha-google'
//import { loadReCaptcha } from 'react-recaptcha-google'
//import { Recaptcha } from "./recaptcha";

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDate();
const minDate = new Date(year - 18, month, day);
const store = useDataStore();
const history = useHistory();

const handleCancel = ({}) => {
  //  event.preventDefault();
    history.push("/login");
};

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .matches(/^[a-z\d]{5,12}$/i, "Invalid Username")
        .test('Unique Username', 'Username already been taken',
            function (value) {
                return new Promise((resolve, reject) => {
                    axios.post(VALIDUSERNAMEURL, { "username": value, "id": store.current_user_id }, {
                        withCredentials: true,
                        headers: {
                            contentType: "application/json; charset=utf-8",
                        }
                    })
                        .then(res => {
                            if (res.data.message === 'Username already been taken') {
                                console.log(res.data.message);
                                resolve(false);
                            } else {
                                console.log("User valid")
                                resolve(true);
                            }
                        })
                })
            }
        )
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters long!")
        .required("Required")
        .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Invalid Password"),
    email: Yup.string()
        .email("Email is invalid")
        .test('Unique Email', 'Email already been taken',
            function (value) {
                return new Promise((resolve, reject) => {
                    axios.post(VALIDEMAILURL, { "email": value, "id": store.current_user_id }, {
                        withCredentials: true,
                        headers: {
                            contentType: "application/json; charset=utf-8",
                        }
                    })
                        .then(res => {
                            if (res.data.message === 'Email already been taken') {
                                console.log(res.data.message);
                                resolve(false);
                            } else {
                                console.log("Email valid")
                                resolve(true);
                            }
                        })
                })
            }
        )
        
        .required("Required"),
    zipcode: Yup.string()
        .matches(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/, "Please enter a valid US or CA zip/postal code.")
        .required("Required"),
    referred_by: Yup.string()
        .required("Required"),
    phone: Yup.string()
        .length(10, "Must be a valid US phone number!"),
    dob: Yup.date()
        .required("Required")
        .nullable()
        .max(minDate, "You must be 18 years or older to sign up!"),
});

const Register2 = () => {

    const history = useHistory();
    const url = REGISTERURL;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const store = useDataStore();
    const recaptchaRef = React.useRef();

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                zipcode: "",
                password: "",
                recaptchaResponse: "",
                referred_by: "",
                dob: null,
                age: "",
                phone: ""
                //recaptchaToken =recaptchaToken 
            }}
            validationSchema={validationSchema}
            validate={values => {
                let errors = {};
                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 500);

                console.log(JSON.stringify(values));
                let newDOB = new Date(values.dob);
                var year = newDOB.getFullYear().toString();
                var month = (newDOB.getMonth() + 1).toString();
                var day = (newDOB.getDate()).toString();

                const createAcc = async () => {
                    try {
                        const result = await axios.post(url, {
                            "g-recaptcha-response": values.recaptchaResponse,
                            user:
                            {
                                "username": values.username,
                                "email": values.email,
                                "dob(3i)": day,
                                "dob(2i)": month,
                                "dob(1i)": year,
                                "zipcode": values.zipcode,
                                "password": values.password,
                                "referred_by": values.referred_by,
                                //"phone_number": values.phone,
                            }
                        },
                            {
                                withCredentials: true,
                                headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json" }
                            });

                          console.log(JSON.stringify(result));
                          store.username =  result.data.username;
                          store.current_user_id = result.data.current_user_id;
                          store.email = result.data.email;
                          store.profile = result.data.profile;
                          store.profileId = result.data.profile.id;
                          store.activities = result.data.all_activities;
                          store.exerciseReasons = result.data.all_exercise_reasons;
                          store.isLoggedIn = true;
                          localStorage.setItem("userStore", JSON.stringify(store));
                        //store.isLoggedIn = true;
                    } catch (err) {
                        console.log(err.message);
                        if (err.response) {
                            // client received an error response (5xx, 4xx)
                            setErrorMessage(err.message);
                        } else if (err.request) {
                            // client never received a response, or request never left
                            setErrorMessage(err.message);
                        } else {
                            // anything else
                            setErrorMessage(err.message);
                        }
                        setIsError(true);
                    }
                    // end of error block
                    if (store.isLoggedIn) {
                        // history.push("/profile");
                    } else {
                        history.push("/register")
                    }
                };
                createAcc();
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
                    <div className="mainBlock">
                        <form onSubmit={handleSubmit}>
                            <img src={UnsIcon} className="logo" />
                            <div className="container">
                                <h1>Sign Up</h1>
                                <p>Please fill in this form to create an account.</p>
                                <table>
                                    <th>
                                        <h2>Account Information</h2>
                                    </th>
                                    <tr>
                                        <td>
                                            <h4>Username: </h4>
                                            <p><i>Your username will be your profile display name.</i></p>
                                            <input
                                                id="username"
                                                type="text"
                                                name="username"
                                                value={values.username}
                                                className={errors.username && touched.username ? "error" : null}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                            />
                                            {touched.username && errors.username ? (
                                                <div className="errorText">{errors.username}</div>
                                            ) : null}
                                            <p><i>User name must be 5-12 characters long, with only lowercase letters followed by digits.</i></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Email:</h4>
                                            <p><i>Email address will not be seen by other users.</i></p>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                className={errors.email && touched.email ? "error" : null}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                            />
                                            {errors.email && touched.email ? (
                                                <div className="errorText">{errors.email}</div>
                                            ) : null}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <h4>Date of Birth:</h4>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    id="dob"
                                                    name="dob"
                                                    inputVariant="outlined"
                                                    disableFuture
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    format="MM/dd/yyyy"
                                                    onBlur={handleBlur}
                                                    value={values.dob}
                                                    onChange={value => setFieldValue("dob", value)}
                                                    className={errors.dob && touched.dob ? "error" : null}
                                                    autoComplete="new-password"
                                                />
                                                {errors.dob && touched.dob ? (
                                                    <div className="errorText">{errors.dob}</div>
                                                ) : null}
                                            </MuiPickersUtilsProvider>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Zip Code:</h4>
                                            <p><i>Zip Code will be kept private, but will be used by our system to find exercise partners near you.</i></p>
                                            <input
                                                id="zipcode"
                                                type="text"
                                                name="zipcode"
                                                value={values.zipcode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.zipcode && touched.zipcode ? "error" : null}
                                                autoComplete="new-password"
                                            />
                                            {errors.zipcode && touched.zipcode ? (
                                                <span className="errorText">{errors.zipcode}</span>
                                            ) : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Password:</h4>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.password && touched.password ? "error" : null}
                                            />
                                            {errors.password && touched.password ? (
                                                <span className="errorText">{errors.password}</span>
                                            ) : null}
                                            <p><i>(8 characters minimum, must contain at least 1 uppercase, 1 lowercase, and 1 number)</i></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Phone Number:</h4>
                                            <p><i>Your phone number will not be viewable to any other user.</i></p>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.phone && touched.phone ? "error" : null}
                                            />
                                            {errors.phone && touched.phone ? (
                                                <span className="errorText">{errors.phone}</span>
                                            ) : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>How did you learn about us?</h4>
                                            <select
                                                id="referred_by"
                                                name="referred_by"
                                                value={values.referred_by}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.referred_by && touched.referred_by ? "error" : null}
                                            >
                                                <option value="" label="Select an option" />
                                                <option value="social" label="Facebook/Social Media" />
                                                <option value="news" label="News Media" />
                                                <option value="Word" label="Word of Mouth" />
                                                <option value="web" label="Web Search" />
                                                <option value="event" label="Event/Conference/Symposium" />
                                                <option value="org" label="Cancer Support Organization" />
                                                <option value="provider" label="My provider (physician, nurse, nutritionist)" />
                                                <option value="other" label="Other" />
                                            </select>
                                            {errors.referred_by && touched.referred_by ? (
                                                <span className="errorText">{errors.referred_by}</span>
                                            ) : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="checkbox" required></input>
                                            <span className="checkmark"></span>
                                            <label> I have read and agreed to the Terms of Use and Privacy Policy.</label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="submitButtons">
                                <table>
                                    <tr>
                                        <td>
                                            <input className="buttons" type="submit" value="Create Account" disabled={isSubmitting} />
                                        </td>
                                        <td>
                                            <button className="buttons" disabled={isSubmitting} onClick={handleCancel}>Cancel</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <form onSubmit={() => { recaptchaRef.current.execute(); }}>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    size="invisible"
                                    sitekey="6LdpusYUAAAAAMlMPRc3ljtC7He3A0XywRmhEt0U"
                                    onChange={(value) => { values.recaptchaResponse = value }}
                                />
                            </form>
                        </form>
                    </div>
                )}
        </Formik>
    );
}
export default Register2;