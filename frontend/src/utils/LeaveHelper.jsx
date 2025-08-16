import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LeaveButtons = ({ _id, status, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin-dashboard/leave/${_id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this leave application?')) {
            onDelete(_id);
        }
    };

    return (
        <div className='flex gap-2 items-center'>
            {status === "Pending" && (
                <button
                    className='px-2 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors duration-200'
                    onClick={handleEdit}
                >
                    Review
                </button>
            )}
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
    { name: "S.No", selector: (row) => row.sno, sortable: true, width: "70px" },
    { name: "Employee Name", selector: (row) => row.employee, sortable: true, minWidth: "150px" },
    { name: "Start Date", selector: (row) => row.startDate, sortable: true, minWidth: "150px" },
    { name: "End Date", selector: (row) => row.endDate, sortable: true, minWidth: "150px" },
    { name: "Reason", selector: (row) => row.reason, sortable: true, minWidth: "200px" },
    { name: "Status", selector: (row) => row.status, sortable: true, minWidth: "100px" },
    {
        name: "Action",
        cell: (row) => (
            <LeaveButtons _id={row._id} status={row.status} onDelete={row.onDelete} />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "180px"
    },
];