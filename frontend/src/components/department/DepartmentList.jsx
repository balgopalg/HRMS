import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);

    const fetchDepartments = async () => {
        setDeptLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.departments.map((dept) => ({
                    _id: dept._id,
                    sno: sno++,
                    dept_name: dept.dept_name,
                    description: dept.description,
                }));
                setDepartments(data);
            }

        } catch (error) {
            console.error("Error fetching departments:", error);
        } finally {
            setDeptLoading(false);
        }
    };

    // Function to handle department deletion
    const handleDeleteDepartment = async (id) => {

        try {
            await axios.delete(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Refresh the department list after a successful deletion
            fetchDepartments();
            alert('Department deleted successfully!');
        } catch (error) {
            console.error("Error deleting department:", error);
            alert('An unexpected error occurred during deletion.');
        }

    };

    // Corrected: The columns array is now a dependency-free constant.
    const columns = [
        { name: "S.No", selector: (row) => row.sno, sortable: true, width: "80px" },
        { name: "Department Name", selector: (row) => row.dept_name, sortable: true, minWidth: "200px" },
        { name: "Description", selector: (row) => row.description, sortable: true, minWidth: "300px" },
        {
            name: "Action",
            // Corrected: Pass the delete handler to DepartmentButtons
            cell: (row) => <DepartmentButtons _id={row._id} onDelete={handleDeleteDepartment} />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        },
    ];

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div>
            {deptLoading && <div>Loading...</div>}

            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" className='px-4 py-0.5 border border-gray-300 rounded' placeholder='Search by Dept Name' />
                <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded text-white'>Add Department</Link>
            </div>
            <div className='mt-5'>
                <DataTable
                    columns={columns}
                    data={departments}
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default DepartmentList;