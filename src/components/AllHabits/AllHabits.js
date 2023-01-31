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

  return (
    <>
      {habits.length ? (
        habits.map((habit) => (
          <Box
            sx={{ flexGrow: 1 }}
            display= "flex"
            alignItems= "center"
            justify= "center"
            width="100vw"
            height="10vh"
            bgcolor="#242629"
          >
            <Grid container spacing={6} margin={2} borderRadius={"10px"} justify="center" alignItems="center">
              <Grid item xs={6} md={12}>
                <h3 style={{ color: "red" }}>{`${habit.title}`}</h3>
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <Grid>
          <h3 style={{ color: "white" }}>You have no habits to display!</h3>
        </Grid>
      )}
      <Button
        size="small"
        variant="contained"
        style={{ margin: 2 }}
        onClick={showFormHandler}
      >
        Add Habit
      </Button>
      {showForm && <AddHabit />}
    </>
  );
}

export default AllHabits;
