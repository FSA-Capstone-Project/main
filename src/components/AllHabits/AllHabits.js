import React, { useEffect, useState } from 'react';
import { auth, app } from '../../firebase';
import Grid from '@mui/material/Grid';
import { AddHabit } from "../../components";
import { Button, Box } from "@mui/material";
import UpdateHabit from "../UpdateHabit/UpdateHabit";
import Header from "../Header";

const AllHabits = () => {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const title = 'All Habit'

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
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, [])

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const changeHabit = (habit) => {
    setSelectedHabit(habit);
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <Box sx={{
      flexGrow: 1,
      contain: "content",
      justifyContent: "center",
      alignItems: "center",
       width: "100%",
       maxHeight: "100%",
       bgcolor: "#1e1e2b",
       overflow: 'auto'
    }}>
      <Header  title={title}/>
      <Grid style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 10, borderRadius: "20px" }}>
        <Button
          size="small"
          variant="contained"
          style={{ margin: 6, padding: 2 }}
          onClick={showFormHandler}
        >
          Add Habit
        </Button>
        {showForm && <AddHabit />}
      </Grid>

      {habits.length ? (
        habits.map((habit) => (
          <Grid containerSpacing={6} margin={2} borderRadius={"20px"} justify="center" alignItems="center">
            <Grid item xs={6} md={12} bgcolor="#26293c">
              <h3 style={{ color: "whitesmoke" }}>{`${habit.title}`}</h3>
              {/* These are the individual habits */}
              <Button
                size="small"
                variant="contained"
                style={{ margin: 4, padding: 2, color: "limegreen" }}
                onClick={() => changeHabit(habit)}
              >
                {`${Math.round((habit.progress / habit.goal) * 100)}%`}
              </Button>
              {showUpdateForm && <UpdateHabit habit={selectedHabit} />}
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
