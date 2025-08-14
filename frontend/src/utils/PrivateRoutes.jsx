import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/authContext';

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoutes