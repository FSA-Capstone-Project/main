import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import LargeGuage from "../Guages/LargeGuage";
import { useMediaQuery } from "@mui/material/";

function GaugeContainer(props) {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(props.data)
  }, [props.data]);

  return (
    <Box  >
      <Grid
        container
        // justifyContent="space-around"
        spacing={2}
        xs={12}
        md={10}
        margin="auto"
        height='100%'
        direction={largeScreen ? "row" : "column"}
        flexWrap='wrap'

      >
        {habits.length
          ? habits.slice(0, 4).map((habit) => {
              return (
                <Grid item xs={3} borderRadius="15px" >
          <LargeGuage habit={habit.id} title={habit.title} goal={habit.goal} progress={habit.progress} due={habit.due}/>
           </Grid>
              );
            })
          : null}



      </Grid>
    </Box>
  );
}

export default GaugeContainer;
