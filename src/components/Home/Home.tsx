import React, { useEffect } from "react";
import { Box } from "@mui/material/";
import Navbar from "../Navbar/Navbar";
import { app, auth, db } from "../../firebase";
import { collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    app
      .firestore()
      .collection("users").doc(`${auth.currentUser.email}`) //user instance
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          console.log(data)
        });
      });
      console.log(auth.currentUser)
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
    </Box>
  );
};

export default Home;
