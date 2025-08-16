import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const AddEmployee = () => {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
    });
    const [departments, setDepartments] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);

    // Fetch departments for the dropdown menu
    useEffect(() => {
        const fetchDepartments = async () => {
            setDeptLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    setDepartments(response.data.departments);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            } finally {
                setDeptLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (employee.name.trim() === '' || employee.email.trim() === '' || employee.department === '') {
            alert('Please fill in all required fields: Name, Email, and Department.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/employee/add', employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert('Employee added successfully!');
                setEmployee({ name: '', email: '', phone: '', department: '' });
                navigate('/admin-dashboard/employees');
            } else {
                alert('Failed to add employee: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert('An unexpected error occurred.');
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., John Doe"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., john.doe@company.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                            Phone (optional)
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., +1234567890"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="department" className="block text-gray-700 text-sm font-semibold mb-2">
                            Department
                        </label>
                        <select
                            id="department"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        >
                            <option value="">{deptLoading ? "Loading departments..." : "Select a department"}</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        disabled={deptLoading}
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;