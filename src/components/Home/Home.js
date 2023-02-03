import React, { useState } from "react";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import MemoryGame from "../MemoryGame/MemoryGame";
import InteractiveCalendar from "../Calendar/Calendar";
import { Box } from "@mui/material/";
import { useProSidebar } from "react-pro-sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
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

  const setDisplay = (display) => {
    setView(display);
  };

  return (
    <>
    {/* App window */}
      <Box sx={{ display: "flex" }} height='100vh' >
        {/**sidebar */}
        <Navbar setDisplay={setDisplay} />

        {view === "Dashboard" ? (
          <Box  width='100vw' bgcolor= "#1e1e2b" >
            <Dashboard />
          </Box>
        ) : null}

        {view === "Allhabits" ? (
          <Box width= "100%"  height= "100%" bgcolor= "#1e1e2b" >
            <AllHabits title={view}/>
          </Box>
        ) : null}

        {view === "Calendar" ? (
          <Box>
            <InteractiveCalendar />
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
