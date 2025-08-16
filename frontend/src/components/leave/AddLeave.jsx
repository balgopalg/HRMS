import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const AddLeave = () => {
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        employee: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    setEmployees(response.data.employees);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave({ ...leave, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!leave.employee || !leave.startDate || !leave.endDate || !leave.reason.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/leave/add', leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert('Leave application submitted successfully!');
                navigate('/admin-dashboard/leaves');
            } else {
                alert('Failed to submit leave application: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting leave application:", error);
            // This 'if' block is key to handling the backend validation message
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-6"
            >
                <FaArrowLeft className="text-sm" />
                Back
            </button>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-teal-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Apply for Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="employee" className="block text-gray-700 text-sm font-semibold mb-2">
                            Employee
                        </label>
                        <select
                            id="employee"
                            name="employee"
                            value={leave.employee}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        >
                            <option value="">{loading ? "Loading employees..." : "Select an employee"}</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-semibold mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={leave.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 text-sm font-semibold mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={leave.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="reason" className="block text-gray-700 text-sm font-semibold mb-2">
                            Reason for Leave
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={leave.reason}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;