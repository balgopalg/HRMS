import Employee from "../models/Employee.js";
import Department from "../models/Department.js";

// @desc    Get all employees
// @route   GET /api/employee
// @access  Private (e.g., Admin)
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('department', 'dept_name');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error in getEmployees:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Add a new employee
// @route   POST /api/employee/add
// @access  Private (e.g., Admin)
const addEmployee = async (req, res) => {
    try {
        const { name, email, phone, department } = req.body;

        if (!name || name.trim() === '' || !email || email.trim() === '' || !department) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields: name, email, and department.' });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({ success: false, message: 'An employee with this email already exists.' });
        }

        const newEmployee = new Employee({
            name,
            email,
            phone,
            department
        });

        await newEmployee.save();
        return res.status(201).json({ success: true, message: 'Employee added successfully!', employee: newEmployee });

    } catch (error) {
        console.error("Error in addEmployee:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get a single employee by ID
// @route   GET /api/employee/:id
// @access  Private (e.g., Admin)
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).populate('department', 'dept_name');

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error in getEmployeeById:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update an employee
// @route   PUT /api/employee/edit/:id
// @access  Private (e.g., Admin)
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, department } = req.body;

        if (!name || name.trim() === '' || !email || email.trim() === '' || !department) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, phone, department },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.status(200).json({ success: true, message: 'Employee updated successfully!', employee: updatedEmployee });

    } catch (error) {
        console.error("Error in updateEmployee:", error);
        if (error.name === 'CastError' || error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Invalid data provided for update.' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employee/:id
// @access  Private (e.g., Admin)
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.status(200).json({ success: true, message: 'Employee deleted successfully!' });

    } catch (error) {
        console.error("Error in deleteEmployee:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };