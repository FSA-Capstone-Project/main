import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc,doc, setDoc } from "firebase/firestore";
import { Button, Input, TextField, Box, Typography } from "@mui/material/";


const SignUp = ({switchForm}) =>{

  const [input, setInput] = useState({ email: "", password: "", name: "", age: '' });
  const collectionRef = collection(db, "users");


  const styles = {
    paragraph: '#94a1b2',

  }


  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleLogin = (e) => {
    e.preventDefault();
    // alert("login");
    switchForm()
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let email = input.email.toLowerCase().trim();
    let password= input.password;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Registered with: ${user.email}`);
      })
      .then(() => {
        setDoc(doc(db, 'users', `${input.email}`), {
          name: input.name,
          email: input.email,
          age: input.age
        });
      })
      .catch((error) => alert(error.message));
      switchForm()
      alert("Account has been created. You can now Login!")
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
        height="500px"
        width="300px"
      >
        <Box component='p' sx={{ color: styles.paragraph, fontSize:'25px', margin:'0'}}>logo</Box>
        <Typography  sx={{ color: styles.paragraph, fontSize:'25px' }}>Sign Up</Typography>

        <TextField //Name
          variant="outlined"
          size="small"
          name="name"
          placeholder="Name"
          sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
          type="text"
          onChange={handleChange}
          value={input.name}
        />


        <TextField //Age
          variant="outlined"
          size="small"
          name="age"
          placeholder="Age"
          sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
          type="text"
          onChange={handleChange}
          value={input.age}
        />

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
        <Box
          // bgcolor='red'
          display="flex"
        >
          <Typography component='p' sx={{ color: styles.paragraph, fontSize:'15px' }}>Have an Account?

          <Button

            sx={{ margin: 0.4}}
            size="small"
            variant="text"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          </Typography>


        </Box>
      </Box>
    </Box>

  )
}

export default SignUp
