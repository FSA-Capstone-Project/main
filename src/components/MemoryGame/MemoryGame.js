import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";

const MemoryGame = () => {
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(true);
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (gameStarted) {
      pingBoxes();
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    order[0] = Math.floor(Math.random() * 9);
  };

  const stopGame = () => {
    setGameStarted(false);
    setGameOver(true);
    setOrder({});
    setLevel(1);
    setClicks(0);
  };

  const clickedBox = (e) => {
    if (gameOver || !gameStarted) return;
    let tempClicks = clicks;
    if (String(e.target.id) === String(order[clicks])) {
      setClicks(clicks + 1);
      tempClicks++;
      setTimeout(() => {
        document.getElementById(String(e.target.id)).style.backgroundColor =
          "green";
        setTimeout(() => {
          document.getElementById(String(e.target.id)).style.backgroundColor =
            "blue";
        }, 250);
      }, 250);
    } else {
      wrongBoxAnimation();
      stopGame();
    }

    if (tempClicks === level) {
      nextLevelAnimation();
      order[tempClicks] = Math.floor(Math.random() * 9);
      setLevel(level + 1);
      setClicks(0);
      pingBoxes();
    }
  };

  const pingBoxes = (index = 0) => {
    if (index === Object.values(order).length || gameOver) return;
    setTimeout(() => {
      document.getElementById(
        String(Object.values(order)[index])
      ).style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById(
          String(Object.values(order)[index])
        ).style.backgroundColor = "blue";
        pingBoxes(index + 1);
      }, 750);
    }, 750);
  };

  const nextLevelAnimation = () => {
    const boxes = document.getElementsByClassName("MuiGrid-item");
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
    const boxes = document.getElementsByClassName("MuiGrid-item");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.backgroundColor = "red";
    }
    setTimeout(() => {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "blue";
      }
    }, 250);
  };

  return (
    <>
      <Box
        className="Level"
        color="white"
        padding="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="30px"
      >
        Level: {String(level)}
      </Box>
      <Box
        className="Game"
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <Box
          height="90vh"
          width="50vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={2}>
            {[...Array(9).keys()].map((box) => {
              return (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid black",
                    width: "12vw",
                    height: "15vh",
                    backgroundColor: "blue",
                    borderRadius: "10px",
                  }}
                  item
                  xs={4}
                  onClick={gameStarted ? clickedBox : null}
                  id={String(box)}
                ></Grid>
              );
            })}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          padding="10px"
        >
          {gameStarted ? (
            <Button
              className="stopButton"
              padding="10px"
              variant="contained"
              border="3px solid black"
              onClick={stopGame}
            >
              End Game
            </Button>
          ) : (
            <Button
              className="startButton"
              padding="10px"
              variant="contained"
              border="3px solid black"
              onClick={startGame}
            >
              Start Game
            </Button>
          )}
          </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MemoryGame;
