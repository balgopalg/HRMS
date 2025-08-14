import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        cell: (row) => <DepartmentButtons row={row} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];

export const DepartmentButtons = ({ _id }) => {
    const navigate = useNavigate();
    return (
        <div className='flex gap-2 items-center'>
            <button className='px-2 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors duration-200'
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'>Delete</button>
        </div>
    );
};