import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Navbar = ({ isCollapsed = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Shift navbar based on sidebar width: w-64 (16rem) vs w-20 (5rem)
  const offsetClass = isCollapsed ? "left-20" : "left-64";

  return (
    <nav
      className={`fixed top-0 ${offsetClass} right-0 z-20 h-16 px-6
                  flex items-center justify-between
                  bg-white/80 backdrop-blur-md shadow-md transition-all duration-300`}
    >
      {/* Brand / Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src="/src/assets/Logo.png"
          alt="Logo"
          className="h-12 w-12 rounded-lg shadow-sm"
        />
      </NavLink>

      {/* User Profile */}
      {user && (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-600
                       transition-colors duration-200"
          >
            <FaUserCircle className="text-2xl text-gray-500" />
            <span className="text-base font-medium text-teal-700">
              {user.name.toUpperCase() || "User"}
            </span>
            <FaChevronDown
              className={`text-sm transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2
                         border border-gray-100 z-30"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700
                           hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                <FaSignOutAlt className="text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
