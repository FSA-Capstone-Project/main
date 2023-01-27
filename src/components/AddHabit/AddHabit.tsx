import React, { useEffect } from "react";
import { Box } from "@mui/material/";
import Navbar from "../Navbar/Navbar";
import { app, auth, db } from "../../firebase";
import { collection, doc } from "firebase/firestore";

const AddHabit = () => {
  const addHabitOnClick = (e) => {
    e.preventDefault();
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`) //user instance
      .collection("habits")
      .add({
        habit: e.target.value,
      });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      <Box>
        <form>
          <input type="text" placeholder="Add a habit" />
          <button type="submit" onClick={addHabitOnClick}>
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default AddHabit;
