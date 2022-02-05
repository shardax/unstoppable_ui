import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import React from "react";
import UnsIcon from '../../images/2Unstoppable_logo.png'
import './About.scss'
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import Button from '../Styled/Button';
import Paper from '@material-ui/core/Paper';

// importing questions for multi-page-form: OLD
import AboutStep from './Forms/AboutStep';
import CancerStep from './Forms/CancerStep';
import FitnessStep from './Forms/FitnessStep';
import UploadPhoto from '../manageProfile/UploadPhoto'
import ConfirmStep from './Forms/ConfirmStep';
import VerifyEmailStep from './Forms/VerifyEmailStep';

// importing questions for multi-page-form: UPDATED
import Q1_Personality from './Forms/Q1_Personality';
import Q2_Work from './Forms/Q2_Work';
import Q3_ShareAnything from './Forms/Q3_ShareAnything';
import Q4_PrimaryDiagnosis from './Forms/Q4_PrimaryDiagnosis';
import Q5_DescribeDiagnoses from './Forms/Q5_DescribeDiagnoses';
import Q6_AdditionalCancerInfo from './Forms/Q6_AdditionalCancerInfo';
import Q7_DescribeTreatments from './Forms/Q7_DescribeTreatments';
import Q8_AboutMe from './Forms/Q8_AboutMe';
import Q9_FavoriteActivities from './Forms/Q9_FavoriteActivities';
import Q10_ReasonsActive from './Forms/Q10_ReasonsActive';

import { createBrowserHistory } from 'history'

// theming specific to this wizard
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  logo: {
    width: '300px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(4),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// progress bar/steps at the top 
function getSteps() {
  return ['About Me', 'Cancer History', 'Fitness Status', 'Upload Photo', 'Submit Profile', 'Confirm Email', 'q7', 'q8', 'q9', 'q10'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Q1_Personality/>;
    case 1:
      return <Q2_Work/>;
    case 2:
      return <Q3_ShareAnything/>;
    case 3:
        return <Q4_PrimaryDiagnosis/>;
    case 4:
        return <Q5_DescribeDiagnoses/>;
    case 5:
        return <Q6_AdditionalCancerInfo/>;
    case 6:
        return <Q7_DescribeTreatments/>;
    case 7:
        return <Q8_AboutMe/>;
    case 8:
        return <Q9_FavoriteActivities/>;
    case 9:
        return <Q10_ReasonsActive/>;
    
    case 10:
      return <UploadPhoto fromWizard={true} />;
    case 11:
      return <ConfirmStep />;
    case 12:
      return <VerifyEmailStep />;
  
    // Old steps that can be observed
    // case 8:
    //   return <AboutStep />;
    // case 9:
    //   return <CancerStep />;
    // case 10:
    //   return <FitnessStep />;

    default:
      return 'Unknown step';
  }
}

export default function About() {
  const history = createBrowserHistory({ forceRefresh: true });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  let { stepId } = useParams();
  
  const handleLogout = async e => {
    e.preventDefault();
    history.push("/logout");
  }

  const ForwardUserToLogout = () => {
    return ( 
        <div>
            <form onSubmit={handleLogout}>
                <Button
                    type='submit'
                    value='login'
              >Logout</Button>
            </form>
            <br/>
        </div>
      
    )
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(parseInt(stepId));
  //const [activeStep, setActiveStep] = React.useState(parseInt(step));
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollToTop();
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  
// Entire Complete Profile Page 
  return (

    <div className="question-flex-container">
    <Paper className="question-container">
    <div className={classes.root}>
      {/* <img src={UnsIcon} className={classes.logo} /> */}
      {/* <h2>Create Your Profile</h2> */}
      {/* <ForwardUserToLogout /> */}

      {/* Progress at Top */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              {/* *<div>
                <Button
                  margin="2em 1.5em"
                  padding="10px 20px"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
              </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  margin="2em 1.5em"
                  padding="10px 20px"
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div> * */}
            </div>
          )}
      </div>
    </div>
    </Paper>
    </div>
  );

}