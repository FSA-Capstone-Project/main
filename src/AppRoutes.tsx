import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components"
import Login from "./components/Login/Login";


const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/*" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
