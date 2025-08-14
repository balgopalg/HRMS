import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DepartmentButtons = ({ _id, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin-dashboard/department/${_id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this department?')) {
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
        name: "S No",
        selector: (row) => row.sno,
        sortable: true
    },
    {
        name: "Department Name",
        selector: (row) => row.dept_name,
        sortable: true
    },
    {
        name: "Description",
        selector: (row) => row.description,
        sortable: true
    },
    {
        name: "Action",
        // The `cell` property renders a custom component for each row
        cell: (row) => <DepartmentButtons _id={row._id} onDelete={row.onDelete} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];