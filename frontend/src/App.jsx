import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import DepartmentList from './components/department/DepartmentList'; // <-- Import the new component
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import PrivateRoutes from './utils/PrivateRoutes'; // <-- Make sure to import this
import AdminSummary from './components/dashboard/AdminSummary';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment'; // Import the EditDepartment component

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<div>You do not have permission to view this page.</div>} />
                
                {/* Protected Routes */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                    
                    {/* Admin Routes with Nested Layout */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <RoleBasedRoutes requiredRole={['admin']}>
                                <AdminDashboard />
                            </RoleBasedRoutes>
                        }
                    >
                        {/* Nested Routes for the Admin Dashboard */}
                        <Route index element={<AdminSummary />} end/> {/* Default content for /admin-dashboard */}
                        <Route path="departments" element={<DepartmentList />} />
                        <Route path="add-department" element={<AddDepartment />} />
                        <Route path="department/:id" element={<EditDepartment />} />
                        {/* Other nested admin routes will go here */}
                    </Route>
                    
                    {/* Employee Route */}
                    <Route
                        path="/employee-dashboard"
                        element={
                            <RoleBasedRoutes requiredRole={['admin', 'employee']}>
                                <EmployeeDashboard />
                            </RoleBasedRoutes>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;