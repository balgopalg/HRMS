import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const EditLeave = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        employee: '',
        startDate: '',
        endDate: '',
        reason: '',
        status: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeave = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    const leaveData = response.data.leave;
                    setLeave({
                        ...leaveData,
                        startDate: new Date(leaveData.startDate).toISOString().slice(0, 10),
                        endDate: new Date(leaveData.endDate).toISOString().slice(0, 10),
                        employee: leaveData.employee ? leaveData.employee.name : 'N/A'
                    });
                } else {
                    alert("Leave application not found.");
                    navigate('/admin-dashboard/leave');
                }
            } catch (error) {
                console.error("Error fetching leave application:", error);
                alert('An unexpected error occurred.');
                navigate('/admin-dashboard/leave');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchLeave();
        } else {
            setLoading(false);
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave({ ...leave, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/leave/edit/${id}`, leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                alert('Leave application updated successfully!');
                navigate('/admin-dashboard/leaves');
            } else {
                alert('Failed to update leave application: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error updating leave application:", error);
            alert('An unexpected error occurred.');
        }
    };

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Leave Application</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="employee" className="block text-gray-700 text-sm font-semibold mb-2">
                            Employee
                        </label>
                        <input
                            type="text"
                            id="employee"
                            name="employee"
                            value={leave.employee}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled
                        />
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
                    <div className="mb-4">
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
                    <div className="mb-6">
                        <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={leave.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Denied">Denied</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Update Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditLeave;