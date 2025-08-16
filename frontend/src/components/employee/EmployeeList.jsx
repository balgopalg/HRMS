import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const fetchEmployees = async () => {
        setEmpLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/employee', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.employees.map((emp) => ({
                    _id: emp._id,
                    sno: sno++,
                    name: emp.name,
                    email: emp.email,
                    phone: emp.phone,
                    department: emp.department ? emp.department.dept_name : 'N/A'
                }));
                setEmployees(data);
                setFilteredEmployees(data);
            }

        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setEmpLoading(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employee/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            fetchEmployees();
            alert('Employee deleted successfully!');
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert('An unexpected error occurred during deletion.');
        }
    };

    const columns = [
        { name: "S.No", selector: (row) => row.sno, sortable: true, width: "70px" },
        { name: "Name", selector: (row) => row.name, sortable: true, minWidth: "150px" },
        { name: "Email", selector: (row) => row.email, sortable: true, minWidth: "200px" },
        { name: "Phone", selector: (row) => row.phone, sortable: true, minWidth: "150px" },
        { name: "Department", selector: (row) => row.department, sortable: true, minWidth: "150px" },
        {
            name: "Action",
            cell: (row) => (
                <EmployeeButtons _id={row._id} onDelete={handleDeleteEmployee} />
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
        const result = employees.filter((emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredEmployees(result);
    }, [search, employees]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            {empLoading && <div className="text-center text-teal-600">Loading...</div>}

            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700">Manage Employees</h3>
                <p className="text-gray-500 text-sm">View, search and manage all employees</p>
            </div>

            <div className="flex justify-between items-center mb-5 gap-4">
                <div className="relative w-72">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Search by Name or Email"
                    />
                </div>
                <Link
                    to="/admin-dashboard/add-employee"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                >
                    <FaPlus className="text-lg" />
                    <span>Add Employee</span>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={filteredEmployees}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            />
        </div>
    );
};

export default EmployeeList;