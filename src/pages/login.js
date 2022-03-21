import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import React from "react";
import SignIn2 from "../components/LogIn/SignIn2";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import collage from "../images/new2UCollage.png";
import { makeStyles } from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';
import {useDataStore} from "../UserContext";


function Copyright() {
  return (
    <p variant="body2" style={{ color: "#FFFFFF" }} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://2Unstoppable.org/">
        2Unstoppable
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundColor: "transparent"
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const storedData = localStorage.getItem("userStore");
  const store = useDataStore();

  if (!(!storedData && ((store && !store.isLoggedIn)))) {
    return <Redirect to="/home" />
  }

  return (
    <Container maxWidth="xl" className={classes.image}>
      {/* <CssBaseline /> */}
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <SignIn2 />
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
