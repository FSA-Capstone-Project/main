import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { auth, app } from "../firebase";
// import Robot from "../API/openAi/chatGPT";

import {useMediaQuery} from "@mui/material/";


const Header = (headerTitle) => {
  const [name, setName] = useState("");
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));


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
        direction={largeScreen?"row":"column"}
        xs={10}
        md={10}
        margin="auto"
        marginTop="4rem"
        bgcolor="#26293c"
        borderRadius="15px"
      >
        <Grid item xs={6} p="2rem">
          <Typography variant="h3" color="whitesmoke">{`${headerTitle.title} DashBoard`}</Typography>
          <Typography variant="darktext">
            {` Welcome back, ${name}. We've missed you! `}
          </Typography>
        </Grid>
        <Grid item xs={3} color="white"></Grid>
        <Grid item xs={3}>
          <Box>A img, or links over here</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
