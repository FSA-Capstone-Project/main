import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Button, Input, TextField, Box } from "@mui/material/";

import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

const styles = {
  paragraph: "#94a1b2",
  button: "#7f5af0",
};

const LoginForm = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [toggleLoginForm, setLoginForm] = useState(true);
  const collectionRef = collection(db, "users");

  const switchForm = ()=>{
    setLoginForm(!toggleLoginForm)
  }

  //for styling.. the whole dom needs a bg color and each componentent will
  // be colored to give contrast

  return (
    <>
      {toggleLoginForm ? (
        <Login switchForm={switchForm}/>
      ) : (
        <SignUp switchForm={switchForm} />
      )}
    </>
  );
};

export default LoginForm;
