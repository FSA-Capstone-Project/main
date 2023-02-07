import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";
import Header from "../Header";


const MemoryGame = () => {
  const [order, setOrder] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const title = "Memory Game";

  const toggleGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setOrder([Math.floor(Math.random() * 9)]);
      pingBoxes();
    } else {
      setGameStarted(false);
      setGameOver(false);
      setOrder([]);
      setLevel(1);
      setClicks(0);
    }
  };

  const clickedBox = (e) => {
    if (gameOver) return;
    if (e.target.id === String(order[clicks])) {
      setClicks(clicks + 1);
    } else {
      setGameOver(true);
      wrongBoxAnimation();
    }
    if (clicks === level - 1 && gameStarted && !gameOver) {
      nextLevelAnimation();
      console.log("ORDER1", order)
      setOrder([...order, Math.floor(Math.random() * 9)]);
      console.log("ORDER2", order)
      setLevel(level + 1);
      setClicks(0);
      pingBoxes();
    }
  };

  const pingBoxes = (index = 0) => {
    if (index === order.length) return;
    setTimeout(() => {
      document.getElementById(String(order[index])).style.backgroundColor =
        "red";
      setTimeout(() => {
        document.getElementById(String(order[index])).style.backgroundColor =
          "blue";
        pingBoxes(index + 1);
      }, 750);
    }, 750);
  };

  const nextLevelAnimation = () => {
    const boxes = document.getElementsByClassName("MuiGrid-root");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.backgroundColor = "green";
    }
    setTimeout(() => {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "blue";
      }
    }, 250);
  };

  const wrongBoxAnimation = () => {
    const boxes = document.getElementsByClassName("MuiGrid-root");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.backgroundColor = "red";
    }
    setTimeout(() => {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "blue";
      }
    }, 250);
  };

  useEffect(() => {
    if (gameStarted) {
      pingBoxes();
    }
  },);

  return (
    <>
      <Box className="Game">
        <Header title={title} />
        <Box className="Level" style={{ color: 'limegreen', marginTop: "2rem", marginLeft: "2rem"}}>Level: {String(level)}</Box>
        <Box
          sx={{
            height: "50vh",
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "5rem"
          }}
        >
          <Grid container spacing={2}>
            {[...Array(9).keys()].map((box) => {
              return (
                <Grid
                  sx={{
                    border: "2px solid black",
                    width: "5vw",
                    height: "10vh",
                    backgroundColor: "blue",
                  }}
                  item
                  xs={4}
                  onClick={clickedBox}
                  id={String(box)}
                ></Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      {gameStarted ? (
        <Button
          sx={{ marginTop: "2vh" }}
          variant="contained"
          onClick={toggleGame}
        >
          End Game
        </Button>
      ) : (
        <Button
          sx={{ marginTop: "2vh" }}
          variant="contained"
          onClick={toggleGame}
        >
          Start Game
        </Button>
      )}
    </>
  );
};

export default MemoryGame;
