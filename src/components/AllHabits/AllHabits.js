import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box } from '@mui/material';
import { db, auth, app } from '../../firebase';

const AllHabits = () => {

  //display all habits of that user, currently this shows ALL habits, not specific
  // useEffect(() => {
  //   app
  //     .firestore()
  //     .collection("users").doc(`${auth.currentUser.uid}`)
  //     .collection("habits")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((snapshot) => {
  //         let data = snapshot.data();
  //         console.log(data)
  //         console.log("this is uid: " + auth.currentUser.uid)
  //       });
  //     });
  // }, []);
  // const username = useSelector((state) => state.auth.me.username);

  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
    </Box>
  )
}

export default AllHabits;
