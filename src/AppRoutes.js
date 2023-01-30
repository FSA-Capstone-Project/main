import React, { useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Home, AddHabit, Login, LoginForm } from "./components";
import { CssBaseline } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth, db } from "./firebase";
import { AuthProvider } from "./components/Auth";
// import AllHabits from "./components/AllHabits/AllHabits";

const AppRoutes = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);


  return (
    <div>
      <AuthProvider>
        {auth && auth.currentUser ? (
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<LoginForm />} />
          </Routes>
        )}
      </AuthProvider>
    </div>
  );
};

export default AppRoutes;
