import React, { useEffect, useState } from "react";
import Header from "../Header";
import { app, auth } from "../../firebase";
import TrackedApps from "./TrackedApps";
import GaugeContainer from "./GaugeContainer";
import { Grid, Box } from "@mui/material";
import Voice  from "../../API/openAi/aIServices";
import Picture from "../../API/openAi/Picture";
import AiBanner from "../Ai/AiBanner";


const Dashboard = () => {

  const title = 'Analytics'

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

  return (
    <>

        <Grid container spacing={2}  width='100%' >
        {/* First Row */}
            <Grid item xs={12} md={12} >
          <Header title={title} zIndex='100' />
          <Voice />
          <Picture />
          <AiBanner/>
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
