import React from "react";
import {
  Button,
  Input,
  TextField,
  Box,
  Icon,
  Typography,
} from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import RocketRoundedIcon from "@mui/icons-material/RocketRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Opacity } from "@mui/icons-material";

const Navbar = () => {

  const { collapseSidebar, collapsed } = useProSidebar();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('signed out')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ position: "fixed", display: "flex", height: "100vh"}}>
      <Sidebar
          backgroundColor='#72757e'
      //  onMouseOver={() => collapseSidebar()}
      //  onMouseOut={() => collapseSidebar()}
      >
        <Menu>

            <Box sx={{background: 'linear-gradient(20deg, #7f6af5 0%, #7f3af0 80%)'}}// login-card'
            marginTop='1rem'
            marginBottom='2rem'
            marginLeft='auto'
            marginRight='auto'
            borderRadius='50px'
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="12rem"
            width='80%'
            bgcolor="#0001"
            boxShadow='0px 0px 12px #94a1b2'
            >
              <AccountCircleIcon fontSize="large"/>
            </Box>

          <MenuItem
            icon={<AccountCircleIcon fontSize="large"/>}>
            Profile
          </MenuItem>

          <MenuItem
            icon ={<HomeRoundedIcon fontSize="large"/>}>
            Home
          </MenuItem>

          <MenuItem
            icon = {<RocketRoundedIcon fontSize="large" />}>
            Dashboard
          </MenuItem>

          <MenuItem
            icon = {<CalendarMonthIcon fontSize="large" />}>
            Calendar
          </MenuItem>

          <MenuItem onClick={handleSignOut}
            icon = {<LogoutIcon fontSize="large" />}>
            Sign Out
          </MenuItem>

        </Menu>
      </Sidebar>
    </div>
  );
};

export default Navbar;