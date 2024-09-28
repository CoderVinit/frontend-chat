import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/Hooks";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducres/misc";
import UserItems from "../shared/UserItems";

const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector(state => state.misc)

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([]); // eslint-disable-line
  const groupName = useInputValidation("")


  const errors = [
    {
      isError,
      error,
    },
  ]
  useErrors(errors)


  const selectMemberHandler = (id) => {
    setSelectedMembers(pre => pre.includes(id) ? pre.filter((currElement) => currElement !== id) : [...pre, id])
  };
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required!");
    if (selectedMembers.length < 2) return toast.error("Group must have minimum 3 members");

    newGroup("Creating a new Group...", { name: groupName?.value, members: selectedMembers })

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }


  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? <Skeleton /> : data?.friends?.map((u) => {
            return (
              <UserItems user={u} key={u._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(u._id)} />
            );
          })}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="text" color="error" size="large" onClick={closeHandler}>Cancel</Button>
          <Button variant="contained" color="primary" size="large" onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
