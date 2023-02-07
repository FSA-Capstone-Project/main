import React, { useState } from "react";
import { Box } from "@mui/material";
import Calendar from "react-calendar";
import Header from "../Header";
import Grid from "@mui/material/Grid";

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const title = 'Calendar'

  const whenChanged = date => {
    setDate(date)
  }

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
      <Header title={title}/>
      <Grid>
      <Calendar showWeekNumbers onChange={whenChanged} value={date}/>
        {date.toString()}
      </Grid>
    </Box>
  );
}

export default InteractiveCalendar;
