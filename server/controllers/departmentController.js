import Department from "../models/Department.js";

// @desc    Get all departments
// @route   GET /api/department
// @access  Private (e.g., Admin)
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        console.error("Error in getDepartments:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Add a new department
// @route   POST /api/department/add
// @access  Private (e.g., Admin)
const addDepartment = async (req, res) => {
    try {
        const { dept_name, description } = req.body;

        if (!dept_name || dept_name.trim() === '' || !description || description.trim() === '') {
            return res.status(400).json({ success: false, message: 'Please provide all fields and ensure they are not empty.' });
        }

        const existingDepartment = await Department.findOne({ dept_name });
        if (existingDepartment) {
            return res.status(409).json({ success: false, message: 'A department with this name already exists.' });
        }

        const newDepartment = new Department({
            dept_name,
            description
        });

        await newDepartment.save();
        return res.status(201).json({ success: true, message: 'Department added successfully!', department: newDepartment });

    } catch (error) {
        console.error("Error in addDepartment:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Get a single department by ID
// @route   GET /api/department/:id
// @access  Private (e.g., Admin)
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        console.error("Error in getDepartmentById:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid department ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Update a department
// @route   PUT /api/department/edit/:id
// @access  Private (e.g., Admin)
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dept_name, description } = req.body;

        // Basic validation
        if (!dept_name || dept_name.trim() === '' || !description || description.trim() === '') {
            return res.status(400).json({ success: false, message: 'Please provide all fields and ensure they are not empty.' });
        }

        // Find the department and update it
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { dept_name, description },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }

        return res.status(200).json({ success: true, message: 'Department updated successfully!', department: updatedDepartment });

    } catch (error) {
        console.error("Error in updateDepartment:", error);
        // Handle CastError for invalid IDs or other validation errors
        if (error.name === 'CastError' || error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Invalid data provided for update.' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export { addDepartment, getDepartments, getDepartmentById, updateDepartment }; // <-- Export the new function