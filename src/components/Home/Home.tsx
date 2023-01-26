import React, { useEffect } from "react";
import { Box } from "@mui/material/";
import Navbar from "../Navbar/Navbar";
import { app, auth, db } from "../../firebase";
import { collection, doc } from "firebase/firestore";

const Home = () => {

  useEffect(() => {
    app
      .firestore()
      .collection("users").doc(`${auth.currentUser.email}`) //user instance
      .collection("habits")
      .get()
      .then((querySnapshot: Array<any>) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          console.log(data)
        });
      });
  }, []);


  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      <Box></Box>
    </Box>
  );
};

export default Home;
