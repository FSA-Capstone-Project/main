import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  OutlinedInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Button,
} from "@mui/material/";
import { alpha, styled } from "@mui/material/styles";
import { auth, app } from "../../firebase";
import Avatar from "@mui/material/Avatar";
import ImageUploader from "./ImageUploader";
import profile from "../../illistration/profile.svg";
import EmailIcon from "@mui/icons-material/Email";
import Picture from "../../API/openAi/Picture";

const Profile = () => {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [habits, setHabits] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const data = [];
    console.log("USEEFFECT", auth.currentUser);
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
            setAge(data.age);
            setPhone(data.phone);
            setEmail(data.email);
          }
        });
      });
    app
      .firestore()
      .collection("users")
      .doc(`${auth.currentUser.email}`)
      .collection("habits")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let habit = {
            id: doc.id,
            title: doc.data().title,
            goal: doc.data().goal,
            progress: doc.data().progress,
            due: doc.data().due.toDate(),
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, []);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {

        border: '1px solid black'
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });

  return (
    <>
    <Picture/>
    <Box
      sx={{
        display: "flex",

        height: "100vh",
        width: "100vw",

      }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "50%",
          // bgcolor:'grey',
          padding: "4rem",
          marginLeft: "4rem",
        }}
      >
        {/* header */}
        <Box>
          <Typography variant="h1"> {name} </Typography>
          <Typography variant="darktext">
            {" "}
            Edit and update your profile{" "}
          </Typography>
        </Box>
        {/* update profile photo */}
        <Box
          sx={{
            display: "flex",
            marginTop: "3rem",
            // bgcolor:'red',
            alignItems: "center",
          }}
        >
          <Avatar src={user.photoURL} sx={{ width: 150, height: 150 }} />
          <ImageUploader />
        </Box>

        {/* update profile section */}
        <Box
          marginTop="3rem"
          display="flex"
          flexDirection="column"
          bgcolor="#94a1b2"
          borderRadius="9px"
          height="400px"
          paddingLeft="2rem"
        >
          <Typography variant="h3">{name} </Typography>
          {/* email */}
          <FormControl sx={{ width: "50%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              placeholder={email}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          {/* phone */}
          <TextField
            sx={{ width: "50%", mt: "2rem" }}
            id="outlined-number"
            label="Phone Number"
            type="number"
            placeholder={phone}
            InputLabelProps={
              {
                // shrink: true,
              }
            }
          />
          {/* age */}
          <TextField
            sx={{ width: "25%", mt: "2rem" }}
            id="outlined-number"
            label="age"
            type="number"
            placeholder={age}
            InputLabelProps={
              {
                // shrink: true,
              }
            }
          />
          <Typography sx={{ color: "#16161a" }} mt="3rem" variant="h5">
            Date Joined: {auth.currentUser.metadata.creationTime.slice(0, 16)}
          </Typography>
        </Box>

        {/* Chat
        <Box>
          <Button>Chat</Button>
        </Box> */}
      </Box>

      <Box
        sx={{
          height: "100vh",
          width: "50%",
          display: "flex",
          alignItems: "center",
          // bgcolor:'orange'
        }}
      >
        <img src={profile}></img>
      </Box>
    </Box>
    </>
  );
};

export default Profile;

// <Box
// sx={{
//   display: "flex",
//   flexDirection: "column",
//   bgcolor: "white",
//   border: "2px solid grey",
//   borderRadius: "15px",
//   alignItems: "center",
//   justifyContent: "space-around",
//   height: "40rem",
//   width: "60rem",
//   backgroundImage: "linear-gradient(20deg, #2087f7 0%, #3358f4 100%)",
//   boxShadow: "3px 3px 20px black",
// }}
// >

// <Avatar src={user.photoURL} sx={{ width: 150, height: 150 }} />
// <ImageUploader />
// <Box>Name: {name}</Box>
// <Box>Age: {age}</Box>
// <Box>Phone: {phone}</Box>
// <Box>Email: {auth.currentUser.email}</Box>
// <Box>Habits: {habits.length}</Box>
// <Box>Joined: {(auth.currentUser.metadata.creationTime).slice(0,16)}</Box>

// </Box>
