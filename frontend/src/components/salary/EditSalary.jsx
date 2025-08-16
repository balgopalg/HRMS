import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const EditSalary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [salary, setSalary] = useState({
        employee: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        netSalary: 0,
        paymentDate: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalary = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    const salaryData = response.data.salary;
                    setSalary({
                        ...salaryData,
                        employee: salaryData.employee ? salaryData.employee.name : 'N/A', // Display employee name
                        paymentDate: new Date(salaryData.paymentDate).toISOString().slice(0, 10),
                    });
                } else {
                    alert("Salary record not found.");
                    navigate('/admin-dashboard/salaries');
                }
            } catch (error) {
                console.error("Error fetching salary record:", error);
                alert('An unexpected error occurred.');
                navigate('/admin-dashboard/salaries');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchSalary();
        } else {
            setLoading(false);
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newSalary = { ...salary, [name]: value };
        setSalary(newSalary);
        calculateNetSalary(newSalary);
    };

    const calculateNetSalary = (newSalary) => {
        const basic = parseFloat(newSalary.basicSalary) || 0;
        const allowances = parseFloat(newSalary.allowances) || 0;
        const deductions = parseFloat(newSalary.deductions) || 0;
        const net = basic + allowances - deductions;
        setSalary(prevSalary => ({ ...prevSalary, netSalary: net.toFixed(2) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/salary/edit/${id}`, salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                alert('Salary record updated successfully!');
                navigate('/admin-dashboard/salaries');
            } else {
                alert('Failed to update salary record: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error updating salary record:", error);
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Salary Record</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="employee" className="block text-gray-700 text-sm font-semibold mb-2">
                            Employee
                        </label>
                        <input
                            type="text"
                            id="employee"
                            name="employee"
                            value={salary.employee}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="basicSalary" className="block text-gray-700 text-sm font-semibold mb-2">
                            Basic Salary
                        </label>
                        <input
                            type="number"
                            id="basicSalary"
                            name="basicSalary"
                            value={salary.basicSalary}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., 50000"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="allowances" className="block text-gray-700 text-sm font-semibold mb-2">
                            Allowances
                        </label>
                        <input
                            type="number"
                            id="allowances"
                            name="allowances"
                            value={salary.allowances}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., 5000"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deductions" className="block text-gray-700 text-sm font-semibold mb-2">
                            Deductions
                        </label>
                        <input
                            type="number"
                            id="deductions"
                            name="deductions"
                            value={salary.deductions}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., 2000"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="netSalary" className="block text-gray-700 text-sm font-semibold mb-2">
                            Net Salary
                        </label>
                        <input
                            type="text"
                            id="netSalary"
                            name="netSalary"
                            value={salary.netSalary}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                            readOnly
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="paymentDate" className="block text-gray-700 text-sm font-semibold mb-2">
                            Payment Date
                        </label>
                        <input
                            type="date"
                            id="paymentDate"
                            name="paymentDate"
                            value={salary.paymentDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Update Salary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditSalary;