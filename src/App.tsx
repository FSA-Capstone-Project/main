import React from 'react';
import { Box } from "@mui/material/";
import { Navbar } from './components';
import Login from './components/Login/Login';
import AppRoutes from './AppRoutes';

//sx={{display: 'flex' justifyContent: 'center'}}
const App = () => {
  return (
    <Box bgcolor='#16161a' height='100vh' width='100%' >
      <AppRoutes />
    </Box>
  );
};

export default App;
