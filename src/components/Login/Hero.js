import React from 'react'
import { Box, Typography, Card, CardMedia, Paper } from '@mui/material'
import backgroundimg from '../../illistration/backgroundimg.png'
import herologo from '../../illistration/herologo.svg'

function Hero() {
  return (
  <Box
  // bgcolor="#16161a"
   height='100vh'
   display='flex'
    sx={{backgroundImage: `url(${backgroundimg})`}}
   >




    {/* left side */}
      <Box
        width='50%'
        marginTop='3rem'
      >

        <Typography variant='h1'
         margin='auto'
         marginTop='3rem'
         width='75%'
        sx={{color: "black"}}>MindMaster</Typography>
        <Typography
        sx={{color: "#16161a"}}
          margin='auto'
         width='75%'
         marginTop='5rem'
          variant='h2'
          >Your thougths shape your actions</Typography>
        <Typography
        sx={{color: "black"}}
        variant='h4'
        margin='auto'
        marginTop='2rem'
        width='75%'
        > and your Goals get you there</Typography>


        <Typography
        sx={{color: "black"}}
        variant='h5'
        margin='auto'
        marginTop='2rem'
        width='75%'
        > MindMaster provides the goal tracking you need to help to help you achive the life you want</Typography>


      </Box>
    {/* right side */}
    <Box  display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         height='100%'
         width="50%">
          <img src={herologo} alt=""  />
         </Box>
  </Box>
  )
}

export default Hero
