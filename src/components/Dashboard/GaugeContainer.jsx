import React,{useState, useEffect} from "react";
import { Typography, Grid, Box } from "@mui/material";
import { app, auth, db } from "../../firebase";
import LargeGuage from "../Guages/LargeGuage";

function GaugeContainer(props) {

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
    <Box>
      <Grid container justifyContent='space-around' spacing={2} xs={12} md={10} margin="auto">
        {habits.length ? habits.slice(0,4).map((habit)=> {
          return(
        <Grid item xs={3} borderRadius="15px" height='300px'>
          <LargeGuage habit={habit.id} title={habit.title} due={habit.due}/>
           </Grid>
          )
        }):null
        }
      

      </Grid>
    </Box>
  )
}

export default GaugeContainer

