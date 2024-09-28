import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material"
import moment from 'moment'
import { useSelector } from 'react-redux'
import { transformImage } from '../../lib/Features'

const Profile = () => {

  const { user } = useSelector(state => state.auth)
  console.log(user.avatar)

  return (
    <Stack display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >

      <Avatar
        src={transformImage(user?.data?.avatar.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "4px solid white",
        }}
        alt={user?.data?.name}
      />
      <ProfileCard heading={"Bio"} text={user?.data?.bio} />
      <ProfileCard heading={"Username"} text={user?.data?.username} Icon={<UsernameIcon />} />
      <ProfileCard heading={"Name"} text={user?.data?.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.data?.createdAt).fromNow()} Icon={<CalenderIcon />} />
    </Stack>
  )
};


const ProfileCard = ({ heading, text, Icon }) => (
  <Stack direction={"row"} alignItems={"center"} specing={"1rem"} color={"white"} textAlign={"center"} marginBottom={"1rem"} >
    {Icon && Icon}
    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography color={"gray"} variant='caption'>{heading}</Typography>
    </Stack>
  </Stack >
)

export default Profile