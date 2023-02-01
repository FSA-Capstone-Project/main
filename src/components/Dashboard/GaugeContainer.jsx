import React from "react";
import { Typography, Grid, Box } from "@mui/material";


function GaugeContainer() {
  return (
    <Box>
      <Grid container justifyContent='space-around' spacing={2} xs={12} md={10} margin="auto" bgcolor='purple'>
        <Grid item xs={3}   bgcolor="#16161a" borderRadius="15px" height='300px'>
          <Typography variant="h3">Some Graph</Typography>
          <Typography variant="darktext">
            {` Wow look at you douchbag. ChatGpt `}
          </Typography>
        </Grid>
        <Grid item  xs={3}  bgcolor="#16161a" borderRadius="15px" height='300px'>
          <Typography variant="h3">Some other Graph</Typography>
          <Typography variant="darktext">
            {` Damn, you still fuckin suck. ChatGpt`}
          </Typography>
        </Grid>
        <Grid item  xs={3}  bgcolor="#16161a" borderRadius="15px" height='300px'>
          <Typography variant="h3">Some other Graph</Typography>
          <Typography variant="darktext">
            {` Damn, you still fuckin suck. ChatGpt`}
          </Typography>
        </Grid>
        <Grid item  xs={3}  bgcolor="#16161a" borderRadius="15px" height='300px'>
          <Typography variant="h3">Some other Graph</Typography>
          <Typography variant="darktext">
            {` Damn, you still fuckin suck. ChatGpt`}
          </Typography>
        </Grid>



      </Grid>
    </Box>
  )
}

export default GaugeContainer

