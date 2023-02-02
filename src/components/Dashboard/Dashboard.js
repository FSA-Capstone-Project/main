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

import {useMediaQuery} from "@mui/material/";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));


  useEffect(() => {
    const data = [];
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let habit = {
            id: doc.id,
            title: doc.data().title,
            goal: doc.data().goal,
            progress: doc.data().progress,
            due: doc.data().due.toDate(),
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>

        <Grid container spacing={4}  width='100%' >
          {/* First Row */}
            <Grid item xs={12} md={12} >
              <Header />
            </Grid>
          {/* Second Row */}
          <Grid item xs={12} md={12}>
            <TrackedApps />
          </Grid>
          <Grid item xs={12} md={12} height='100%' >
            <GaugeContainer />
          </Grid>

        </Grid>
    </>
  );
};

export default Dashboard;

