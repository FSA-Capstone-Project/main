import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Button, Input, TextField, Box } from "@mui/material/";



const styles = {
  paragraph: '#94a1b2',
  button: '#7f5af0'
}

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleSignUp = (e) => {
    e.preventDefault();
    let email = input.email.toLowerCase().trim();
    let password = input.password;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Registered with: ${user.email}`);
      })
      .then(() => {
        addDoc(collectionRef, {
          email: input.email,
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // alert("login");


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

  const signInWithGoogle = () => {
    const Auth = getAuth();
    signInWithPopup(Auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(()=>{

  },[])


  //for styling.. the whole dom needs a bg color and each componentent will
  // be colored to give contrast

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
          onClick={handleLogin}
        >
          Sign In
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
  );
};

export default Login;
