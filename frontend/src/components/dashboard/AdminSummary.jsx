import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBill, FaTimesCircle, FaUsers, FaRupeeSign } from 'react-icons/fa';

const AdminSummary = () => {
    const [summaryData, setSummaryData] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        totalSalaries: 0,
        totalLeave: 0,
        approvedLeave: 0,
        pendingLeave: 0,
        rejectedLeave: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchSummaryData = async () => {
        setLoading(true);
        try {
            // Fetch total employees
            const employeesRes = await axios.get('http://localhost:5000/api/employee', {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });

            // Fetch total departments
            const departmentsRes = await axios.get('http://localhost:5000/api/department', {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });

            // Fetch total salaries
            const salariesRes = await axios.get('http://localhost:5000/api/salary', {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });

            // Fetch leave applications
            const leavesRes = await axios.get('http://localhost:5000/api/leave', {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });

            if (employeesRes.data.success && departmentsRes.data.success && salariesRes.data.success && leavesRes.data.success) {
                const totalSalaries = salariesRes.data.salaries.reduce((sum, salary) => sum + salary.netSalary, 0);
                
                const approved = leavesRes.data.leaveApplications.filter(leave => leave.status === 'Approved').length;
                const pending = leavesRes.data.leaveApplications.filter(leave => leave.status === 'Pending').length;
                const denied = leavesRes.data.leaveApplications.filter(leave => leave.status === 'Denied').length;

                setSummaryData({
                    totalEmployees: employeesRes.data.employees.length,
                    totalDepartments: departmentsRes.data.departments.length,
                    totalSalaries: totalSalaries,
                    totalLeave: leavesRes.data.leaveApplications.length,
                    approvedLeave: approved,
                    pendingLeave: pending,
                    rejectedLeave: denied,
                });
            }

        } catch (error) {
            console.error("Error fetching dashboard summary data:", error);
            // You can add a user-facing alert here if needed
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummaryData();
    }, []);

    // Display a loading message while data is being fetched
    if (loading) {
        return <div className="p-6 text-center text-xl">Loading dashboard data...</div>;
    }

    return (
        <>
            <div className='p-6 '>
                <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                    <SummaryCard icon={<FaUsers />} text="Total Employees" number={summaryData.totalEmployees} color='bg-teal-600' />
                    <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summaryData.totalDepartments} color='bg-yellow-600' />
                    <SummaryCard icon={<FaMoneyBill />} text="Total Net Salary" number={<><FaRupeeSign className='inline'/>{summaryData.totalSalaries.toFixed(2)}</>} color='bg-blue-600' />
                </div>
            </div>
            
            <div className='mt-12'>
                <h4 className='text-xl font-bold'>Leave Details</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <SummaryCard icon={<FaFileAlt />} text="Total Leave Requests" number={summaryData.totalLeave} color='bg-teal-600' />
                    <SummaryCard icon={<FaCheckCircle />} text="Approved Leave" number={summaryData.approvedLeave} color='bg-green-600' />
                    <SummaryCard icon={<FaHourglassHalf />} text="Pending Leave" number={summaryData.pendingLeave} color='bg-blue-600' />
                    <SummaryCard icon={<FaTimesCircle />} text="Rejected Leave" number={summaryData.rejectedLeave} color='bg-red-600' />
                </div>
            </div>
        </>
    );
};

export default AdminSummary;