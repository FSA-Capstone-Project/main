import React, { useEffect } from "react";
import { Box } from "@mui/material/";
import { Navbar } from '../../components'
import { app, auth, db } from "../../firebase";
import { collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import AddHabit from "../AddHabit/AddHabit";
import { bgcolor, display } from "@mui/system";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`) //user instance
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          console.log(data);
        });
      });
    console.log(auth.currentUser);
  }, []);

  return (
    <>
    <Box sx={{ height: "100vh", display:'flex', justifyContent:"space-between"}} >
      <Box sx={{ display: "inline-flex" }}>
        <Navbar />
      </Box>
      <Box sx={{ display: "inline-flex" }} >
        <AddHabit />
      </Box>
    </Box>
      <div className="test">YOOOOO</div>
    </>
  );
};

export default Home;
