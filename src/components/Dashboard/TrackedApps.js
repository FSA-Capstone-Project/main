import React from "react";
import { Grid, Box } from "@mui/material";
import LiquidGuage from "../Guages/LiquidGuage";
import { useMediaQuery } from "@mui/material/";
import dashLogo from '../../illistration/dashLogo.svg'

function TrackedApps() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box>
      <Grid
        container
        justifyContent="space-around"
        spacing={2}
        xs={10}
        md={10}
        margin="auto"
        direction={largeScreen ? "row" : "column"}
      >
        <Grid item xs={6}  borderRadius="15px" height="300px">
          <Box marginLeft='5rem'>
          <img src={dashLogo} />

          </Box>
          {/* <AIPhoto /> */}
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="15px"
          height="300px"
        >
          <LiquidGuage />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TrackedApps;
