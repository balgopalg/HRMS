import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

// Dashboard pages/components
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/addEmployee.jsx";
import EditEmployee from "./components/employee/EditEmployee";
import LeaveList from "./components/leave/LeaveList.jsx";
import AddLeave from "./components/leave/AddLeave.jsx";
import EditLeave from "./components/leave/EditLeave.jsx";
import SalaryList from "./components/salary/SalaryList";
import AddSalary from "./components/salary/AddSalary";
import EditSalary from "./components/salary/EditSalary";
import Settings from "./components/settings/settings.jsx";

// Layout that wires Navbar + Sidebar + Outlet
import AdminLayout from "./layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={<div>You do not have permission to view this page.</div>}
        />

        {/* Protected */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />

          {/* Admin area with shared layout */}
          <Route
            path="/admin-dashboard"
            element={
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminLayout />
              </RoleBasedRoutes>
            }
          >
            {/* Nested routes */}
            <Route index element={<AdminSummary />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="department/:id" element={<EditDepartment />} />

            <Route path="employees" element={<EmployeeList />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee/:id" element={<EditEmployee />} />

            <Route path="leaves" element={<LeaveList />} />
            <Route path="add-leave" element={<AddLeave />} />
            <Route path="leave/:id" element={<EditLeave />} />

            <Route path="salaries" element={<SalaryList />} />
            <Route path="add-salary" element={<AddSalary />} />
            <Route path="salary/:id" element={<EditSalary />} />

            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Employee area (no shared admin layout) */}
          <Route
            path="/employee-dashboard"
            element={
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
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
