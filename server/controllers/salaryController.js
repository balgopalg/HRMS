import Salary from "../models/Salary.js";

const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('employee', 'name');
        return res.status(200).json({ success: true, salaries });
    } catch (error) {
        console.error("Error in getSalaries:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const addSalary = async (req, res) => {
    try {
        const { employee, basicSalary, allowances, deductions, netSalary, paymentDate } = req.body;

        if (!employee || !basicSalary || !paymentDate) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }
        
        const newSalary = new Salary({
            employee,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            paymentDate,
        });

        await newSalary.save();
        return res.status(201).json({ success: true, message: 'Salary record added successfully!', salary: newSalary });

    } catch (error) {
        console.error("Error in addSalary:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getSalaryById = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.findById(id).populate('employee', 'name');
        if (!salary) {
            return res.status(404).json({ success: false, message: 'Salary record not found' });
        }
        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Error in getSalaryById:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid salary ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const { basicSalary, allowances, deductions, netSalary, paymentDate } = req.body;

        const updatedSalary = await Salary.findByIdAndUpdate(
            id,
            { basicSalary, allowances, deductions, netSalary, paymentDate },
            { new: true, runValidators: true }
        );

        if (!updatedSalary) {
            return res.status(404).json({ success: false, message: 'Salary record not found' });
        }

        return res.status(200).json({ success: true, message: 'Salary record updated successfully!', salary: updatedSalary });

    } catch (error) {
        console.error("Error in updateSalary:", error);
        if (error.name === 'CastError' || error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Invalid data provided for update.' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteSalary = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSalary = await Salary.findByIdAndDelete(id);
        if (!deletedSalary) {
            return res.status(404).json({ success: false, message: 'Salary record not found' });
        }

        return res.status(200).json({ success: true, message: 'Salary record deleted successfully!' });

    } catch (error) {
        console.error("Error in deleteSalary:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid salary ID format' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addSalary, getSalaries, getSalaryById, updateSalary, deleteSalary };