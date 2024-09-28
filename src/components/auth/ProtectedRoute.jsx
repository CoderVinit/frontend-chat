import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children, user, path = "/login" }) => {
  if (!user) return <Navigate to={path} />;
  return children ? children : <Outlet />
}

export default ProtectedRoute
