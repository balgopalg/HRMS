import express from 'express';
import cors from 'cors'; // Added import for cors
import authRouter from './routes/auth.js'; // Importing auth routes
import connectDB from './db/db.js'
import departmentRouter from './routes/department.js'; // Importing department routes
import employeeRouter from './routes/employee.js'; // Importing the employee routes
import leaveRouter from './routes/leave.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mounting routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter); // Mount the department routes
app.use('/api/employee', employeeRouter); // Mount the employee routes
app.use('/api/leave', leaveRouter); // Mount the leave routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});