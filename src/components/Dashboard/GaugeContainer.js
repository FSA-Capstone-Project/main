import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import LargeGuage from "../Guages/LargeGuage";
import { useMediaQuery } from "@mui/material/";
import { app, auth } from "../../firebase";

function GaugeContainer() {

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState()


  const updateProgress = (prog)=>{
   setProgress(prog)
  }

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
  }, [progress]);

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
          ? habits.slice(0, 4).map((habit) => {
              return (
                <Grid item xs={3} borderRadius="15px" key={habit.id}>
          <LargeGuage habit={habit.id} title={habit.title} goal={habit.goal} progress={habit.progress} due={habit.due} fn={updateProgress}/>
           </Grid>
              );
            })
          : null}



      </Grid>
    </Box>
  );
}

export default GaugeContainer;
