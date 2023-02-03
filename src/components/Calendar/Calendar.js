import React, { useState } from "react";
import { Box } from "@mui/material";
import Calendar from "react-calendar";

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());

  const whenChanged = date => {
    setDate(date)
  }

  return (
    <Box>
      <Calendar showWeekNumbers onChange={whenChanged} value={date}/>
        {date.toString()}
    </Box>
  )
}

export default InteractiveCalendar;
