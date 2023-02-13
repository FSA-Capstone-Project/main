import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { auth, app } from "../../firebase";
import "./Calendar.css";
import bgImg from "../../illustration/bgImg.png";
import SmallGuage from "../Guages/SmallGuage";

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  console.log(habits);

  const whenChanged = (date) => {
    setDate(date);
  };

  useEffect(() => {
    // if (!auth.currentUser) return;
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
  // =====================
  return (
    <>
      {/* TOP WITH CALENDER */}
      <Box
        height="50%"
        // style={{ borderRadius: "3rem" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Calendar onChange={whenChanged} value={date} calendarType={"US"} />
      </Box>
      {/* BOTTOM WIT DAY INFO */}
      <Box height="50%" display="flex" flexDirection="column">
        {/* card */}
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          margin="2rem auto"
          overflow='auto'
          width="100vh"
          bgcolor="#16161a"
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
                  {/* habit title left */}
                  <Box
                    ml="8px"
                    width="20%"
                    height="100%"

                  >
                    <Typography variant="h5" sx={{textAlign:'center', mt: '1.5rem'}}>{singleHabit.title}</Typography>
                  </Box>
                  <Box
                    // bgcolor='purple'
                    width="20%"
                    // height="100%"
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

// =======================
// OLD

// <Box
// variant="contained"
// backgroundColor="black"
// margin="10px 0px solid white"
// color="primary.contrastText"
// borderRadius="10px"
// >
// <Typography padding="20px">{singleHabit.title}</Typography>
// </Box>

// <Box
// className="calendarHolder"
// display="flex"
// justifyContent="center"
// alignItems="center"
// bgcolor="#1e1e2b"
// sx={{
//   backgroundImage: `url(${bgImg})`,
//   width: "100%",
//   backgroundRepeat: "no-repeat",
//   flexGrow: 1,
//   backgroundSize: "cover",
// }}
// >
// {/* <Calendar onChange={whenChanged} value={date} calendarType={"US"} /> */}
// </Box>
// <Box
// className="calendarHolder"
// display="flex"
// justifyContent="center"
// alignItems="center"
// >
// {habits.map((singleHabit) => {
//   if (
//     singleHabit.due.toDateString().slice(4, 10) ===
//     date.toDateString().slice(4, 10)
//   ) {
//     console.log(singleHabit);
//     return (
//       <Box height="100vh" width="100vh" bgcolor="blue">
//         <Box
//           variant="contained"
//           backgroundColor="black"
//           margin="10px 0px solid white"
//           color="primary.contrastText"
//           borderRadius="10px"
//         >
//           <Typography padding="20px">{singleHabit.title}</Typography>
//         </Box>
//       </Box>
//     );
//   }
// })}
// </Box>
