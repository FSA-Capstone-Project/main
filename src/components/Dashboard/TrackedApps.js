import React,{useEffect, useState} from "react";
import { Typography, Grid, Box } from "@mui/material";
import LineChart from "./LineChart/LineChart";
import data from "./LineChart/LineChartData";
import LiquidGuage from "../Guages/LiquidGuage";
import { useMediaQuery } from "@mui/material/";


import { OneKPlusOutlined } from "@mui/icons-material";
import { connectFirestoreEmulator } from "firebase/firestore";

function TrackedApps() {
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // const [habit, setHabit] = useState(null);

  // useEffect(() => {
  //   console.log(props.data)
  //   const water = props.data.find(element => element.title === "Water")
  //   setHabit(water)
  // }, [props.data]);

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
        <Grid item xs={6} bgcolor="#16161a" borderRadius="15px" height="300px">
          {/* <LineChart data={data}/> */}
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
