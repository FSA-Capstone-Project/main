import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";


const MemoryGame = () => {

  const [order, setOrder] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);

  const startGame = () => {
    setGameStarted(true);
    setOrder([]);
    setOrder([...order, Math.floor(Math.random() * 9)]);
    setClicks(0);
    setLevel(1);
  };

  const stopGame = () => {
    alert("Game Over");
    setGameStarted(false);
    setClicks(0);
    setOrder([]);
    setLevel(1);
  };

  const clickedBox = (e) => {
    if (!gameStarted) return;
    if (e.target.id === String(order[clicks])) {
      setClicks(clicks + 1);
    } else {
      stopGame();
    }
    if (clicks === level - 1) {
      order.push(Math.floor(Math.random() * 9));
      setClicks(0);
      setLevel(level + 1);
      pingBoxes();
    }
  };

  const pingBoxes = () => {
    order.forEach((box, index) => {
      setTimeout(() => {
        document.getElementById(String(box)).style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById(String(box)).style.backgroundColor = "blue";
        }, 1000);
      }, 1000 * index);
    });
  };

  useEffect(() => {
    if (gameStarted) {
      pingBoxes();
    }
  }, [gameStarted]);

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
        <Button onClick={stopGame}>Stop</Button>
      ) : (
        <Button onClick={startGame}>Start</Button>
      )}
    </>
  );
};

export default MemoryGame;
