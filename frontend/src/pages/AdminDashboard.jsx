// src/components/AdminDashboard.jsx

import React from 'react'
import { useAuth } from '../context/authContext'

function AdminDashboard() {
  const { user } = useAuth();

  // Conditional check to prevent crashing if `user` is null
  if (!user) {
    return <div>Please log in to view the Admin Dashboard.</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}

export default AdminDashboard;