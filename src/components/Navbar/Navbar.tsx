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
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

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
    <div style={{ position: "fixed", display: "flex", height: "100vh" }}>
      <Sidebar
      //  defaultCollapsed={true}
      //  onMouseOver={() => collapseSidebar()}
      //  onMouseOut={() => collapseSidebar()}
      >
        <Menu style={{display: "flex", alignContent:'space-between'}}>
          <MenuItem style={{display: "flex", justifyContent:'center' }}>
            <AccountCircleIcon fontSize="large" />
            Profile
          </MenuItem>

          <MenuItem>
            <HomeRoundedIcon fontSize="large"/>
            Home
          </MenuItem>

          <MenuItem>
            <RocketRoundedIcon fontSize="large" />
            Dashboard
          </MenuItem>

          <MenuItem onClick={handleSignOut}>
            <LogoutIcon fontSize="large" />
            Sign Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Navbar;
