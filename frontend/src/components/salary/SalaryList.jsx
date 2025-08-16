import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { SalaryButtons } from '../../utils/SalaryHelper';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

const SalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredSalaries, setFilteredSalaries] = useState([]);

    const fetchSalaries = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/salary', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.salaries.map((salary) => ({
                    _id: salary._id,
                    sno: sno++,
                    employee: salary.employee ? salary.employee.name : 'N/A',
                    basicSalary: salary.basicSalary,
                    allowances: salary.allowances,
                    deductions: salary.deductions,
                    netSalary: salary.netSalary,
                    paymentDate: new Date(salary.paymentDate).toLocaleDateString(),
                }));
                setSalaries(data);
                setFilteredSalaries(data);
            }

        } catch (error) {
            console.error("Error fetching salaries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSalary = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            fetchSalaries();
            alert('Salary record deleted successfully!');
        } catch (error) {
            console.error("Error deleting salary record:", error);
            alert('An unexpected error occurred during deletion.');
        }
    };

    const columns = [
        { name: "S.No", selector: (row) => row.sno, sortable: true, width: "70px" },
        { name: "Employee Name", selector: (row) => row.employee, sortable: true, minWidth: "150px" },
        { name: "Basic Salary", selector: (row) => row.basicSalary, sortable: true, minWidth: "150px" },
        { name: "Allowances", selector: (row) => row.allowances, sortable: true, minWidth: "150px" },
        { name: "Deductions", selector: (row) => row.deductions, sortable: true, minWidth: "150px" },
        { name: "Net Salary", selector: (row) => row.netSalary, sortable: true, minWidth: "150px" },
        { name: "Payment Date", selector: (row) => row.paymentDate, sortable: true, minWidth: "150px" },
        {
            name: "Action",
            cell: (row) => (
                <SalaryButtons _id={row._id} onDelete={handleDeleteSalary} />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "180px"
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0d9488',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                minHeight: '55px',
            },
            highlightOnHoverStyle: {
                backgroundColor: '#f0fdfa',
                borderBottomColor: '#0d9488',
                borderBottomWidth: '1px',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e7eb',
                padding: '10px',
            },
        },
    };

    useEffect(() => {
        const result = salaries.filter((salary) =>
            salary.employee.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSalaries(result);
    }, [search, salaries]);

    useEffect(() => {
        fetchSalaries();
    }, []);

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            {loading && <div className="text-center text-teal-600">Loading...</div>}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700">Manage Salaries</h3>
                <p className="text-gray-500 text-sm">View, search and manage all salary records</p>
            </div>
            <div className="flex justify-between items-center mb-5 gap-4">
                <div className="relative w-72">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Search by Employee Name"
                    />
                </div>
                <Link
                    to="/admin-dashboard/add-salary"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                >
                    <FaPlus className="text-lg" />
                    <span>Add Salary</span>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={filteredSalaries}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            />
        </div>
    );
};

export default SalaryList;