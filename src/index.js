import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import App from "./App";
//this gives a css starter for mui
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

const theme = createTheme({
  palette: {
        primary: {
          main: "#7f5af0",
        },
      },
      formControl: {
        secondary: {
          color: 'red',
          borderColor: 'red'
        }
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
        },
        h1: {
          color: '#94a1b2'
        },
        h5: {
          color: '#94a1b2'
        },
        h2: {
          color: '#94a1b2'
        },
        h4: {
          color: '#94a1b2'
        }
      },
      components:{
        MuiLinearProgress:{
         styleOverrides: {
          determinate:{
            backgroundColor: '#94a1b2',

          }
        }
      }

    }


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
