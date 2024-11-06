import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const AdminDashboard = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  if (!adminInfo) {
      return <Navigate to="/admin/login" replace />;
  }
  return (
    <>
    <h2>Welcome Admin</h2>
    </>
  )
}

export default AdminDashboard