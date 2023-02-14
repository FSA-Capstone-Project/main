import React, { useState } from "react";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import { Box } from "@mui/system";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Hero from "../Login/Hero";

const styles = {
  paragraph: "#94a1b2",
  button: "#7f5af0",
};

const LoginForm = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [toggleLoginForm, setLoginForm] = useState(true);
  const collectionRef = collection(db, "users");

  const switchForm = () => {
    setLoginForm(!toggleLoginForm);
  };

  return (
    <>
      <Box bgcolor="#1e1e2b" height='200vh'>
        {toggleLoginForm ? (
          <Login switchForm={switchForm} />
        ) : (
          <SignUp switchForm={switchForm} />
        )}
        <Hero />
      </Box>
    </>
  );
};

export default LoginForm;
