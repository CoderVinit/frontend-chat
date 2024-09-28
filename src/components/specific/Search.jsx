import { useInputValidation } from "6pp"
import { Search as SearchIcon } from "@mui/icons-material"
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation } from "../../hooks/Hooks"
import { useLazySearchUsersQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import { setIsSearch } from '../../redux/reducres/misc'
import UserItems from '../shared/UserItems'


const Search = () => {
  const { isSearch } = useSelector(state => state.misc)
  const search = useInputValidation("")
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [searchUSer] = useLazySearchUsersQuery()
  const [sendFriendRequest, isLoadingSendFriend] = useAsyncMutation(useSendFriendRequestMutation)

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", { userId: id })

  }
  const handleClose = () => dispatch(setIsSearch(false))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      search.value && searchUSer(search.value).then(({ data }) => setUsers(data.others)).catch((err) => toast.error("Something Went Wrong"))
    }, 1000)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [search.value])


  return (
    <Dialog open={isSearch} onClose={handleClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField label="" value={search.value} onChange={search.changeHandler} variant={"outlined"} size={"small"}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {
            users?.map((u) => {
              return (
                <UserItems user={u} key={u._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriend} />
              )
            })
          }
        </List>
      </Stack>

    </Dialog>
  )
}

export default Search