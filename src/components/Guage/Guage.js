import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material/";

const Guage = (props) => {
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(0);
  const [percentDone, setPercentDone] = useState(0);

  const getData = async () => {
    const docRef = doc(
      db,
      "users",
      `${auth.currentUser.email}`,
      "habits",
      `${props.habit}`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let runProgress = docSnap.data().progress;
      let goal = docSnap.data().goal;
      setProgress(runProgress);
      setGoal(goal);
      setPercentDone(Math.round((progress / goal) * 100));
    }
  };

  getData();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "5rem",
          width: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "lightgrey",
          borderRadius: "12px",
        }}
      >
        <CircularProgress variant="determinate" value={percentDone} />
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
            color="black"
          >{`${Math.round(percentDone)}%`}</Typography>
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
      </Box>
    </>
  );
};

export default Guage;
