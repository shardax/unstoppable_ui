import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { useDataStore } from "../../UserContext";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { PROFILEURL, ROOTURL } from "../../constants/matcher";
import { PERSONALITY_DESCRIPTION, PREFERRED_EXERCISE_LOCATIONS, PREFERRED_TIME_DESCRIPTIONS, FITNESS_LEVEL_DESCRIPTIONS, WORK_STATUS_DESCRIPTIONS, CANCERLOCATIONLIST, TREATMENT_STATUS_DESCRIPTIONS } from "../../constants/ProfileConstants"
import Default from '../../layouts/Default'
import * as Yup from 'yup';
import Error from "../LogIn/Error";
import styled from '@emotion/styled';

import Input from '../Styled/Input';
import Button from '../Styled/Button';
import Textarea from '../Styled/Textarea';
import Select from '../Styled/Select';
import { displayToast } from '../Toast/Toast';

// the root path. locations should extend from this
const formRootPath = "/step"

// the specific path for each page
const locations = ["/step/1", "/step/2"];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : "Required");
const store = useDataStore();
const history = useHistory();

const ValidationSchema = Yup.object().shape({
  reason_for_match: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  cancer_location: Yup.string()
    .required("Required"),
});

class WizardBase extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues
    };
  }

  next = values => {
    const { location, history } = this.props;
    this.setState(() => ({ values }));

    // withRouter provides current location and history.push() to go to next page
    const nextPath = locations.indexOf(location.pathname) + 1;
    history.push(locations[nextPath]);
  };

  previous = () => {
    const { location, history } = this.props;

    const prevPath = locations.indexOf(location.pathname) - 1;
    history.push(locations[prevPath]);
  };

  validate = values => {
    const { location, children } = this.props;

    const page = locations.indexOf(location.pathname);
    const activePage = React.Children.toArray(children)[page];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit, location } = this.props;
    const page = locations.indexOf(location.pathname);
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    }
    // otherwise update values from page
    bag.setTouched({});
    bag.setSubmitting(false);
    this.next(values);
  };

  render() {
    const { children, location } = this.props;
    const { values } = this.state;
    // current page is determined by matching path in locations
    const page = locations.indexOf(location.pathname);

    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={validationSchema}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button
                  type="button"
                  className="secondary"
                  onClick={this.previous}
                >
                  « Previous
                </button>
              )}

              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

const Wizard = withRouter(WizardBase);


const About = () => (
  <Router>
    <div className="About">
      <h1>Multistep / Form Wizard </h1>
      <Route
        path={formRootPath}
        render={routeProps => (
          <Wizard
            {...routeProps}
            initialValues={{
              reason_for_match: "",
              cancer_location: "",
            }}
            onSubmit={(values, actions) => {
              sleep(300).then(() => {
                window.alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              });
            }}
          >
            <Wizard.Page
            validationSchema={ValidationSchema}>
              <div>
                <label>Reason for Match</label>
                <Field
                  name="reason_for_match"
                  as={Textarea}
                  placeHolder="Reason for Matching With Partner"
                />
                {/*<ErrorMessage
                  name="firstName"
                  component="div"
                  className="field-error"
                />*/}
              </div>
              {/*<div>
                <label>Last Name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                  validate={required}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="field-error"
                />
              </div>*/}
            </Wizard.Page>
            <Wizard.Page
              validationSchema={ValidationSchema}
            >
              <div>
                <label>What was your primary cancer diagnosis?</label>
                <Field
                  as={Select}
                  id="cancer_location"
                  name="cancer_location"
                >
                  <option value="" label="- Select One -" />
                  {CANCERLOCATIONLIST.map(item => (<option key={item} value={item}>	{item}</option>))}
                </Field>
                {/*<ErrorMessage
                  name="email"
                  component="div"
                  className="field-error"
                />*/}
              </div>
              {/*<div>
                <label>Favorite Color</label>
                <Field name="favoriteColor" component="select">
                  <option value="">Select a Color</option>
                  <option value="#ff0000">❤️ Red</option>
                  <option value="#00ff00">💚 Green</option>
                  <option value="#0000ff">💙 Blue</option>
                </Field>
                <ErrorMessage
                  name="favoriteColor"
                  component="div"
                  className="field-error"
                />
              </div>*/}
            </Wizard.Page>
          </Wizard>
        )}
      />
    </div>
  </Router>
);

export default App;
