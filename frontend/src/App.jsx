// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RoleBasedRoutes from './utils/RoleBasedRoutes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<div>You do not have permission to view this page.</div>} />
                
                {/* Simplified Admin route */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <RoleBasedRoutes requiredRole={['admin']}>
                            <AdminDashboard />
                        </RoleBasedRoutes>
                    }
                />
                
                {/* Protected Employee route */}
                <Route
                    path="/employee-dashboard"
                    element={
                        <RoleBasedRoutes requiredRole={['admin', 'employee']}>
                            <EmployeeDashboard />
                        </RoleBasedRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;