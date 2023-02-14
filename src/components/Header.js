import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { auth, app } from "../firebase";
import {useMediaQuery} from "@mui/material/";
import { AddHabit } from "../components";
import { Modal, Button } from "@mui/material";


const Header = ({title}) => {
  const [name, setName] = useState("");
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const [showForm, setShowForm] = useState(false);

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

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  return (
    <Box>
      <Grid
        container
        direction={largeScreen?"row":"column"}
        xs={10}
        md={10}
        margin="auto"
        marginTop="2rem"
        bgcolor="#26293c"
        borderRadius="20px"
      >
        <Grid item xs={6} p="2rem">
          <Typography variant="h3" color="whitesmoke">{title} DashBoard</Typography>
          <Typography variant="darktext">
            Welcome back, {name}. We've missed you!
          </Typography>
        </Grid>
        <Grid item xs={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size="large"
            variant="contained"
            style={{ margin: 6, padding: "6px", fontSize: "2.5rem" }}
            onClick={showFormHandler}
          >
            +
        </Button>
        <Modal
        open={showForm}
        onClose={showFormHandler}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddHabit />
        </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
