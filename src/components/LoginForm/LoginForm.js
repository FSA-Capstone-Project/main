import React, { useState } from "react";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";

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

  const switchForm = () => {
    setLoginForm(!toggleLoginForm);
  };

  //for styling.. the whole dom needs a bg color and each componentent will
  // be colored to give contrast

  return (
    <>
      <Box bgcolor="#1e1e2b">
        {toggleLoginForm ? (
          <Login switchForm={switchForm} />
        ) : (
          <SignUp switchForm={switchForm} />
        )}
      </Box>
    </>
  );
};

export default LoginForm;
