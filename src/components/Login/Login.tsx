import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Button, Input, TextField, Box} from "@mui/material/";

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
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(`Logged in with: ${user.email}`)
      navigate('/home')
    })
    .catch(error => alert(error.message))
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

  //for styling.. the whole dom needs a bg color and each componentent will
  // be colored to give contrast

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="red"
        alignItems="center"
        height="400px"
        width="250px"
      >
        {/* <form onSubmit={handleSignUp}> */}
        <h1>Sign In</h1>
        <div>
          <TextField
            color="primary"
            variant="outlined"
            size="small"
            name="email"
            placeholder="Email"
            type="text"
            onChange={handleChange}
            value={input.email}
          />
        </div>
        <div>
          <TextField
            color="primary"
            variant="outlined"
            size="small"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={input.password}
            type="password"
          />
        </div>

        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button size="small" variant="contained" onClick={handleLogin}>
            Sign In
          </Button>
        </Link>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button
            sx={{ margin: 3 }}
            size="small"
            variant="contained"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Link>
        {/* <Button title="signUp" variant='contained' type="submit">
            Sign Up
          </Button> */}
        {/* </form> */}
        {/* <button onClick={signInWithGoogle}>Sign In With Google</button> */}
      </Box>
    </>
  );
};

export default Login;
