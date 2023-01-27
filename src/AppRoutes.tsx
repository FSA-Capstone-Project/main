import React, { useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Home, AddHabit } from "./components";
import Login from "./components/LoginForm/LoginForm";
import { CssBaseline } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth, db } from "./firebase";
import { AuthProvider } from "./components/Auth";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Login />} />
          <Route path="/addHabit" element={<AddHabit />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
