import React, { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import './Register.scss'
import { useFormik } from 'formik';
import * as formik from 'formik';
import * as Yup from "yup";
import axios from "axios";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import { useDataStore } from "../../UserContext";
import { REGISTERURL } from "../../constants/matcher";
import { values } from "mobx";
import { useCacheErrors } from "antd/lib/form/util";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const validationSchema = Yup.object({
    username: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters long!")
        .required("Required")
        .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/),
    email: Yup.string()
        .email("Email is invalid")
        .required("Required"),
    zipcode: Yup.string()
        .matches(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/, "Please enter a valid US or CA zip/postal code.")
        .required("Required"),
    referred_by: Yup.string()
        .required("Required"),
    age: Yup.number()
        .min(18, "Must be 18 years old or older to register"),
    phone: Yup.string()
        .length(10, "Must be a valid US phone number")
});

const Register2 = () => {

    const history = useHistory();
    const url = REGISTERURL;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDate, handleDateChange] = useState(new Date());
    const store = useDataStore();


    const { handleBlur, handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik({
        initialValues: {
            username: "",
            email: "",
            selectedDate: new Date(),
            zipcode: "",
            password: "",
            hear: "",
            referred_by: "",
            selectedDate: "",
            age: "",
            phone:""
        },
        validationSchema,
        onSubmit: async values => {
            await axios.post(url, { user: 
                {"username": values.username, 
                "email": values.email, 
                "dob(3i)": values.day, 
                "dob(2i)":values.month, 
                "dob(1i)":values.year,
                "zipcode":values.zipcode,
                "password":values.password}},
                { withCredentials: true, 
                    headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json"}
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
            }
    });
    return (
        <div>
            <img src={UnsIcon} className="logo" />
            <div className="mainBlock">
                <form onSubmit={handleSubmit}>
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
                                    />
                                    {touched.username && errors.username ? (
                                        <div className="errorText">{errors.username}</div>
                                    ) : null}
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
                                        <DatePicker
                                            value={values.selectedDate}
                                            inputVariant="outlined"
                                            disableFuture
                                            openTo="year"
                                            views={["year", "month", "date"]}
                                            format="MM/dd/yyyy"
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={value => setFieldValue("selectedDate", value)} />
                                    </MuiPickersUtilsProvider>
                                    {errors.age && touched.age ? (
                                        <div className="errorText">{errors.age}</div>
                                    ) : null}
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
                                        type="text"
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
                    </div >
                    <div className="submitButtons">
                        <table>
                            <tr>
                                <td>
                                    <input className="buttons" type="submit" value="Create Account" />
                                </td>
                                <td>
                                    <button className="buttons">Cancel</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </form >
            </div>
        </div>
    );
};

export default Register2;