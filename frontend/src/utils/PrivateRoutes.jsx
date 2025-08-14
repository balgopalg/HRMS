import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoutes = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If a user is authenticated, render the nested routes
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;