import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, AddHabit } from "./components"


const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/*" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/add-habit" element={<AddHabit/>} />
      </Routes>
    </div>
  );
}

export default App;
