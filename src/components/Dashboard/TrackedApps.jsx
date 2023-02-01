import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import LineChart from "./LineChart/LineChart";
import data from "./LineChart/LineChartData";

function TrackedApps() {
  return (
    <Box>
      <Grid container justifyContent='space-around' spacing={2} xs={12} md={10} margin="auto" bgcolor='purple'>
        <Grid item xs={6}   bgcolor="#16161a" borderRadius="15px" height='300px'>
          <LineChart data={data}/>
        </Grid>
        <Grid item  xs={4}  bgcolor="#16161a" borderRadius="15px" height='300px'>
          <Typography variant="h3">Some other Graph</Typography>
          <Typography variant="darktext">
            {` Damn, you still fuckin suck. ChatGpt`}
          </Typography>
        </Grid>



      </Grid>
    </Box>
  );
}

export default TrackedApps;
