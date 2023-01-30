import React, { useEffect, useState } from "react";
import { Navbar } from '../../components'
import { app, auth, db } from "../../firebase";
import { collection, doc, setDoc, addDoc} from "firebase/firestore";
import { Button, Input, TextField, Box, Typography} from "@mui/material/";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { useNavigate } from "react-router-dom";

const AddHabit = () => {

  const [input, setInput] = useState({ title: "", goal: null, progress: null});

  const addHabit = () => {

     setDoc(doc(db, 'users', `${auth.currentUser.email}`, "habits", `${input.title}`), {
          title: input.title,
          goal: input.goal,
          progress: input.progress
        });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (

    <Box // login-card
          display="flex"
          // flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box // this is the login form
            display="flex"
            flexDirection="column"
            bgcolor="#16161a"
            borderRadius="15px"
            alignItems="center"
            justifyContent="center"
            height="300px"
            width="300px"
          >
             <Typography variant="darktext" sx={{ fontSize: "25px" }}>
            </Typography>
            <Typography variant="purple"  sx={{ fontSize:'2em', margin:'5px'}}>Add New Habit</Typography>
    
            <TextField //Name
              variant="outlined"
              size="small"
              name="title"
              placeholder="Habit Name"
              sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
              type="text"
              onChange={handleChange}
              value={input.title}
            />

            <TextField //email
              variant="outlined"
              size="small"
              name="goal"
              placeholder="Goal (Number)"
              sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
              type="number"
              onChange={handleChange}
              value={input.goal}
            />
    
            <TextField
              variant="outlined"
              size="small"
              sx={{ margin: 1, bgcolor: '#fffffe', borderRadius: '9px'}}
              name="progress"
              placeholder="Progress"
              onChange={handleChange}
              value={input.progress}
              type="number"
            />
    
            <Button
              size="small"
              variant="contained"
              sx={{ margin: 2 }}
              onClick={addHabit}
            >
              Add
            </Button>
          </Box>
        </Box>
    
      )
};

export default AddHabit;
