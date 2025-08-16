import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

const LeaveList = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredLeaveApplications, setFilteredLeaveApplications] = useState([]);

    const fetchLeaveApplications = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaveApplications.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employee: leave.employee ? leave.employee.name : 'N/A',
                    startDate: new Date(leave.startDate).toLocaleDateString(),
                    endDate: new Date(leave.endDate).toLocaleDateString(),
                    reason: leave.reason,
                    status: leave.status,
                }));
                setLeaveApplications(data);
                setFilteredLeaveApplications(data);
            }
        } catch (error) {
            console.error("Error fetching leave applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLeave = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/leave/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            fetchLeaveApplications();
            alert('Leave application deleted successfully!');
        } catch (error) {
            console.error("Error deleting leave application:", error);
            alert('An unexpected error occurred during deletion.');
        }
    };

    const columns = [
        {name: "S.No",selector: (row) => row.sno,sortable: true,width: "70px",},
        { name: "Employee Name", selector: (row) => row.employee, sortable: true, minWidth: "150px" },
        { name: "Start Date", selector: (row) => row.startDate, sortable: true, minWidth: "150px" },
        { name: "End Date", selector: (row) => row.endDate, sortable: true, minWidth: "150px" },
        { name: "Reason", selector: (row) => row.reason, sortable: true, minWidth: "200px" },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            minWidth: "100px",
            // You can also apply styling to the Status column itself for better visibility
            cell: (row) => (
                <span
                    style={{
                        backgroundColor: row.status === 'Approved' ? '#22c55e' : (row.status === 'Denied' ? '#dc2626' : '#f59e0b'),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        minWidth: '70px',
                        textAlign: 'center'
                    }}
                >
                    {row.status}
                </span>
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <LeaveButtons _id={row._id} status={row.status} onDelete={handleDeleteLeave} />
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
        const result = leaveApplications.filter((leave) =>
            leave.employee.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredLeaveApplications(result);
    }, [search, leaveApplications]);

    useEffect(() => {
        fetchLeaveApplications();
    }, []);

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            {loading && <div className="text-center text-teal-600">Loading...</div>}

            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700">Manage Leave Applications</h3>
                <p className="text-gray-500 text-sm">View, search and manage all leave applications</p>
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
                    to="/admin-dashboard/add-leave"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                >
                    <FaPlus className="text-lg" />
                    <span>Apply for Leave</span>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={filteredLeaveApplications}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            />
        </div>
    );
};

export default LeaveList;