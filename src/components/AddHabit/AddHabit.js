import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button, TextField, Box, Typography } from "@mui/material/";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddHabit = () => {

  const [input, setInput] = useState({ title: "", goal: 0, progress: 0});
  const [date, setDate] = useState(null)

  const addHabit = () => {
    setDoc(
      doc(db, "users", `${auth.currentUser.email}`, "habits", `${input.title}`),
      {
        title: input.title,
        goal: parseInt(input.goal),
        progress: parseInt(input.progress),
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
        borderRadius="20px"
        alignItems="center"
        justifyContent="center"
        height="300px"
        width="300px"
      >
        <Typography variant="darktext" sx={{ fontSize: "25px" }}></Typography>
        <Typography variant="purple" sx={{ fontSize: "2em", margin: "5px" }}>
          Add New Habit
        </Typography>

        <TextField //Name
          variant="outlined"
          size="small"
          name="title"
          placeholder="Habit Name"
          sx={{ margin: ".5px", bgcolor: "#fffffe", borderRadius: "9px" }}
          type="text"
          onChange={handleChange}
          value={input.title}
          // inputProps={{ type: "text", value: input.title }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} style={{ backgroundColor: "#fffffe"}}>
          <DatePicker
            label="Goal Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue.$d);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField //email
          variant="outlined"
          size="small"
          name="goal"
          placeholder="Goal (Number)"
          sx={{ margin: "7px", bgcolor: "#fffffe", borderRadius: "9px" }}
          type="number"
          onChange={handleChange}
          value={input.goal}
          // inputProps={{ type: "number", value: input.goal }}
        />

        <TextField
          variant="outlined"
          size="small"
          sx={{ margin: "1px", bgcolor: "#fffffe", borderRadius: "9px" }}
          name="progress"
          placeholder="Progress"
          onChange={handleChange}
          value={input.progress}
          type="number"
          // inputProps={{ type: "number", value: input.progress }}
        />

        <Button
          size="small"
          variant="contained"
          sx={{ margin: 2 }}
          onClick={addHabit}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddHabit;
