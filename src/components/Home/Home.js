import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import RunGuage from "../Guage/Guage";
import { Paper } from "@mui/material/";
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles';
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  //write me code that display different tabs such as all habits, add habit, etc. using useState and set view
  const [view, setView] = useState("allHabits");
  const [habits, setHabits] = useState([]);

  // useEffect(() => {
  //   const data = [];
  //   app
  //     .firestore()
  //     .collection("users")
  //     .doc(`${auth.currentUser.email}`)
  //     .collection("habits")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.docs.forEach((doc) => {
  //         let habit = {
  //           id: doc.id,
  //           title: doc.data().title,
  //           goal: doc.data().goal,
  //           progress: doc.data().progress,
  //         };
  //         data.push(habit);
  //         setHabits(data);
  //       });
  //     });
  // }, []);


  // const AllHabits = () => {


  //if clicked then i want blank info to show up from this page
  //   return (//if dashboard is clicked === want dashboard logic to show up)

  if(view === "allHabits") {
    




  return (
    <>
    <Box display='flex'>
            <Navbar/>
            <Dashboard />
      </Box>
    </>
  );
};

export default Home;
