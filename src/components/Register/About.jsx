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
import AboutStep from './Forms/AboutStep';
import CancerStep from './Forms/CancerStep';
import FitnessStep from './Forms/FitnessStep';
import UploadPhoto from '../manageProfile/UploadPhoto'
import ConfirmStep from './Forms/ConfirmStep';
import VerifyEmailStep from './Forms/VerifyEmailStep';
import { createBrowserHistory } from 'history'

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

function getSteps() {
  //return ['About Me', 'Cancer History', 'Fitness Status', 'Upload Photo', 'Confirm Email', 'Verify Email'];
  return ['About Me', 'Cancer History', 'Fitness Status', 'Upload Photo', 'Submit Profile', 'Confirm Email'];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AboutStep />;
    case 1:
      return <CancerStep />;
    case 2:
      return <FitnessStep />;
    case 3:
      return <UploadPhoto fromWizard={true} />;
    case 4:
      return <ConfirmStep />;
    case 5:
      return <VerifyEmailStep />;
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
  

  return (

    <div className={classes.root}>
      <img src={UnsIcon} className={classes.logo} />
      <h2>Create Your Profile</h2>
      <ForwardUserToLogout />
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
              {/**<div>
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
              </div> **/}
            </div>
          )}
      </div>
    </div>

  );

}