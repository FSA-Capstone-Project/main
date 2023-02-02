import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { Button, Input, TextField, Box, Typography } from "@mui/material/";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UpdateHabit = () => {
  const [input, setInput] = useState({ title: "", goal: null, progress: null });
  const [date, setDate] = useState(null)

  const addHabit = () => {
    setDoc(
      doc(db, "users", `${auth.currentUser.email}`, "habits", `${input.title}`),
      {
        title: input.title,
        goal: input.goal,
        progress: input.progress,
        due: date
      }
    );
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
      >
        <Typography variant="darktext" sx={{ fontSize: "25px" }}></Typography>
        <Typography variant="purple" sx={{ fontSize: "2em", margin: "5px" }}>
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
          sx={{ margin: "5px" }}
          onClick={addHabit}
          endIcon={<AccessibleForwardIcon />}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateHabit;
