import { Box, Typography } from '@mui/material';
import React from 'react'
import { lightBlue } from '../../constants/Color';
import moment from 'moment';
import { FileFormate } from '../../lib/Features';
import RenderAttachments from './RenderAttachments';
import { motion } from "framer-motion";


const MessageComponent = ({ message, user }) => {

  const { sender, content, attachments = [], createdAt } = message;

  const timeAgo = moment(createdAt).fromNow();

  const sameSender = sender?._id === user?._id;
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-stasrt",
        color: "black",
        backgroundColor: "white",
        width: "fit-content",
        padding: "0.5rem",
        borderRadius: "5px"
      }}
    >
      {
        !sameSender && <Typography color={lightBlue} fontWeight="600" variant='caption'>{sender.name}</Typography>
      }
      {
        content && <Typography>{content}</Typography>
      }
      {
        attachments.length > 0 && attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = FileFormate(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" rel="noreferrer" download style={{ color: "black" }} >{RenderAttachments(file, url)}</a>
            </Box>
          )

        })
      }
      <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
    </motion.div >
  )
}

export default MessageComponent