import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUser } from '../../constants/SampleData'
import UserItem from '../shared/UserItems'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducres/misc'

const AddMemberDialog = ({ chatId }) => {

  const dispatch = useDispatch()
  const [selectedMembers, setSelectedMembers] = useState([]); // eslint-disable-line

  const { isAddMember } = useSelector(state => state.misc)
  const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation);
  const { isLoading, data, error, isError } = useAvailableFriendsQuery(chatId)

  const selectMemberHandler = (id) => {
    setSelectedMembers(pre => pre.includes(id) ? pre.filter((currElement) => currElement !== id) : [...pre, id])
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  }
  const addMemberSubmitHandler = () => {
    addMember("Adding members...", { chatId, members: selectedMembers })
    closeHandler();
  }

  useErrors([{ isError, error }])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack width={"20rem"} p={"2rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {
            isLoading ? <Skeleton /> : data?.availableFriends?.length > 0 ? (data?.availableFriends?.map((user) => (<UserItem key={user._id} user={user} isAdded={selectedMembers.includes(user._id)} handler={selectMemberHandler} />))) : (<Typography textAlign={"center"}>No Friends</Typography>)
          }
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button color='error' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Submit</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog