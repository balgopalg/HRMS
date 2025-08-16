import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
} from 'react-icons/fa';

const AdminSidebar = () => {
  const sidebarItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: FaTachometerAlt, end: true },
    { name: 'Employees', path: '/admin-dashboard/employees', icon: FaUsers },
    { name: 'Departments', path: '/admin-dashboard/departments', icon: FaBuilding },
    { name: 'Leave', path: '/admin-dashboard/leave', icon: FaCalendarAlt },
    { name: 'Salary', path: '/admin-dashboard/salary', icon: FaMoneyBillWave },
    { name: 'Settings', path: '/admin-dashboard/settings', icon: FaCogs },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen flex flex-col p-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-center text-teal-400">
          CampusCare HR <br />
          (Utkal University)
        </h3>
      </div>
      <nav className="flex-1">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-all duration-200
                   ${
                     isActive
                       ? 'bg-teal-600 text-white shadow-lg'
                       : 'hover:bg-teal-500 hover:text-white hover:shadow-md'
                   }
                   ${
                     !isActive && 'hover:bg-opacity-20'
                   }`
                }
              >
                <item.icon className="mr-3 text-lg" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;