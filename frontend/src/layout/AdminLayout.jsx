import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";

const AdminLayout = () => {
  // shared state so Navbar and content shift when Sidebar toggles
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((s) => !s);

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Sidebar (fixed) */}
      <AdminSidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />

      {/* Top navbar (fixed, width/offset reacts to sidebar) */}
      <Navbar isCollapsed={isCollapsed} onToggle={toggleSidebar} />

      {/* Page content area */}
      <main
        className={`pt-20 pb-6 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
