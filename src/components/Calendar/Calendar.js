import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { auth, app } from "../../firebase";
import "./Calendar.css";
import SmallGuage from "../Guages/SmallGuage";

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [habits, setHabits] = useState([]);

  const whenChanged = (date) => {
    setDate(date);
  };

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
    <>
      {/* TOP WITH CALENDER */}
      <Box
        height="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Calendar onChange={whenChanged} value={date} calendarType={"US"} />
      </Box>
      {/* BOTTOM WITH DAY INFO */}
      <Box height="50%" display="flex" flexDirection="column">
        {/* Card */}
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          margin="2rem auto"
          overflow='auto'
          width="100vh"
          bgColor="#16161a"
          borderRadius="3rem"
        >
          {/*Date */}
          <Box>
            <Typography
              variant="h1"
              width="fit-content"
              margin="auto"
              height="auto"
              alignContent="center"
            >
              {date.toDateString()}
            </Typography>
          </Box>
          {habits.map((singleHabit) => {
            if (
              singleHabit.due.toDateString().slice(4, 10) ===
              date.toDateString().slice(4, 10)
            ) {
              return (
                // Habit line card
                <Box
                  display="flex"
                  justifyContent='space-around'
                  key={singleHabit.id}
                  m="0 auto 9px auto"
                  borderRadius="1rem"
                  bgcolor="#26293c"
                  height="80px"
                  width="60%"
                  overflow='auto'
                >
                  {/* Habit title left */}
                  <Box
                    ml="8px"
                    width="20%"
                    height="100%"
                  >
                    <Typography variant="h5" sx={{textAlign:'center', mt: '1.5rem'}}>{singleHabit.title}</Typography>
                  </Box>
                  <Box
                    width="20%"
                  >
                     <SmallGuage
                      habit={singleHabit.id}
                      progress={singleHabit.progress}
                      goal={singleHabit.goal}
                    />
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </>
  );
};

export default InteractiveCalendar;
