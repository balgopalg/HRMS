import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js"; 

// @desc    Get all leave applications
// @route   GET /api/leave
// @access  Private (e.g., Admin)
const getLeaveApplications = async (req, res) => {
    try {
        // Find all leave applications and populate the employee's name for display
        const leaveApplications = await Leave.find().populate('employee', 'name');
        return res.status(200).json({ success: true, leaveApplications });
    } catch (error) {
        console.error("Error in getLeaveApplications:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Add a new leave application
// @route   POST /api/leave/add
// @access  Private (e.g., Admin or Employee)
const addLeaveApplication = async (req, res) => {
    try {
        const { employee, startDate, endDate, reason } = req.body;

        // Basic validation for required fields
        if (!employee || !startDate || !endDate || !reason.trim()) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }

        // Check for an existing pending leave application for this employee

        if (endDate < startDate) {
            return res.status(400).json({ success: false, message: 'End date cannot be before start date.' });
        }

        const existingPendingLeave = await Leave.findOne({
            employee: employee,
            status: 'Pending'
        });

        if (existingPendingLeave) {
            return res.status(409).json({ success: false, message: 'This employee already has a pending leave application.' });
        }

        const newLeave = new Leave({
            employee,
            startDate,
            endDate,
            reason,
        });

        await newLeave.save();
        return res.status(201).json({ success: true, message: 'Leave application submitted successfully!', leave: newLeave });

    } catch (error) {
        console.error("Error in addLeaveApplication:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get a single leave application by ID
// @route   GET /api/leave/:id
// @access  Private (e.g., Admin)
const getLeaveApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id).populate('employee', 'name');
        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }
        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error("Error in getLeaveApplicationById:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid leave ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update a leave application (e.g., change status)
// @route   PUT /api/leave/edit/:id
// @access  Private (e.g., Admin)
const updateLeaveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, startDate, endDate, reason } = req.body;

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { status, startDate, endDate, reason },
            { new: true, runValidators: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        return res.status(200).json({ success: true, message: 'Leave application updated successfully!', leave: updatedLeave });

    } catch (error) {
        console.error("Error in updateLeaveApplication:", error);
        if (error.name === 'CastError' || error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Invalid data provided for update.' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Delete a leave application
// @route   DELETE /api/leave/:id
// @access  Private (e.g., Admin)
const deleteLeaveApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLeave = await Leave.findByIdAndDelete(id);
        if (!deletedLeave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        return res.status(200).json({ success: true, message: 'Leave application deleted successfully!' });

    } catch (error) {
        console.error("Error in deleteLeaveApplication:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid leave ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addLeaveApplication, getLeaveApplications, getLeaveApplicationById, updateLeaveApplication, deleteLeaveApplication };