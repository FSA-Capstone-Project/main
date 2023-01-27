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
import RunGuage from "../RunGuage/RunGuage";

const Home = () => {

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "inline-flex" }}>
          <Navbar />
        </Box>
        <Box sx={{ display: "inline-flex" }}>
          <AddHabit />
        </Box>
        <RunGuage/>
      </Box>
    </>
  );

}

export default Home;
