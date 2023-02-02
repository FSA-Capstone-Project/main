import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import App from "./App";
//this gives a css starter for mui
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Theme, ThemeOptions } from '@mui/material/styles';



const root = ReactDOM.createRoot(
  document.getElementById("root")
);

const theme = createTheme({
  palette: {
        primary: {
          main: "#2b2e40",
        },
      },
      typography: {
        darktext: { 
          color: '#94a1b2'
        },
        purple: {
          color: "#7f5af0"
        },
        h3: {
          color: '#94a1b2'
        }
      },

});



root.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </ThemeProvider>
    </Provider>
  </Router>
);

export default root;
