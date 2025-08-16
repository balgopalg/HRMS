import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminSummary from './components/dashboard/AdminSummary'; // Import the AdminSummary component
import DepartmentList from './components/department/DepartmentList'; //Import the DepartmentList component
import AddDepartment from './components/department/AddDepartment'; //Import the AddDepartment component
import EditDepartment from './components/department/EditDepartment'; //Import the EditDepartment component
import EmployeeList from './components/employee/EmployeeList'; // Import the EmployeeList component
import AddEmployee from './components/employee/addEmployee.jsx'; // Import the AddEmployee component
import EditEmployee from './components/employee/EditEmployee'; // Import the EditEmployee component
import LeaveList from './components/leave/LeaveList.jsx';
import AddLeave from './components/leave/AddLeave.jsx';
import EditLeave from './components/leave/EditLeave.jsx';
import SalaryList from './components/salary/SalaryList';
import AddSalary from './components/salary/AddSalary';
import EditSalary from './components/salary/EditSalary';
import Settings from './components/settings/settings.jsx';

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
                        <Route index element={<AdminSummary />} end/>
                        
                        {/* Department Routes */}
                        <Route path="departments" element={<DepartmentList />} />
                        <Route path="add-department" element={<AddDepartment />} />
                        <Route path="department/:id" element={<EditDepartment />} />

                        {/* Employee Routes */}
                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="add-employee" element={<AddEmployee />} />
                        <Route path="employee/:id" element={<EditEmployee />} />
                        
                        {/* Leave Routes */}
                        <Route path="leaves" element={<LeaveList />} />
                        <Route path="add-leave" element={<AddLeave />} />
                        <Route path="leave/:id" element={<EditLeave />} />

                        {/* Salary Routes */}
                        <Route path="salaries" element={<SalaryList />} />
                        <Route path="add-salary" element={<AddSalary />} />
                        <Route path="salary/:id" element={<EditSalary />} />

                        <Route path="settings" element={<Settings />} />
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