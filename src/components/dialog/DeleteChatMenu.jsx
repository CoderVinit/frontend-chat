import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducres/misc'
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useAsyncMutation } from "../../hooks/Hooks"
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api"
import { useNavigate } from 'react-router'

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {


  const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc)

  const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation)
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

  const isGroup = selectedDeleteChat.groupChat;
  const chatId = selectedDeleteChat.chatId;
  const navigate = useNavigate()

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false))
    deleteMenuAnchor.current = null;
  }

  const leaveGroupHandler = () => {
    closeHandler()
    leaveGroup("Leaving Group...", chatId)
  }
  const deleteChatHandler = () => {
    closeHandler()
    deleteChat("Deleting Chat...", chatId)
  }

  useEffect(() => {
    if (deleteChatData, leaveGroupData) navigate("/")
  }, [deleteChatData, leaveGroupData])

  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteMenuAnchor.current} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "center", horizontal: "center" }}>
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer"
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {
          isGroup ? (<><ExitToAppIcon /><Typography>Leave Group</Typography></>) : (<><DeleteIcon /><Typography>Delete Chat</Typography></>)
        }
      </Stack>
    </Menu>
  )
}

export default DeleteChatMenu