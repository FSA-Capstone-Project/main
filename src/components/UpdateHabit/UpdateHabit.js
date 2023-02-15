import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { Button, TextField, Box, Typography } from "@mui/material/";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const UpdateHabit = ({ habit, setHabit, setShowUpdateForm, showUpdateForm }) => {
  const [input, setInput] = useState({
    title: habit.title,
    goal: habit.goal,
    progress: habit.progress,
    due: habit.due,
  });
  const [date, setDate] = useState(habit.due);

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput({ ...input, [event.target.name]: event.target.value });
    updateHabit();
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const updateHabit = async () => {
    setShowUpdateForm(!showUpdateForm)
    const timestamp = date;
    const habitRef = db.doc(
      `users/${auth.currentUser.email}/habits/${habit.id}`
    );
    const habitDoc = await habitRef.get();
    if (habitDoc.exists) {
      habitRef
      .update({
        title: input.title,
        goal: input.goal,
        progress: input.progress,
        due: timestamp,
      })
      .then(() => {
        console.log("Habit updated successfully");
      })
      .catch((error) => {
        console.error("Error updating habit: ", error);
      });
    } else {
      habitRef
      .set({
        title: input.title,
        goal: input.goal,
        progress: input.progress,
        due: timestamp,
      })
      .then(() => {
        console.log("Habit created successfully");
      })
      .catch((error) => {
        console.error("Error creating habit: ", error);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
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
          marginBottom="10px"
          marginTop="10px"
          marginRight="9px"
          >
          <Typography variant="purple" sx={{ fontSize: "2em", margin: "5px" }}>
            Update Your Habit
          </Typography>

          <TextField //Name
            variant="outlined"
            size="small"
            sx={{ margin: "5px" }}
            label="Habit Name"
            focused
            name="title"
            inputProps={{ style: { color: "#7f5af0" } }}
            value={input.title}
            onChange={handleChange}
            />
          <TextField //Goal
            focused
            variant="outlined"
            size="small"
            sx={{ margin: "5px" }}
            label="Goal"
            inputProps={{ style: { color: "#7f5af0" } }}
            name="goal"
            value={input.goal}
            onChange={handleChange}
            />
          <TextField //Progress
            focused
            variant="outlined"
            size="small"
            sx={{ margin: "5px" }}
            label="Progress"
            name="progress"
            inputProps={{ style: { color: "#7f5af0" } }}
            value={input.progress}
            onChange={handleChange}
            />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{width: '60px'}}
            >
            <DatePicker
            focused
            variant="warning"
            label="Due Date"
            size='s'
            value={date}
            inputProps={{
              style: {color: "#7f5af0" },
            }}
            onChange={(newValue) => {
              setDate(newValue.$d);

            }}
            renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            type="submit"
            onClick={updateHabit}
            variant="contained"
            sx={{ margin: "5px", padding: "4px", marginBottom: "12px" }}
            endIcon={<AccessibleForwardIcon />}
            >
            Update
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UpdateHabit;
