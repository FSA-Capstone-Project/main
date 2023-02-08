import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";

const MemoryGame = () => {
  const [order, setOrder] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(true);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setOrder([]);    
    setOrder([...order, Math.floor(Math.random() * 9)]);
    console.log(order, "STARTGAMEorder")
    pingBoxes();
  };

  const stopGame = () => {
    setGameStarted(false);
    setGameOver(true);
    setOrder([]);
    setLevel(1);
    setClicks(0);
  };

  const clickedBox = (e) => {
    if (gameOver) return;
    if (e.target.id === String(order[clicks])) {
      setClicks(clicks + 1);
    } 
    else {
      wrongBoxAnimation();
      stopGame();
    }
    console.log(clicks, "clicks")
    console.log(level, "level")
    console.log(order, "order")
    if (clicks === level && gameStarted && !gameOver) {
      nextLevelAnimation();
      console.log("ORDERONE", order);
      setOrder([...order, Math.floor(Math.random() * 9)]);
      console.log("ORDERTWO", order);
      
      setTimeout(() => {}, 300);
      setLevel(level + 1);
      setClicks(0);
      pingBoxes();
    } 
    else {
      wrongBoxAnimation()
      stopGame();
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
        setTimeout(() => {
          pingBoxes(index + 1);
        }, 750);
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
