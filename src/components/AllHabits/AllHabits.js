import React, { useEffect, useState } from 'react';
import { db, auth, app } from '../../firebase';
import Grid from '@mui/material/Grid';
import { AddHabit } from "../../components";
import { Button, Box } from "@mui/material";


const AllHabits = () => {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
            id: doc.id, //key: doc.data().createdAt,
            title: doc.data().title,
            goal: doc.data().goal,
            progress: doc.data().progress,
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, [])

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const updateHabit = () => {
    console.log("update habit");
  };

  return (
    <Box sx={{ flexGrow: 1, contain: "content", justifyContent:"center", alignItems:"center" }}>
    {/* Added the width in Home.js for this BOX */}
      <Box display="flex" alignItems="center" justifyContent="center">
        <h1 style={{ color: "pink", margin: 10 }}>Your habits!</h1>
        {/* This is the overall name of the page */}
      </Box>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 10 }}>
        <Button
          size="small"
          variant="contained"
          style={{ margin: 6, padding: 2 }}
          onClick={showFormHandler}
        >
          Add Habit
        </Button>
        {showForm && <AddHabit />}
      </Box>
      {habits.length ? (
        habits.map((habit) => (
            <Grid containerSpacing={6} margin={2} borderRadius={"20px"} justify="center" alignItems="center">
              <Grid item xs={6} md={12} bgcolor='yellow'>
                <h3 style={{ color: "red" }}>{`${habit.title}`}</h3>
                {/* These are the individual habits */}
                <Button
                  size="small"
                  variant="contained"
                  style={{ margin: 4, padding: 2 }}
                  onClick={updateHabit}
                >
                {`${habit.progress}`}
                </Button>
              </Grid>
            </Grid>
        ))
      ) : (
        <Grid>
          <h3 style={{ color: "white" }}>You have no habits to display!</h3>
        </Grid>
      )}
    </Box>
  );
}

export default AllHabits;

