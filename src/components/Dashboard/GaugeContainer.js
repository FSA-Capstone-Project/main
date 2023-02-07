import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import LargeGuage from "../Guages/LargeGuage";
import { useMediaQuery } from "@mui/material/";
import { app, auth } from "../../firebase";

function GaugeContainer() {

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [habits, setHabits] = useState([]);

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

  return (
    <Box  >
      <Grid
        container
        // justifyContent="space-around"
        spacing={2}
        xs={12}
        md={10}
        margin="auto"
        height='100%'
        direction={largeScreen ? "row" : "column"}
        flexWrap='wrap'

      >
        {habits.length
          ? habits.slice(0, 10).map((habit) => {
              return (
                <Grid item xs={3} borderRadius="15px" >
          <LargeGuage habit={habit.id} title={habit.title} goal={habit.goal} progress={habit.progress} due={habit.due}/>
           </Grid>
              );
            })
          : null}



      </Grid>
    </Box>
  );
}

export default GaugeContainer;
