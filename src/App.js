import React from 'react';
import { Box } from "@mui/material/";
import { Navbar } from './components';
import Login from './components/LoginForm/LoginForm';
import AppRoutes from './AppRoutes';

//sx={{display: 'flex' justifyContent: 'center'}}
const App = () => {
  return (
    <Box bgcolor='#242629' height='1git00vh' width='100%' >
      <AppRoutes />
    </Box>
  );
};

export default App;
