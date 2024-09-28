import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Suspense, lazy, useState } from 'react';
import { orange } from '../../constants/Color'
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, NotificationsActiveRounded as NotificationsIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userNotExists } from '../../redux/reducres/auth';
import { setIsMobileMenu, setIsNotification, setIsSearch, setIsNewGroup } from '../../redux/reducres/misc';
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import('../specific/Notifications'))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))
import { useSelector } from 'react-redux'
import { resetNotificationCount } from '../../redux/reducres/chat';




const Header = () => {
  const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc)
  const { notificationCount } = useSelector(state => state.chat)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const [isLogout, setIsLogout] = useState(false)



  const handleMobile = () => {
    dispatch(setIsMobileMenu(true))
  }
  const openSearchDialog = () => {
    dispatch(setIsSearch(true))
  }
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }
  const navigateToGroup = () => { navigate("/groups") }
  const LogoutHandler = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/users/logout", { withCredentials: true });
      dispatch(userNotExists())
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    }
  }
  const notificationHandler = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount())
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar >
            <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>Chat</Typography>
            <Box sx={{ display: { sx: "block", sm: "none" } }}>
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn title="Search" onClick={openSearchDialog} icon={<SearchIcon />} />
              <IconBtn title="New Group" onClick={openNewGroup} icon={<AddIcon />} />
              <IconBtn title="Manage Groups" onClick={navigateToGroup} icon={<GroupIcon />} />
              <IconBtn title="Notifications" onClick={notificationHandler} icon={<NotificationsIcon />} value={notificationCount} />
              <IconBtn title="Logout" onClick={LogoutHandler} icon={<LogoutIcon />} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (<Suspense fallback={<Backdrop open />}>
        <SearchDialog />
      </Suspense>)}
      {isNotification && (<Suspense fallback={<Backdrop open />}>
        <NotificationDialog />
      </Suspense>)}
      {isNewGroup && (<Suspense fallback={<Backdrop open />}>
        <NewGroupDialog />
      </Suspense>)}
    </>
  )
};


const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {
          value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : icon
        }
      </IconButton>
    </Tooltip>
  )
}

export default Header