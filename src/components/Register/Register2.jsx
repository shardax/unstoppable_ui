import React, { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import './Register.scss'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import { useDataStore } from "../../UserContext";
import { REGISTERURL } from "../../constants/matcher";
import { values } from "mobx";
import { useCacheErrors } from "antd/lib/form/util";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
var moment = require('moment');
const minDate = moment().subtract(18, 'year').toDate();

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
    referred: Yup.string()
        .required("Required"),
    selectedDate: Yup.date()
        .max(minDate,"Must be over 18")
        .required("Required")
});

const Register2 = () => {

    const history = useHistory();
    const url = REGISTERURL;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDate, handleDateChange] = useState(new Date());
    const store = useDataStore();

    const { handleBlur, handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            username: "",
            email: "",
            selectedDate: "",
            zipcode: "",
            password: "",
            hear: "",
            referred: "",
            selectedDate: "",
        },
        validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
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
                                            variant="inline"
                                            openTo="year"
                                            views={["year", "month", "date"]}
                                            label="Year, Month, and Day"
                                            helperText="Start from year selection"
                                            value={values.selectedDate}
                                            onChange={handleChange}
                                            className={errors.selectedDate && touched.selectedDate ? "error" : null}
                                        />
                                    </MuiPickersUtilsProvider>
                                    {errors.selectedDate && touched.selectedDate ? (
                                        <div className="errorText">{errors.selectedDate}</div>
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
                                    <h4>How did you learn about us?</h4>
                                    <select
                                        id="referred"
                                        name="referred"
                                        value={values.referred}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.referred && touched.referred ? "error" : null}
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
                                    {errors.referred && touched.referred ? (
                                        <span className="errorText">{errors.referred}</span>
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