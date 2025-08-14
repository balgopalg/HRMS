// src/utils/RoleBasedRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RoleBasedRoutes = ({ children, requiredRole }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if user is logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if the logged-in user has the required role
    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    // If both checks pass, render the children
    return children;
};

export default RoleBasedRoutes;