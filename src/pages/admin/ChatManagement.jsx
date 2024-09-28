import { Avatar, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AvatarCard from "../../components/shared/AvatarCard";
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/SampleData';
import { transformImage } from '../../lib/Features';
import AdminLayout from './layout/AdminLayout';
import { useFetchData } from '6pp';
import { useErrors } from '../../hooks/Hooks';



const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <AvatarCard avatar={params.row.avatar} />
    )
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => <AvatarCard max={100} avatar={params.row.members} />
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },

]


const ChatManagement = () => {

  const [rows, setRows] = useState([])

  const { loading, data, error } = useFetchData(`http://localhost:4000/api/v1/admin/chats`, "dashboard-chats")
  useErrors([{
    isError: error,
    error: error,
  }])

  useEffect(() => {
    if (data) {
      setRows(data?.chats?.map((i) => ({
        ...i, id: i._id, avatar: (i.avatar).map((i) => transformImage(i, 50)),
        members: i.members.map(m => transformImage(m.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transformImage(i.creator.avatar, 50),
        }
      })))
    }
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <Skeleton height={"100vh"} /> : <Table heading={"All Chats"} column={columns} row={rows} />
      }
    </AdminLayout>
  )
}
export default ChatManagement