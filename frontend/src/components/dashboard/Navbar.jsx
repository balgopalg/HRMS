import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // The w-[calc(100%-16rem)] calculation assumes the sidebar is 64 units (16rem) wide.
  // This ensures the navbar takes up the remaining horizontal space.
  return (
    <nav className="bg-white shadow-md p-4 w-[calc(100%-16rem)] ml-64 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        {/* Brand Name on the Left (for visual balance with the sidebar) */}
        <div className="text-gray-800 text-2xl font-bold">
          <NavLink to="/" className="text-teal-600">
            <img src="/src/assets/logo.jpg" alt="" className="h-10 rounded" />
          </NavLink>
        </div>

        {/* User Profile and Dropdown on the Right */}
        {user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 focus:outline-none transition-colors duration-200"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-lg font-medium">{user.name || 'User'}</span>
              <FaChevronDown
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;