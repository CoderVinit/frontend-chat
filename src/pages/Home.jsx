import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/Color';

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={grayColor}>
      <Typography textAlign={"center"} p={2} variant='h5'>
        Select a friend for Chat!
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);
