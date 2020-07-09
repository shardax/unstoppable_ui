import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import './Register.scss'
//import Autosuggest from "react-autosuggest";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import { useDataStore } from "../../UserContext";
import { REGISTERURL } from "../../constants/matcher";
import { values } from "mobx";
import { useCacheErrors } from "antd/lib/form/util";

const validationSchema = Yup.object({
    username: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(8,"Must be at least 8!")
        .required("Required"),
    email: Yup.string()
        .email("Email is invalid")
        .required("Required"),
    day: Yup.string()
        .required("Required"),
    month: Yup.string()
        .required("Required"),
    year: Yup.string()
        .required("Required"),
    zipcode: Yup.string()
        .matches(/(^([0-9]{5})(?:[-\s]*([0-9]{4}))?$)|(^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$)*/, "Please enter a valid US or CA zip/postal code.")
        .required("Required")
});

const Register2 = () => {
    const { handleSubmit, handleChange, values, errors, } = useFormik({
        initialValues: {
            username: "",
            email: "",
            day: "",
            month: "",
            year: "",
            zipcode: "",
            password: "",
            hear: "",
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
                                        className="error"
                                        onChange={handleChange}
                                    />
                                    {errors.username ? (
                                        <span className="errorText">{errors.username}</span>
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
                                        className={errors.email ? "error" : null}
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email ? (
                                        <span className="errorText">{errors.email}</span>
                                    ) : null}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Date of Birth:</h4>
                                    <div className="customDrop">
                                        <select
                                            id="day"
                                            name="day"
                                            value={values.day}
                                            onChange={handleChange}
                                        >
                                            <option>- Day -</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </select>
                                        {errors.day ? (
                                        <span className="errorText">{errors.day}</span>
                                    ) : null}
                                        <select
                                            id="month"
                                            name="month"
                                            value={values.month}
                                            onChange={handleChange}
                                        >
                                            <option>- Month -</option>
                                            <option value="January">January</option>
                                            <option value="Febuary">Febuary</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                        {errors.month ? (
                                        <span className="errorText">{errors.month}</span>
                                    ) : null}
                                        <select
                                            id="year"
                                            name="year"
                                            value={values.year}
                                            onChange={handleChange}
                                        >
                                            <option>- Year -</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                            <option value="2013">2013</option>
                                            <option value="2012">2012</option>
                                            <option value="2011">2011</option>
                                            <option value="2010">2010</option>
                                            <option value="2009">2009</option>
                                            <option value="2008">2008</option>
                                            <option value="2007">2007</option>
                                            <option value="2006">2006</option>
                                            <option value="2005">2005</option>
                                            <option value="2004">2004</option>
                                            <option value="2003">2003</option>
                                            <option value="2002">2002</option>
                                            <option value="2001">2001</option>
                                            <option value="2000">2000</option>
                                            <option value="1999">1999</option>
                                            <option value="1998">1998</option>
                                            <option value="1997">1997</option>
                                            <option value="1996">1996</option>
                                            <option value="1995">1995</option>
                                            <option value="1994">1994</option>
                                            <option value="1993">1993</option>
                                            <option value="1992">1992</option>
                                            <option value="1991">1991</option>
                                            <option value="1990">1990</option>
                                            <option value="1989">1989</option>
                                            <option value="1988">1988</option>
                                            <option value="1987">1987</option>
                                            <option value="1986">1986</option>
                                            <option value="1985">1985</option>
                                            <option value="1984">1984</option>
                                            <option value="1983">1983</option>
                                            <option value="1982">1982</option>
                                            <option value="1981">1981</option>
                                            <option value="1980">1980</option>
                                            <option value="1979">1979</option>
                                            <option value="1978">1978</option>
                                            <option value="1977">1977</option>
                                            <option value="1976">1976</option>
                                            <option value="1975">1975</option>
                                            <option value="1974">1974</option>
                                            <option value="1973">1973</option>
                                            <option value="1972">1972</option>
                                            <option value="1971">1971</option>
                                            <option value="1970">1970</option>
                                            <option value="1969">1969</option>
                                            <option value="1968">1968</option>
                                            <option value="1967">1967</option>
                                            <option value="1966">1966</option>
                                            <option value="1965">1965</option>
                                            <option value="1964">1964</option>
                                            <option value="1963">1963</option>
                                            <option value="1962">1962</option>
                                            <option value="1961">1961</option>
                                            <option value="1960">1960</option>
                                            <option value="1959">1959</option>
                                            <option value="1958">1958</option>
                                            <option value="1957">1957</option>
                                            <option value="1956">1956</option>
                                            <option value="1955">1955</option>
                                            <option value="1954">1954</option>
                                            <option value="1953">1953</option>
                                            <option value="1952">1952</option>
                                            <option value="1951">1951</option>
                                            <option value="1950">1950</option>
                                            <option value="1949">1949</option>
                                            <option value="1948">1948</option>
                                            <option value="1947">1947</option>
                                            <option value="1946">1946</option>
                                            <option value="1945">1945</option>
                                            <option value="1944">1944</option>
                                            <option value="1943">1943</option>
                                            <option value="1942">1942</option>
                                            <option value="1941">1941</option>
                                            <option value="1940">1940</option>
                                            <option value="1939">1939</option>
                                            <option value="1938">1938</option>
                                            <option value="1937">1937</option>
                                            <option value="1936">1936</option>
                                            <option value="1935">1935</option>
                                            <option value="1934">1934</option>
                                            <option value="1933">1933</option>
                                            <option value="1932">1932</option>
                                            <option value="1931">1931</option>
                                            <option value="1930">1930</option>
                                        </select>
                                        {errors.year ? (
                                        <span className="errorText">{errors.year}</span>
                                    ) : null}
                                    </div>
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
                                    />
                                    {errors.zipcode ? (
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
                                    />
                                    {errors.password ? (
                                        <span className="errorText">{errors.password}</span>
                                    ) : null}
                                    <p><i>(8 characters minimum, must contain at least 1 uppercase, 1 lowercase, and 1 number)</i></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>How did you learn about us?</h4>
                                    <select
                                        id="hear"
                                        name="hear"
                                        value={values.hear}
                                        onChange={handleChange}
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
                                    {errors.hear ? (
                                        <span className="errorText">{errors.hear}</span>
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