import { useFetchData } from '6pp';
import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/Hooks';
import { transformImage } from "../../lib/Features";
import AdminLayout from './layout/AdminLayout';



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
      <Avatar alt={params.row.name} src={params.row.avatar} />
    )
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150
  },

]

const UserManagement = () => {

  const [rows, setRows] = useState([])

  const { loading, data, error } = useFetchData(`http://localhost:4000/api/v1/admin/users`, "user-data")

  useErrors([{
    isError: error,
    error: error,
  }])

  useEffect(() => {
    if (data) {
      setRows(data?.Users?.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar, 50) })))
    }
  }, [data])

  return (
    <AdminLayout>
      {
        loading ? <Skeleton height={"100vh"} /> : <Table heading={"All Users"} column={columns} row={rows} />
      }
    </AdminLayout>
  )
}

export default UserManagement