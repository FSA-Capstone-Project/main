import React, { useEffect, useState } from "react";
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material/";

const Chart = (props) => {


    const [progress, setProgress] = useState(0)
    const [goal, setGoal] = useState(0)
    const [percentDone, setPercentDone] = useState(0)

    const getData = async () => {
      const docRef = doc(db, "users", `${auth.currentUser.email}`, "habits", `${props.habit}`);
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
        <Box sx={{ height:'25rem', width:'45rem', display: "flex", bgcolor: 'lightgrey', borderRadius:'12px'}}>
          <CircularProgress variant="determinate" value={percentDone} />
          <p style={{color:'white'}}>{props.title}</p>
        </Box>

    )
}

export default Chart;
