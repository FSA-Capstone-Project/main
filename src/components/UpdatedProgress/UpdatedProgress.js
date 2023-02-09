// import React, { useState } from 'react';
// import { auth, db } from '../../firebase';
// import { Button, TextField, Box, Typography } from '@mui/material/';
// import { UpdateHabit } from '../UpdateHabit/UpdateHabit';
// import AllHabits from '../AllHabits/AllHabits';


// const ParentComponent = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedHabit, setSelectedHabit] = useState({});
//   const [habits, setHabits] = useState([]);

//   const handleUpdate = (habit) => {
//     setSelectedHabit(habit);
//     setOpen(true);
//   };

//   return (
//     <>
//       {habits.map(habit => (
//         <AllHabits
//           key={habit.id}
//           habit={habit}
//           handleUpdate={handleUpdate}
//         />
//       ))}
//       {open && (
//         <UpdateHabit
//           open={open}
//           setOpen={setOpen}
//           selectedHabit={selectedHabit}
//         />
//       )}
//     </>
//   );
// };


// export default ParentComponent;
