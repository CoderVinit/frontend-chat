import { useFetchData } from '6pp'
import { Avatar, Box, Skeleton, Stack } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import RenderAttachments from "../../components/shared/RenderAttachments"
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/Hooks'
import { FileFormate, transformImage } from '../../lib/Features'
import AdminLayout from './layout/AdminLayout'


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;


      return attachments?.length > 0 ? attachments.map((i) => {
        key: i;
        const file = FileFormate(i);
        // VerticalAlignBottom
        // console.log(file)
        return <Box>
          <a href={i}
            download
            target='_blank'
            rel="noreferrer"
            style={{
              color: "black"
            }}
          >
            {RenderAttachments(file, i)}
          </a>
        </Box>
      }) : "No attachments"
    }
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250
  },

]



const MessageManagement = () => {

  const [rows, setRows] = useState([])

  const { loading, data, error } = useFetchData(`http://localhost:4000/api/v1/admin/messages`, "dashboard-messages")

  useErrors([{
    isError: error,
    error: error,
  }])

  useEffect(() => {
    if (data) {
      setRows(data?.messages?.map((i) => ({
        ...i, key: i._id, id: i._id, attachments: i.attachments.map((m) => transformImage(m.url, 50)),
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50)
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss, a")
      })))
    }
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <Skeleton height={"100vh"} /> : <Table heading={"All Messages"} column={columns} row={rows} rowHeight={200} />
      }
    </AdminLayout>
  )
}

export default MessageManagement