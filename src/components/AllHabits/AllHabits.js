// import React, { useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
// import { Box } from '@mui/material';
// // import { db, auth, app } from '../../firebase';

// const AllHabits = () => {
//   // const [habits, setHabits] = useState([]);

//   // useEffect(() => {
//   //   const data = [];
//   //   app
//   //     .firestore()
//   //     .collection("users")
//   //     .doc(`${auth.currentUser.email}`)
//   //     .collection("habits")
//   //     .get()
//   //     .then((querySnapshot) => {
//   //       querySnapshot.docs.forEach((doc) => {
//   //         let habit = {
//   //           id: doc.id,
//   //           title: doc.data().title,
//   //           goal: doc.data().goal,
//   //           progress: doc.data().progress,
//   //         };
//   //         data.push(habit);
//   //         setHabits(data);
//   //       });
//   //     });
//   // }, []);
//   // console.log("this is from allhabits file", AllHabits)

//   return (
//     <Box sx={{ height: "100vh" }}>
//       <Navbar />
//       <div>HEY!!</div>
//     </Box>
//   )
// }

// export default AllHabits;
