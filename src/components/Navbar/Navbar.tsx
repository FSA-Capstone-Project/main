import React from "react";
import {
  Button,
  Input,
  TextField,
  Box,
  Icon,
  Typography,
} from "@mui/material/";
import { Link } from "react-router-dom";
import RocketRoundedIcon from "@mui/icons-material/RocketRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

const Navbar = () => {
  const { collapseSidebar, collapsed } = useProSidebar();


  return (
    <div style={{ position:'fixed',display: "flex", height: "100vh"}}>
      <Sidebar
         defaultCollapsed={true}
         onMouseOver={() => collapseSidebar()}
         onMouseOut={() => collapseSidebar()}

      >
        <Menu>
          <MenuItem style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
          <AccountCircleIcon fontSize="large"/>
          </MenuItem>

          <MenuItem>
            <HomeRoundedIcon fontSize="large"/>
          </MenuItem>

          <MenuItem>
            <RocketRoundedIcon fontSize="large" />
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Navbar;
