import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc,  } from "firebase/firestore";
=======
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
>>>>>>> d91fd5391458807cf4d538535a767c17f019dd02
import { Button, Input, TextField, Box } from "@mui/material/";

import SignUp from "../SignUp/SignUp";

const styles = {
  paragraph: '#94a1b2',
  button: '#7f5af0'
}





const Login = ({switchForm})=>{

  const [input, setInput] = useState({ email: "", password: "" });
<<<<<<< HEAD
  const collectionRef = collection(db, "users");

  const navigate = useNavigate();

=======

  const navigate = useNavigate();
>>>>>>> d91fd5391458807cf4d538535a767c17f019dd02


  // SIGN UP ==========
  const handleSignUp = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log('form switched')
    switchForm()

=======
    let email = input.email.toLowerCase().trim();
    let password = input.password;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Registered with: ${user.email}`);
      })
      .then(() => {
        setDoc(doc(db, 'users', `${input.email}`), {
          email: input.email,
        });
      })
      .catch((error) => alert(error.message));
>>>>>>> d91fd5391458807cf4d538535a767c17f019dd02
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

<<<<<<< HEAD


  useEffect(()=>{

  },[])

=======
>>>>>>> d91fd5391458807cf4d538535a767c17f019dd02
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
        <Box component='p' sx={{ color: styles.paragraph, fontSize:'25px', margin:'0'}}>logo</Box>
        <Box component='p' sx={{ color: styles.paragraph, fontSize:'25px' }}>Sign In</Box>

        <TextField //email
          variant="outlined"
          size="small"
          name="email"
          placeholder="Email"
          sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
          type="text"
          onChange={handleChange}
          value={input.email}
        />

        <TextField //password
          // color="primary"
          variant="outlined"
          size="small"

          sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
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
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
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
          <Box component='p' sx={{ color: styles.paragraph, fontSize:'15px' }}>Need an Account?

          <Button
            sx={{ margin: 0.4, color: styles.button}}
            size="small"
            variant="text"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          </Box>


        </Box>
      </Box>
    </Box>

  )
}

export default Login
