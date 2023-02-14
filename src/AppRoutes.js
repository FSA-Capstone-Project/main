import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, LoginForm } from "./components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { AuthProvider } from "./components/Auth";

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
  );
};

export default AppRoutes;
