import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EmployeeButtons = ({ _id, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin-dashboard/employee/${_id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            onDelete(_id);
        }
    };

    return (
        <div className='flex gap-2 items-center'>
            <button
                className='px-2 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors duration-200'
                onClick={handleEdit}
            >
                Edit
            </button>
            <button
                className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno,
        sortable: true,
        width: "100px",
        center: true
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        minWidth: "150px"
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        minWidth: "200px"
    },
    {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true,
        width: "150px"
    },
    {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
        minWidth: "150px"
    },
    {
        name: "Action",
        cell: (row) => (
            <EmployeeButtons _id={row._id} onDelete={row.onDelete} />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "180px"
    },
];