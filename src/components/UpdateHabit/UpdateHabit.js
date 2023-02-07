import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { Button, TextField, Box, Typography } from "@mui/material/";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UpdateHabit = () => {
  const [input, setInput] = useState({ title: "", goal: null, progress: null, due: null });
  const [date, setDate] = useState(null)

  const changeHabit = () => {
    const timestamp = date.toDate();
    db.doc(`users/${auth.currentUser.email}/habits/${input.title}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref.update({
            goal: input.goal,
            progress: input.progress,
            due: timestamp
          })
            .then(() => {
              console.log("Habit updated successfully");
            })
            .catch((error) => {
              console.error("Error updating habit: ", error);
            });
        } else {
          doc.ref.set({
            goal: input.goal,
            progress: input.progress,
            due: timestamp
          })
            .then(() => {
              console.log("Habit created successfully");
            })
            .catch((error) => {
              console.error("Error creating habit: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error getting habit: ", error);
      });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box // login-card
      display="flex"
      // flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#16161a"
        borderRadius="15px"
        alignItems="center"
        justifyContent="center"
        height="300px"
        width="300px"
        marginBottom="20px"
      >
        <Typography variant="darktext" sx={{ fontSize: "25px" }}></Typography>
        <Typography variant="purple" sx={{ fontSize: "2em", margin: "5px"}}>
          Update Your Habit
          {/* {`${habit.title}`} */}
        </Typography>

        <TextField //Name
          variant="outlined"
          size="small"
          sx={{ margin: "5px" }}
          label="Habit Name"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <TextField //Goal
          variant="outlined"
          size="small"
          sx={{ margin: "5px" }}
          label="Goal"
          name="goal"
          value={input.goal}
          onChange={handleChange}
        />
        <TextField //Progress
          variant="outlined"
          size="small"
          sx={{ margin: "5px" }}
          label="Progress"
          name="progress"
          value={input.progress}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ margin: "5px", padding: "4px", marginBottom: "12px" }}
          onClick={changeHabit}
          endIcon={<AccessibleForwardIcon />}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateHabit;
