import React, { useEffect } from "react";
import { Box } from "@mui/material/";
import { Navbar } from '../../components'
import { app, auth, db } from "../../firebase";
import { collection, doc, setDoc, addDoc} from "firebase/firestore";

const AddHabit = () => {
  const addHabitOnClick = (e) => {
    e.preventDefault();
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`) //user instance
      .collection("habits")
      .addDoc({
        habit: e.target.value,
      });
  };

  return (
    <Box sx={{ height: "100vh" }}>

      <Box>
        <form>
          <input type="text" placeholder="Add a habit" />
          <button type="submit" onClick={addHabitOnClick}>Submit
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default AddHabit;
