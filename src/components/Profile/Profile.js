import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material/";
import { alpha, styled } from "@mui/material/styles";
import { auth, app } from "../../firebase";
import Avatar from "@mui/material/Avatar";
import ImageUploader from "./ImageUploader";
import "./Profile.css";

const Profile = () => {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [habits, setHabits] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const data = [];
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
        border: "1px solid black",
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
            padding: "4rem",
            marginLeft: "4rem",
          }}
        >
          {/* Header */}
          <Box>
            <Typography variant="h1"> {name} </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "80%",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "rgba(255,255,255,.4)",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar src={user.photoURL} sx={{ width: 150, height: 150 }} />
              <ImageUploader />
            </Box>
            <div className="profileRow">
              <div className="profileLabel">Name: </div>
              <div className="profileValue">{name}</div>
            </div>
            <div className="profileRow">
              <div className="profileLabel">Age: </div>
              <div className="profileValue">{age}</div>
            </div>
            <div className="profileRow">
              <div className="profileLabel">Email: </div>
              <div className="profileValue">{auth.currentUser.email}</div>
            </div>
            <div className="profileRow">
              <div className="profileLabel">Phone: </div>
              <div className="profileValue">{phone}</div>
            </div>
            <div className="profileRow">
              <div className="profileLabel">Habits: </div>
              <div className="profileValue">{habits.length}</div>
            </div>
            <div className="profileRow">
              <div className="profileLabel">Joined: </div>
              <div className="profileValue">
                {auth.currentUser.metadata.creationTime.slice(0, 16)}
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
