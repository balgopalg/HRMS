import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBill, FaTimesCircle, FaUsers } from 'react-icons/fa'

const AdminSummary = () => {
    return (
        <>
        <div className='p-6 '>
            <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<FaUsers />} text="Total Employees" number={100} color='bg-teal-600' />
                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={10} color='bg-yellow-600' />
                <SummaryCard icon={<FaMoneyBill />} text="Total Salary" number={100} color='bg-blue-600' />
            </div>
        </div>
        
        <div className='mt-12'>
            <h4 className='text-xl font-bold'>Leave Details</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <SummaryCard icon={<FaFileAlt />} text="Total Leave Requests" number={55} color='bg-teal-600' />
                <SummaryCard icon={<FaCheckCircle />} text="Approved Leave" number={30} color='bg-green-600' />
                <SummaryCard icon={<FaHourglassHalf />} text="Pending Leave" number={20} color='bg-blue-600' />
                <SummaryCard icon={<FaTimesCircle />} text="Rejected Leave" number={5} color='bg-red-600' />
            </div>
        </div>

        </>
    )
}

export default AdminSummary