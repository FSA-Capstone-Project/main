import React from 'react';
import { Box } from "@mui/material/";
import { Navbar } from './components';
import Login from './components/Login';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Box bgcolor='grey' sx={{height: '100vh'}}>
      {/* <Login /> */}
      {/* <Navbar /> */}
      <AppRoutes />
    </Box>
  );
};

export default App;
