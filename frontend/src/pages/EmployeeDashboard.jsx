import React from 'react'
import { useAuth } from '../context/authContext'

const EmployeeDashboard = () => {
    const {user} = useAuth()
  return (
    <div>EmployeeDashboard , {user && user.name}</div>
  )
}

export default EmployeeDashboard