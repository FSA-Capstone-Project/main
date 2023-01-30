import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box } from '@mui/material';
import { db, auth, app } from '../../firebase';

const AllHabits = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {

    const data = [];
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
          };
          data.push(habit);
          setHabits(data);
        });
      });
  }, [])

return (
    <>
        {habits.length ? (
          habits.map((habit) => (
            <Box>
              <h3>{`${habit.title}`}</h3>
            </Box>
          ))
        ) : 

            <h3 style={{ color: "white" }}>You have no habits to display!</h3>

        }

    </>

  );
}

export default AllHabits;
