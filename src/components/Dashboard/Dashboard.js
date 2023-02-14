import React from "react";
import Header from "../Header";
import TrackedApps from "./TrackedApps";
import GaugeContainer from "./GaugeContainer";
import { Grid, Box } from "@mui/material";
import Picture from '../../API/openAi/Picture'

const Dashboard = () => {
  const title = 'Analytics'

  return (
    <>
      <Grid container spacing={2}  width='100%' >
        {/* First Row */}
        <Grid item xs={12} md={12} >
          <Header title={title} zIndex='100'/>
        </Grid>
        <Box ml='3rem'>
          {/* <Picture /> */}
        </Box>
        {/* Second Row */}
        <Grid item xs={12} md={12}>
          <TrackedApps />
        </Grid>
        <Grid item xs={12} md={12} height='100%' >
          <GaugeContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
