import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material/";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundImage: "linear-gradient(45deg, #3358f4 0%, #379f93 100%)",
          height: "18rem",
          width: "15rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
        }}
      >
        <CircularProgress variant="determinate" value={(Math.round((props.progress / props.goal) * 100))}/>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="white"
          >{`${Math.round((props.progress / props.goal) * 100)}%`}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="caption"
          component="div"
          color="white"
        >
          {props.title}
        </Typography>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="caption"
          component="div"
          color="white"
        >
          {(props.due - today) / (1000 * 60 * 60 * 24) > 0
            ? `${Math.round(
                (props.due - today) / (1000 * 60 * 60 * 24)
              )} Day(s) Left!`
            : "You Failed."}
        </Typography>
      </Box>
    </Box>
  );
};

export default LargeGuage;
