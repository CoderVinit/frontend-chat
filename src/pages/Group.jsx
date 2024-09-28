import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Skeleton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from '../components/shared/AvatarCard';
import { Link } from "../components/styles/StyledComponents";
// import { sampleChats, sampleUser } from "../constants/SampleData"
import { useDispatch, useSelector } from 'react-redux';
import { LayoutLoader } from '../components/layout/Loader';
import UserItems from '../components/shared/UserItems';
import { useAsyncMutation, useErrors } from '../hooks/Hooks';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMember } from '../redux/reducres/misc';
const ConfirmDeleteDialog = lazy(() => import("../components/dialog/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialog/AddMemberDialog"))


const Group = () => {

  const dispatch = useDispatch()
  const { isAddMember } = useSelector(state => state.misc)

  const chatId = useSearchParams()[0].get('group')
  const navigate = useNavigate()

  const myGroups = useMyGroupsQuery("");
  const myGroupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId })
  const [updateGroup, isLoadinGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMembersMutation)
  const [deleteGroup, isDeleteGroup] = useAsyncMutation(useDeleteChatMutation)


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [members, setMembers] = useState([])

  const errors = [{
    isError: myGroups.isError,
    error: myGroups.error
  }, {
    isError: myGroupDetails.isError,
    error: myGroupDetails.error
  }
  ]
  useErrors(errors)

  useEffect(() => {
    if (myGroupDetails.data) {
      setGroupName(myGroupDetails.data.chat.name);
      setGroupNameUpdatedValue(myGroupDetails.data.chat.name);
      setMembers(myGroupDetails.data.chat.members)
    } () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([])
      setIsEdit(false)
    }

  }, [myGroupDetails.data])

  const navigateBack = () => {
    navigate("/")
  }

  const handleMobile = () => {
    setIsMobileMenuOpen(pre => !pre)
  }
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }

  const updateGroupName = () => {
    setIsEdit(false)
    updateGroup("Updating Group Name...", { chatId, name: groupNameUpdatedValue })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMembers = () => {
    dispatch(setIsAddMember(true))
  }
  const handleCloseAddMember = () => {
    dispatch(setIsAddMember(false))
  }

  const deleteHandler = () => {
    closeConfirmDeleteHandler()
    deleteGroup("Deleting Group...", chatId)
    navigate("/groups")
  }
  const removeMemberHandler = (id) => {
    removeMember("Removing Group Member...", { chatId, userId: id });
  }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  }, [chatId])


  const IconsBtn = <>


    <Box sx={{
      display: {
        xs: "block",
        sm: "none"
      },
      position: "fixed",
      right: "1rem",
      top: "1rem"
    }}>
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>


    <Tooltip title="back">
      <IconButton sx={{
        position: "absolute", top: "2rem", left: "2rem", bgcolor: "rgba(0,0,0,0.7)", color: "white", "&:hover": {
          bgcolor: "rgba(0,0,0,0.8)"
        }
      }} onClick={navigateBack} >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>


  const GroupName = <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} p={"2rem"} spacing={"1rem"}>
    {
      isEdit ? <>
        <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
        <IconButton onClick={updateGroupName} disabled={isLoadinGroupName}><DoneIcon /></IconButton>
      </> : (<>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={() => setIsEdit(true)} disabled={isLoadinGroupName}>{<EditIcon />}</IconButton>
      </>)
    }
  </Stack>

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row"
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem"
      }}
    >
      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button variant='contained' size='large' startIcon={<AddIcon />} onClick={openAddMembers}>Add Member</Button>
    </Stack>
  )


  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={"100vh"}>
      <Grid item sx={{ display: { xs: "none", sm: "block" }, overflowY: "auto", height: "100%" }} position={"relative"} sm={4} bgcolor={"bisque"}> <GroupList myGroup={myGroups?.data?.groups} chatId={chatId} /></Grid>
      <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "1rem 3rem" }}>

        {IconsBtn}
        {GroupName && (<>
          {GroupName}
          <Typography margin={"1rem"} alignSelf={"flex-start"} variant='body1'>Members</Typography>
          <Stack maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            height={"50vh"}
            sx={{ overflowY: "auto" }}
          >
            {/* Members */}
            {
              isLoadingRemoveMember ? <Skeleton /> : members?.map((i) => (
                <UserItems key={i._id} user={i} isAdded styling={{
                  boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                  padding: "1rem 2rem",
                  borderRadius: "1rem"
                }}
                  handler={removeMemberHandler}
                />
              ))
            }
          </Stack>
          {ButtonGroup}
        </>)}

      </Grid>
      {
        isAddMember && <Suspense fallback={<Backdrop open />}><AddMemberDialog chatId={chatId} /></Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>
      }

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none"
          }
        }} open={isMobileMenuOpen} onClose={handleMobileClose} anchor="left">
        <GroupList w='50vw' myGroup={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

const GroupList = ({ w = "100%", myGroup = [], chatId }) => (
  <Stack width={w}>
    {myGroup.length > 0 ? (
      myGroup.map((group, i) => <GroupListItem key={i} group={group} chatId={chatId} />)) : (
      <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>
    )
    }
  </Stack>
)

const GroupListItem = memo(({ group, chatId }) => {
  const { name, _id, avatar } = group;
  return <Link to={`?group=${_id}`} onClick={(e) => { if (chatId === _id) e.preventDefault() }}>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarCard avatar={avatar} />
      <Typography>{name}</Typography>
    </Stack>
  </Link>
})

export default Group