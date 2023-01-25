import React from 'react';
import { Box } from "@mui/material/";
import { Navbar } from './components';
import Login from './components/Login/Login';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Box bgcolor='grey' >
      <AppRoutes />
    </Box>
  );
};

export default App;
