import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { useParams } from "react-router-dom";

const ChatList = ({
  w = "100%",
  chats = [],
  onlineUsers = [],
  newMessagesAlert,
  handleDeleteChat, }) => {
  const params = useParams();
  const chatId = params.chatId;
  return (
    <Stack direction="column" width={w} overflow={"auto"} height={"100%"}>
      {chats?.map((item, index) => {
        const { avatar, _id, name, groupChat, members } = item;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((menber) => onlineUsers.includes(_id));
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            _id={_id}
            key={_id}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
