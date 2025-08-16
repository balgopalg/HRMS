import React from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 bg-gray-100 h-screen overflow-y-auto">
                    <Navbar />
                    <div className="p-4">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user && user.name}</h1>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;