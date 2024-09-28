import { useInfiniteScrollTop } from '6pp';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FileMenu from '../components/dialog/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { grayColor, orange } from '../constants/Color';
import { NEW_MESSAGE, START_TYPING, STOP_TYPING, ALERT } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/Hooks';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { setIsFileMenu } from '../redux/reducres/misc';
import { getSocket } from '../socket';
import { removeNewMessagesAlert } from '../redux/reducres/chat';
import { TypingLoader } from '../components/layout/Loader';
import { useNavigate } from 'react-router';




const Chat = ({ chatId, user }) => {

  const containerRef = useRef(null)
  const socket = getSocket()
  const dispatch = useDispatch()
  const BottomRef = useRef(null)
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [IAmTyping, setIAmTyping] = useState(false);
  const [UserTyping, setUserTyping] = useState(false);
  const typingTimeOut = useRef(null)


  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page })

  const { data: oldMessage, setData: setOldMessage } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  )

  const errors = [{ isError: chatDetails.isError, error: chatDetails.error },
  { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }]
  const members = chatDetails?.data?.chat?.members

  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    socket.emit(NEW_MESSAGE, { members, chatId, message });
    setMessage("")
  }

  useEffect(() => {

    dispatch(removeNewMessagesAlert(chatId))

    return () => {
      setMessages([])
      setOldMessage([])
      setMessage("")
      setPage(1)
    }
  }, [chatId])


  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true)
    }


    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIAmTyping(false)
    }, [2000])
  }

  useEffect(() => {
    if (BottomRef.current) BottomRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  useEffect(() => {
    if (chatDetails.isError) return navigate("/")
  }, [chatDetails.isError])

  const newMessageHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages(prev => [...prev, data.message])
  }, [chatId])

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(true);
  }, [chatId])

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false);
  }, [chatId])

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const alertListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: Math.random,
        name: "Admin"
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    };

    setMessages((pre) => [...pre, messageForAlert])

  }, [chatId])

  const eventHandlers = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  }

  useSocketEvents(socket, eventHandlers)

  useErrors(errors)

  const allMessages = [...oldMessage, ...messages]

  return chatDetails.isLoading ? <Skeleton /> : (
    <>
      <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} bgcolor={grayColor} height={"90%"}
        sx={{
          overflowX: 'hidden',
          overflowY: "auto"
        }}
      >
        {
          allMessages?.map((data, i) => (
            <MessageComponent message={data} key={i} user={user.data} />
          ))
        }

        {UserTyping && <TypingLoader />}
        <div ref={BottomRef} />
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack direction={"row"} alignItems={"center"} height={"100%"} padding={"1rem"} position={"relative"}>
          <IconButton sx={{ position: "absolute", rotate: "30deg", left: "1.5rem" }} onClick={handleFileOpen}>
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder='Type your message here....' value={message} onChange={messageOnChange} />
          <IconButton type='submit' sx={{
            backgroundColor: orange,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              backgroundColor: "error.dark",
            }


          }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

export default AppLayout()(Chat);
