import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material/";
import LinearProgress from "@mui/material/LinearProgress";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { auth, app } from "../../firebase";

const LargeGuage = (props) => {

  const today = new Date();
  const timeRemaining = (props.due - today) / (1000 * 60 * 60 * 24);
  const percentDone = Math.round((props.progress / props.goal) * 100);
  const [prog, setProg] = useState(props.progress)

  const handleAdd = async (number) => {
    setProg(number + 1)
    const docRef = app
    .firestore()
    .collection("users")
    .doc(`${auth.currentUser.email}`)
    .collection("habits")
    .doc(`${props.habit}`)
    await docRef.update({progress: prog});
  };

  const handleSubtract = async (number) => {
    setProg(number - 1)
    const docRef = app
    .firestore()
    .collection("users")
    .doc(`${auth.currentUser.email}`)
    .collection("habits")
    .doc(`${props.habit}`)
    await docRef.update({progress: prog});
  };

  return (
    <Box>
      {timeRemaining > 0 && percentDone < 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, #379f93 ${Math.round(
              percentDone
            )}%, #3358f4 100%)`,
            height: "16rem",
            width: "14rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "15px",
            alignItems: "center",
            borderRadius: "12px",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid grey",
            boxShadow: "3px 3px 12px black",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "-.2rem",
              color: "#22223b",
              marginBottom:'.2rem'
            }}
          >
            {props.title}
            <Box sx={{textAlign: "center",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0rem",
              marginTop:'-.5rem'}}
              >
                {`${props.progress} / ${props.goal}`}</Box>
          </Box>

          <Box sx={{display:'flex', width:'100%', flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>

             <Box>
              <RemoveCircleOutlineIcon onClick={()=>handleSubtract(props.progress)}/>
             </Box>

            <Box
              sx={{
                fontWeight: 800,
                border: "2px solid #fff",
                borderRadius: "5px",
                fontSize: 60,
                letterSpacing: "-.2rem",
                color: "#22223b",
                textShadow: "1px 1px 10px rgba(0, 0, 0, 0.4)"
              }}
            >{`${Math.round(percentDone)}%`}</Box>

             <Box>
              <AddCircleOutlineIcon onClick={()=>handleAdd(props.progress)}/>
             </Box>

          </Box>
            <Box sx={{ textAlign:'center',color: "#fff", fontSize: 12, fontWeight: 600 }}>
              Progress
            </Box>

          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              component="div"
              color="#2b2e40"
              fontWeight="500"
              letterSpacing='0rem'
            >
              {`Days Left:${Math.round(timeRemaining)}`}
            </Typography>
          </Box>

          <Box sx={{ width: "12rem" }}>
            <LinearProgress
              variant="determinate"
              value={percentDone}
              sx={{
                height: "2rem",
                borderRadius: "10px",
                boxShadow: "3px 3px 12px black",
              }}
            />
          </Box>
        </Box>

      ) : // ---------------COMPLETED--------------------------
      timeRemaining > 0 && percentDone >= 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, #379f93 ${Math.round(
              percentDone
            )}%, #3358f4 100%)`,
            height: "16rem",
            width: "14rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "15px",
            alignItems: "center",
            borderRadius: "12px",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid grey",
            boxShadow: "3px 3px 12px limegreen",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "-.2rem",
              color: "#22223b",
            }}
          >
            {props.title}
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                fontWeight: 800,
                border: "2px solid limegreen",
                borderRadius: "5px",
                fontSize: 60,
                letterSpacing: "-.2rem",
                color: "#22223b",
                textShadow: "1px 1px 10px rgba(0, 0, 0, 0.4)"
              }}
            >{`${Math.round(percentDone)}%`}</Box>
            <Box sx={{ color: "limegreen", fontSize: 14, fontWeight: 600 }}>
              Complete
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              component="div"
              color="#2b2e40"
              fontWeight="500"
              letterSpacing='0rem'
            >
              {`Days Left:${Math.round(timeRemaining)}`}
            </Typography>
          </Box>

          <Box sx={{ width: "12rem" }}>
            <LinearProgress
              variant="determinate"
              value={percentDone}
              sx={{
                height: "2rem",
                borderRadius: "10px",
                boxShadow: "3px 3px 12px black",
              }}
            />
          </Box>
        </Box>


      ) : // ----------------------- FAILED ----------------------------------
      timeRemaining < 0 && percentDone < 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, pink ${Math.round(
              percentDone
            )}%, red 100%)`,
            height: "16rem",
            width: "14rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "15px",
            alignItems: "center",
            borderRadius: "12px",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid grey",
            boxShadow: "3px 3px 12px red",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "-.2rem",
              color: "#22223b",
            }}
          >
            {props.title}
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                fontWeight: 800,
                border: "2px solid red",
                borderRadius: "5px",
                fontSize: 60,
                letterSpacing: "-.2rem",
                color: "#22223b",
                textShadow: "1px 1px 10px rgba(0, 0, 0, 0.4)"
              }}
            >{`${Math.round(percentDone)}%`}</Box>
            <Box sx={{ color: "red", fontSize: 14, fontWeight: 600 }}>
              Failed
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              component="div"
              color="#2b2e40"
              fontWeight="500"
              letterSpacing='0rem'
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
              value={percentDone}
              sx={{
                height: "2rem",
                borderRadius: "10px",
                boxShadow: "3px 3px 12px black",
              }}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};



export default LargeGuage;
