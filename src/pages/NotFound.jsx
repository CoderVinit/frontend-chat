import React from 'react'
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container maxWidth={"lg"} sx={{ height: "100vh" }}>
    <Stack alignItems="center" spacing={"2rem"} justifyContent={"center"} height={"100%"}>
      <ErrorIcon color="error" sx={{ fontSize: "10rem" }} />
      <Typography variant='h1'>404</Typography>
      <Typography variant='h2'>Not Found</Typography>
      <Link to="/">Go to Home</Link>
    </Stack>
  </Container>
)

export default NotFound
