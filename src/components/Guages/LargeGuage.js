import React, { useState } from "react";
import { Box, Typography } from "@mui/material/";
import LinearProgress from "@mui/material/LinearProgress";

const LargeGuage = (props) => {
  const today = new Date();
  const timeRemaining = (props.due - today) / (1000 * 60 * 60 * 24);
  const percentDone = Math.round((props.progress / props.goal) * 100);

  return (
    <Box>
      {timeRemaining > 0 && percentDone < 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, #379f93 ${Math.round(
              percentDone
            )}%, #3358f4 100%)`,
            height: "18rem",
            width: "15rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
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
            }}
          >
            {props.title}
          </Box>

          <Box sx={{ textAlign: "center" }}>
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
            <Box sx={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
              Progress
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              component="div"
              color="#2b2e40"
              fontWeight="400"
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
      ) : // COMPLETED
      timeRemaining > 0 && percentDone >= 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, #379f93 ${Math.round(
              percentDone
            )}%, #3358f4 100%)`,
            height: "18rem",
            width: "15rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
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
              fontWeight="400"
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
      ) : // FAILED
      timeRemaining < 0 && percentDone < 100 ? (
        <Box
          sx={{
            backgroundImage: `linear-gradient(45deg, pink ${Math.round(
              percentDone
            )}%, red 100%)`,
            height: "18rem",
            width: "15rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
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
