import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { auth, app } from "../../firebase";
import './Calendar.css';

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [habits, setHabits] = useState([]);

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
            due: doc.data().due.toDate(),
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, []);
  // =====================
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    className="calendarHolder">
      <Calendar onChange={whenChanged} value={date} calendarType={"US"}/>
      
      {habits.length ? (
        habits.map(singleHabit => {
          if (
            singleHabit.due.toDateString().slice(4, 10) ===
            date.toDateString().slice(4, 10)
          ) {
            return (
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <Typography>
                  {singleHabit.title}
                </Typography>
              </Box>
            );
          }
        })
      ) : (
        <Box>
          <h3 style={{ color: "blue" }}>
            You have no habits due on {date.toDateString().slice(4, 10)}
          </h3>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveCalendar;

// =======================

// const Calendar = () => {
//   const classes = useStyles();
//   const [currentEvents, setCurrentEvents] = useState([]);

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.dateStr,
//         end: selected.dateStr,
//         allDay: selected.allDay,
//       });
//     }
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event ${selected.event.title}`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="space-between">
//       <Box className={classes.eventsList}>
//         <Typography variant="h6">Events</Typography>
//         <List>
//           {currentEvents.map((event) => (
//             <ListItem key={event.id} className={classes.event}>
//               <ListItemText
//                 primary={event.title}
//                 secondary={
//                   <Typography>
//                     {formatDate(event.start, {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </Typography>
//                 }
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//       <FullCalendar
//         className={classes.calendar}
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay,listPlugin"}],
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => setCurrentEvents(events)}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Calendar;
