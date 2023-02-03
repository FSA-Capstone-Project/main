import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Button, Input, TextField, Box, Typography } from "@mui/material/";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";

const styles = {
  paragraph: "#94a1b2",
  button: "#7f5af0",
};

const Login = ({ switchForm }) => {
  const [input, setInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // SIGN UP ==========
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("form switched");
    switchForm();
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let email = input.email.toLowerCase().trim();
    let password = input.password;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with: ${user.email}`);
        navigate("/home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Box // login-card
      display="flex"
      // flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box // this is the login form
        display="flex"
        flexDirection="column"
        bgcolor="#16161a"
        borderRadius="15px"
        alignItems="center"
        justifyContent="center"
        height="400px"
        width="300px"
      >
        <Typography variant="darktext" sx={{ fontSize: "25px" }}>
          <AccessibleForwardIcon sx={{ fontSize: "2em" }} />
        </Typography>
        <Typography variant="purple" sx={{ margin: "5px", fontSize: "2em" }}>
          Sign In
        </Typography>

        <TextField //email
          variant="outlined"
          size="small"
          name="email"
          placeholder="Email"
          sx={{ margin: 1, bgcolor: "#fffffe", borderRadius: "9px" }}
          type="text"
          onChange={handleChange}
          value={input.email}
        />

        <TextField //password
          // color="primary"
          variant="outlined"
          size="small"
          sx={{ margin: 1, bgcolor: "#fffffe", borderRadius: "9px" }}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={input.password}
          type="password"
        />

        <Button
          size="small"
          variant="contained"
          sx={{ margin: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box
          // bgcolor='red'
          display="flex"
        >
          <Typography variant="darktext" sx={{ fontSize: "15px" }}>
            Need an Account?
            <Button
              sx={{ margin: 0.4 }}
              size="small"
              variant="text"
              onClick={handleSignUp}
            >
              <Typography variant="purple">Sign Up</Typography>
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
