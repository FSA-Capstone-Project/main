import React, { useEffect, useState } from "react";
import { auth, app } from "../../firebase";
import Grid from "@mui/material/Grid";
import { AddHabit } from "../../components";
import { Button, Box, Typography } from "@mui/material";
import GaugeContainer from "../Dashboard/GaugeContainer";
import UpdateHabit from "../UpdateHabit/UpdateHabit";
import Header from "../Header";
import SmallGuage from "../Guages/SmallGuage";
import allHabitsLogo from '../../illustration/allHabitsLogo.svg'

const AllHabits = ({ view }) => {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const title = "All Habit";

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
  }, []);

  const changeHabit = (habit) => {
    setSelectedHabit(habit);
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        contain: "content",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
        <Header title={title} />
      <Box display='flex' height='100vh'>
        {/* page left side */}
        <Box width="50%" display="flex" flexDirection="row">
          <Grid container direction="column" ml="1rem">
            {habits.length ? (
              habits.map((habit) => (
                <Grid
                  item
                  bgcolor="#26293c"
                  height="6rem"
                  m="10px"
                  borderRadius="12px"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box ml="1rem">
                    {/* left */}
                    <Typography variant="h3" pt="1.2rem">
                      {habit.title}
                    </Typography>
                  </Box>
                  <Box sx={{ paddingTop: "10px" }}>
                    {/* right */}
                    <SmallGuage
                      habit={habit.id}
                      progress={habit.progress}
                      goal={habit.goal}
                    />
                  </Box>
                  {console.log(habit)}
                </Grid>
              ))
            ) : (
              <Grid>
                <h3 style={{ color: "white" }}>
                  You have no habits to display!
                </h3>
              </Grid>
            )}
          </Grid>
        </Box>
        {/* page right side */}
        <Box width="50%" position='fixed' right='0px' top='300px' >
          <img src={allHabitsLogo} alt="" />
          {/* <Typography variant="h1" position='absolute'>right</Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default AllHabits;

// <Grid
// container
// Spacing={8}
// margin={2}
// borderRadius={"20px"}
// justify="center"
// alignItems="center"
// >
// {habits.map((habit) => (
//   <Grid item xs={6} md={12} bgcolor="#26293c" borderRadius="10px">
//     <Typography variant="h3">{`${habit.title}`}</Typography>
//     {/* These are the individual habits */}
//     <Button
//       size="small"
//       variant="contained"
//       style={{
//         margin: 4,
//         marginBottom: "10px",
//         marginTop: "6px",
//         marginLeft: "10px",
//         marginRight: "10px",
//         color: "limegreen",
//       }}
//       onClick={() => changeHabit(habit)}
//     >
//       {`${Math.round((habit.progress / habit.goal) * 100)}%`}
//     </Button>
//     {showUpdateForm && <UpdateHabit habit={selectedHabit} />}
//   </Grid>
// )
// )}
// </Grid>
