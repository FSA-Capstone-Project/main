import React, {useState,useEffect} from "react";
import { Box } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import RocketRoundedIcon from "@mui/icons-material/RocketRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MemorySharpIcon from '@mui/icons-material/MemorySharp'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Avatar from "@mui/material/Avatar";

const Navbar = ({setDisplay}) => {

  const user = auth.currentUser

  const { collapseSidebar, collapsed, defaultCollapsed } = useProSidebar();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    setSidebarIsOpen(false)
  },[])

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
    <Box sx={{display:'flex' , backgroundImage:"linear-gradient(20deg, #2087f7 0%, #3358f4 100%)"}}>
    <Sidebar
        // borderRadius='3rem'
      defaultCollapsed="true"

      onMouseOver={() => collapseSidebar(setSidebarIsOpen(true))}
      onMouseOut={() => collapseSidebar(setSidebarIsOpen(false))}
    >
      <Menu>
        <Box
          sx={{
            backgroundColor: "rgba(51,88,244,.5)",
          }} // login-card'
          marginTop="2rem"
          marginBottom="2rem"
          marginLeft="auto"
          marginRight="auto"
          borderRadius="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          // do a media query based on the sidebar being collapsed??
          height={sidebarIsOpen === true ? "12.5rem" : "4.5rem"}
          width={sidebarIsOpen === true ? "12.5rem" : "4.5rem"}

          bgcolor="#3358f4"
          boxShadow="0px 0px 12px #94a1b2"
        >
          {sidebarIsOpen ?
          <Avatar src={user.photoURL} sx={{ width: "12rem", height: "12rem",  }} />
          :
          <Avatar src={user.photoURL} sx={{ width: "4rem", height: "4rem",  }} />
          }

        </Box>

        <MenuItem
          onClick={() => setDisplay("Profile")}
          icon={<AccountCircleIcon fontSize="large" />}>
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => setDisplay("Allhabits")}
          icon={<HomeRoundedIcon fontSize="large"/>}
        >
          Home
        </MenuItem>

        <MenuItem
          onClick={() => setDisplay("Dashboard")}
          icon={<RocketRoundedIcon fontSize="large" />}
        >
          Dashboard
        </MenuItem>

        <MenuItem
        onClick={()=> setDisplay("Calendar")}
        icon={<CalendarMonthIcon fontSize="large" />}>
          Calendar
        </MenuItem>

        <MenuItem
              onClick={()=> setDisplay("MemoryGame")}
             icon={<MemorySharpIcon fontSize="large" />}>
              Memory Game
            </MenuItem>

        <MenuItem
          onClick={handleSignOut}
          icon={<LogoutIcon fontSize="large" />}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Sidebar>
  </Box>
  );
};

export default Navbar;
