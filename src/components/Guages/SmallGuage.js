import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material/";

const SmallGuage = (props) => {
  // const [progress, setProgress] = useState(0);
  // const [goal, setGoal] = useState(0);
  // const [percentDone, setPercentDone] = useState(0);
  const today = new Date();

  return (
    <Box sx={{display:'flex', flexDirection:"column", justifyContent:'center', alignItems:"center"}}>
      <Box
        sx={{
          position: "relative",
          height: "5rem",
          width: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: "12px",
        }}
      >
        <CircularProgress variant="determinate" value={(Math.round((props.progress / props.goal) * 100))} sx={{border:'1px solid #7f5af0',borderRadius: '10rem'}} />
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

        </Typography>
      </Box>
    </Box>
  );
};

export default SmallGuage;
