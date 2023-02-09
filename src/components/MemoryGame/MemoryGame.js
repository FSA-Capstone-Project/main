import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";

const MemoryGame = () => {
  // const [order, setOrder] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(true);
  const [order, setOrder] = useState({});
  // const [pingingBoxes, setPingingBoxes] = useState(true);

  useEffect(() => {
    if (gameStarted) {
      pingBoxes();
    }
  }, [gameStarted]);
  
  const startGame = () => {
    // setPingingBoxes(true);
    setGameStarted(true);
    setGameOver(false);
    order[0] = Math.floor(Math.random() * 9);
    console.log(order, "STARTGAMEorder");
  };

  const stopGame = () => {
    // setPingingBoxes(false);
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
    console.log(tempClicks, "tempClicks");
    console.log(level, "level");
    
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
      document.getElementById(String(Object.values(order)[index])).style.backgroundColor =
        "red";
      setTimeout(() => {
        document.getElementById(String(Object.values(order)[index])).style.backgroundColor =
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

  return (
    <>
      <Box className="Game">
        <Box className="Level">Level: {String(level)}</Box>
        <Box
          sx={{
            height: "50vh",
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                  onClick={gameStarted ? clickedBox : null}
                  // onClick={pingingBoxes ? null : clickedBox}
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
          onClick={stopGame}
        >
          End Game
        </Button>
      ) : (
        <Button
          sx={{ marginTop: "2vh" }}
          variant="contained"
          onClick={startGame}
        >
          Start Game
        </Button>
      )}
    </>
  );
};

export default MemoryGame;
