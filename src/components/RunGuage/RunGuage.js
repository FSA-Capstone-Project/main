import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material/";

const RunGuage = () => {

  
    const [progress, setProgress] = useState(0)
    const [goal, setGoal] = useState(0)
    const [percentDone, setPercentDone] = useState(0)
  
    const getData = async () => {
      const docRef = doc(db, "users", `${auth.currentUser.email}`, "habits", "running");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let runProgress = docSnap.data().progress;
        let goal = docSnap.data().goal;
        setProgress(runProgress)
        setGoal(goal)
        setPercentDone(Math.round((progress/goal)*100))
      }
    }
    
    getData();

    return (
        <Box sx={{ display: "inline-flex" }}>
          <CircularProgress variant="determinate" value={percentDone} />
        </Box>

    )
}

export default RunGuage;