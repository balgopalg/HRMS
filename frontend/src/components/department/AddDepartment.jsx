import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // back arrow icon

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept_name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (department.dept_name.trim() === '') {
            alert('Department name cannot be empty!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert('Department added successfully!');
                setDepartment({ dept_name: '', description: '' });
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert('Failed to add department: ' + error.response.data.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-6"
            >
                <FaArrowLeft className="text-sm" />
                Back
            </button>

            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-teal-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="dept_name"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Department Name
                        </label>
                        <input
                            type="text"
                            id="dept_name"
                            name="dept_name"
                            value={department.dept_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="e.g., Computer Science"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor='description'
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={department.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Enter department description"
                            rows="4"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
