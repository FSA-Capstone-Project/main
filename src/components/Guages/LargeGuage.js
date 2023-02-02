import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material/";
import LinearProgress from "@mui/material/LinearProgress";

const LargeGuage = (props) => {
  // const [progress, setProgress] = useState(0);
  // const [goal, setGoal] = useState(0);
  // const [percentDone, setPercentDone] = useState(0);

  const today = new Date();

  // const getData = async () => {
  //   const docRef = doc(
  //     db,
  //     "users",
  //     `${auth.currentUser.email}`,
  //     "habits",
  //     `${props.habit}`
  //   );
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     let habitProgress = docSnap.data().progress;
  //     let goal = docSnap.data().goal;
  //     setProgress(habitProgress);
  //     setGoal(goal);
  //     setPercentDone(Math.round((progress / goal) * 100));
  //   }
  // };
  // getData();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(45deg, #379f93 ${Math.round((props.progress / props.goal) * 100)}%, #3358f4 100%)`,
        height: "18rem",
        width: "15rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        alignItems: "center",
        borderRadius: "12px",
        marginLeft:'auto',
        marginRight:'auto',
        border:'1px solid grey',
        boxShadow: "3px 3px 12px black"
      }}
    >

      <Box sx={{ textAlign: "center", fontWeight:600, fontSize:30, letterSpacing:"-.2rem", color:"#22223b"}}
      >{props.title}</Box>


        <Box sx={{textAlign:'center'}}>
          <Box  sx={{fontWeight:800, border:'2px solid #fff', borderRadius:'5px', fontSize:60, letterSpacing:"-.2rem", color:"#22223b"}}>{`${Math.round((props.progress / props.goal) * 100)}%`}</Box>
          <Box sx={{color:'#fff',fontSize:12, fontWeight:600}}>Complete</Box>
        </Box>


        <Box>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          component="div"
          color="#2b2e40"
          fontWeight="400"
        >
          {(props.due - today) / (1000 * 60 * 60 * 24) > 0
            ? `Days Left:
            ${Math.round((props.due - today) / (1000 * 60 * 60 * 24))}`
            : "You ran out of time!"}
        </Typography>
      </Box>


      <Box sx={{ width: "12rem" }}>
            <LinearProgress
              variant="determinate"
              
              value={Math.round((props.progress / props.goal) * 100)}
              sx={{ height: "2rem", borderRadius: "10px", boxShadow: "3px 3px 12px black"}}
            />
          </Box>
    </Box>

  );
};

export default LargeGuage;

