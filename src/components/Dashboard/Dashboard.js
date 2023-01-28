import React, { useEffect, useState } from "react";
import { Box } from "@mui/material/";
import { Navbar } from "../../components";
import { app, auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  querySnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AddHabit } from "../../components";
import { bgcolor, display } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Guage from "../Guage/Guage";
import { Paper } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Chart from "../Chart/Chart";
import { data } from "autoprefixer";

const Dashboard = () => {
    
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const data = [];
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let habit = {
            id: doc.id,
            title: doc.data().title,
            goal: doc.data().goal,
            progress: doc.data().progress,
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, []);

  console.log(habits);

  return (
    <>
      <Grid container spacing={6} margin={2} borderRadius={"10px"} s>
        {habits.length ? (
          habits.map((habit) => (
            <Grid>
              <Guage habit={habit.id} title={habit.title} />
            </Grid>
          ))
        ) : (
          <Grid>
            <h3 style={{ color: "white" }}>You have no habits to display!</h3>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
