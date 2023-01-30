import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material/";

// keep track of level => increment level if success
// end if failure
// keep track of inputs in level
// add pause between tiles and add sequence of tiles

//How the game functions
// 1. User clicks start
// 2. Game starts
// 3. Game randomly selects a box and pings it before reverting it back to blue
// 4. User clicks on the box that was pinged
// 5. If the user clicks the correct box, the game moves on to the next level (level is incremented by 1)

// Start game
// Randomly select a box and ping it
// Add the box to the order
// Add the box to the ping order
// Wait for user to click on the box
// If the user clicks the correct box, increment the level by 1
// If the user clicks the incorrect box, end the game
// If the user clicks the correct box, ping the next box in the order

//Todo have array indexed by level -1
const MemoryGame = () => {
  // When started: create a random box => ping random box
  // Wait for click => if click === random box
  // Increment level by one, choose random number and put it in sequence
  // Increment variable by 1 for every CORRECT CLICK and reset it to 0 for every LEVEL INCREASE => this will be used to KEEP TRACK OF CURRENT CLICK

  // Keep track of
  // Game start
  // The specific click
  // The order of pings

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
    setLevel(1);
    setOrder([]);
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
