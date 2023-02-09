import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { auth, app } from "../../firebase";
import Calendar from "react-calendar";
import Header from "../Header";
import Grid from "@mui/material/Grid";
import 'react-calendar/dist/Calendar.css';

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const title = 'Calendar'
  // const [habits, setHabits] = useState([]);
  // console.log(habits)

  const whenChanged = date => {
    setDate(date)
  }


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
    <Box sx={{
      flexGrow: 1,
      contain: "content",
      justifyContent: "center",
      alignItems: "center",
       width: "100%",
       maxHeight: "100%",
      //  bgcolor: "#1e1e2b",
       overflow: 'auto'
    }}>
      <Header title={title}/>
      <Grid sx={{
        marginTop: "5rem",
       marginLeft: "30px",

     }}>
      <Calendar showWeekNumbers onChange={whenChanged} value={date}/>
        {date.toString()}
      </Grid>
    </Box>
  );
}

export default InteractiveCalendar;
