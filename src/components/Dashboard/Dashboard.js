import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { Navbar } from "../../components";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Guage from "../Guage/Guage";
import { Paper } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Chart from "../Chart/Chart";

const Dashboard = () => {

  return (
    <>
      <Grid container spacing={6} margin={2} borderRadius={'10px'} s>

        <Grid>
            <Guage habit="water" title="Water Intake"/>
        </Grid>

        <Grid>
            <Guage habit = "running" title="Run Progress"/>
        </Grid>

      </Grid>
    </>
  );
};

export default Dashboard;
