import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { Navbar } from "../../components";
import Header from "../Header";
import { app, auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  querySnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Guage from "../Guages/SmallGuage";
import { Paper } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Chart from "../Chart/Chart";
import { data } from "autoprefixer";
import { Add } from "@mui/icons-material";
import Robot from "../../API/openAi/chatGPT";
import TrackedApps from "./TrackedApps";
import GaugeContainer from "./GaugeContainer";

const Dashboard = () => {
  
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
  //           due: doc.data().due.toDate(),
  //         };
  //         data.push(habit);
  //         setHabits(data);
  //       });
  //     });
  // }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box
        sx={{ display: "flex", flexGrow: 1, contain: "content" }}
        width="100%"
        height="100%"
      >
        <Grid container spacing={4} direction={"column"} width='100%'>
          {/* First Row */}
            <Grid item xs={12} md={12} >
              <Header />
            </Grid>
          {/* Second Row */}
          <Grid item xs={12} md={12}>
            <TrackedApps />
          </Grid>
          <Grid item xs={12} md={12}>
            <GaugeContainer />
          </Grid>
          <Grid item xs={6} md={4}>
            <Grid
              container
              spacing={10}
              margin={2}
              borderRadius={"10px"}
            ></Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

// <Grid container spacing={2}>
// <Grid item>
//   <Box width="900px" height="300px" bgcolor="blue">
//     Greeting
//   </Box>
// </Grid>
// </Grid>
{
  /* <Grid container spacing={10} margin={2} borderRadius={"10px"}>
{habits.length ? (
  habits.map((habit) => (
    <Grid item>
      <Guage habit={habit.id} title={habit.title} />
    </Grid> */
}
//   ))
// ) : (
//   <Grid>
//     <h3 style={{ color: "white" }}>You have no habits to display!</h3>
//   </Grid>
// )}
// </Grid>
// <Grid>{/* <AddHabit/> */}</Grid>
