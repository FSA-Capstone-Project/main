import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { auth, app, db } from "../firebase";
import Robot from "../API/openAi/chatGPT";

function Header() {
  const [name, setName] = useState("");

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let data = snapshot.data();
          if (
            String(data.email).toLowerCase() ===
            auth.currentUser.email.toLowerCase()
          ) {
            setName(data.name);
          }
        });
      });
  }, []);

  return (
    <Box>
      <Grid
        container
        xs={12}
        md={10}
        margin="auto"
        marginTop="4rem"
        bgcolor="#26293c"
        borderRadius="15px"
      >
        <Grid item xs={5} p="2rem">
          <Typography variant="h3" color="whitesmoke">Analytics DashBoard</Typography>
          <Typography variant="darktext">
            {` Welcome back, ${name}. We've missed you! `}
          </Typography>
        </Grid>
        <Grid item xs={3} color="white"></Grid>
        <Grid item xs={4}>
          <Box>A img, or links over here</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
