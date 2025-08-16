import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState({
        dept_name: '',
        description: ''
    });
    const [deptLoading, setDeptLoading] = useState(true);

    useEffect(() => {
        const fetchDepartment = async () => {
            setDeptLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    setDepartment(response.data.department);
                } else {
                    console.error("Failed to fetch department:", response.data.message);
                    alert("Department not found or an error occurred.");
                    navigate('/admin-dashboard/departments');
                }
            } catch (error) {
                console.error("Error fetching department:", error);
                alert('An unexpected error occurred while fetching the department.');
                navigate('/admin-dashboard/departments');
            } finally {
                setDeptLoading(false);
            }
        };

        if (id) {
            fetchDepartment();
        } else {
            setDeptLoading(false);
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment(prevDepartment => ({
            ...prevDepartment,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/department/edit/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                alert('Department updated successfully!');
                navigate('/admin-dashboard/departments');
            } else {
                alert('Failed to update department: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error updating department:", error);
            alert('An unexpected error occurred while updating the department.');
        }
    };

    if (deptLoading) {
        return <div className="text-center p-8">Loading...</div>;
    }

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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Department</h2>
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
                        Update Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditDepartment;
