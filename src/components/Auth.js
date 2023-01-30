import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { CircularProgress, Box } from "@mui/material";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <Box display='flex' height='100vh'  justifyContent='center'>
        <CircularProgress sx={{justifySelf: 'center', alignSelf:"center"}} />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
