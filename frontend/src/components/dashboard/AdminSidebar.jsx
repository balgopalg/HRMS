import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { name: "Dashboard", path: "/admin-dashboard", icon: FaTachometerAlt, end: true },
    { name: "Employees", path: "/admin-dashboard/employees", icon: FaUsers },
    { name: "Departments", path: "/admin-dashboard/departments", icon: FaBuilding },
    { name: "Leave", path: "/admin-dashboard/leaves", icon: FaCalendarAlt },
    { name: "Salary", path: "/admin-dashboard/salaries", icon: FaMoneyBillWave },
    { name: "Settings", path: "/admin-dashboard/settings", icon: FaCogs },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-30 text-white shadow-xl transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"}
      bg-gradient-to-b from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-md`}
    >
      {/* Toggle */}
      <div className="flex justify-end p-3">
        <button
          onClick={onToggle}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md transition"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Welcome Section */}
      <div
        className={`mb-8 text-center transition-all duration-500 overflow-hidden
        ${isCollapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-28"}`}
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent tracking-wide">
          Welcome,
        </h3>
        <p className="text-lg font-extrabold text-white drop-shadow-md">Admin</p>
        <p className="text-xs text-gray-300 mt-1">
          {dateTime.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-gray-400">
          {dateTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {items.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-all duration-200",
                    isActive
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white",
                  ].join(" ")
                }
              >
                <item.icon className="text-lg min-w-[20px]" />

                {/* Animated Text */}
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300
                    ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className={`mt-auto p-3 text-[11px] text-gray-400 text-center transition-all duration-300 overflow-hidden
        ${isCollapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-10"}`}
      >
        © {new Date().getFullYear()} HRMatrix
      </div>
    </aside>
  );
};

export default AdminSidebar;
