import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Paper } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Dashboard from "../Dashboard/Dashboard";
import MemoryGame from "../MemoryGame/MemoryGame"
import {
  Button,
  Input,
  TextField,
  Box,
  Icon,
  Typography,
} from "@mui/material/";
import RocketRoundedIcon from "@mui/icons-material/RocketRounded";
import MemorySharpIcon from '@mui/icons-material/MemorySharp'
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Opacity } from "@mui/icons-material";
import AllHabits from "../AllHabits/AllHabits";

const Home = () => {
  const [view, setView] = useState("Dashboard");

  const { collapseSidebar, collapsed, defaultCollapsed } = useProSidebar();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("signed out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setDisplay = (display) =>{
setView(display)
  }

  return (
    <>
    {/* App window */}
      <Box sx={{ display: "flex", height: "100vh", }}>
        {/**sidebar */}
            <Navbar setDisplay={setDisplay}/>

        {view === "Dashboard" ? (
          <Box height="100%" width='100vw' bgcolor= "#242629" >
            <Dashboard />
          </Box>
        ) : null}

        {view === "Allhabits" ? (
          <Box>
            <AllHabits />
          </Box>
        ) : null}

        {view === "MemoryGame" ? (
          <Box>
            <MemoryGame />
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Home;
