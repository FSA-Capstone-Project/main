import React from 'react';
import { Box } from "@mui/material/";
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <Box sx={{height: '100vh'}}>
      <Navbar/>
      <h1>Home</h1>
    </Box>
  );
};

export default Home;
