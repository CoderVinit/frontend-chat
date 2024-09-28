import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useErrors, useSocketEvents } from '../../hooks/Hooks';
import { useMyChatsQuery } from '../../redux/api/api';
import { setIsDeleteMenu, setIsMobileMenu, setSelectedDeleteChat } from '../../redux/reducres/misc';
import { getSocket } from '../../socket';
import Title from '../shared/Title';
import Profile from '../specific/Profile';
import ChatList from './ChatList';
import Header from './Header';
import { NEW_MESSAGES_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/events';
import { increamentNotificationCount, setNewMessagesAlert } from '../../redux/reducres/chat';
import { getOrSaveFromStorage } from '../../lib/Features';
import DeleteChatMenu from '../dialog/DeleteChatMenu';




const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate()
    const chatId = params.chatId
    const deleteMenuAnchor = useRef(null)
    const { isMobileMenu } = useSelector(state => state.misc)
    const { newMessagesAlert } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")

    useErrors([{ isError, error }])


    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGES_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])

    const socket = getSocket()




    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({ chatId, groupChat }))
      deleteMenuAnchor.current = e.currentTarget;
    }

    const handleMobileClose = () => dispatch(setIsMobileMenu(false))


    const newMessageAlertHandler = useCallback((data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data))
    }, [chatId])

    const newRequestHandler = useCallback(() => {
      dispatch(increamentNotificationCount())
    }, [dispatch])

    const refetchListener = useCallback(() => {
      refetch()
      navigate("/")
    }, [refetch, navigate])


    const eventHandlers = {
      [NEW_MESSAGES_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener
    }

    useSocketEvents(socket, eventHandlers)

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

        {
          isLoading ? <Skeleton /> : (
            <Drawer open={isMobileMenu} onClick={handleMobileClose}>
              <ChatList w='70vw' chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} />
            </Drawer>
          )
        }

        <Grid container height="calc(100vh - 4rem)">
          <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height="100%">
            {
              isLoading ? (<Skeleton />) : (<ChatList chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} />)
            }
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item md={4} lg={3} height="100%"
            sx={{ display: { xs: 'none', md: "block" }, padding: "2rem", bgcolor: "rgba(0, 0, 0, 0.85)" }}>
            <Profile />
          </Grid>
        </Grid >
      </>
    )
  }
}


export default AppLayout