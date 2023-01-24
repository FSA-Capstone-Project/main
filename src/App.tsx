import React from 'react';

import { Navbar } from './components';
import Login from './components/Login';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Login />
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
