import express from 'express';
import cors from 'cors'; // Added import for cors
import authRouter from './routes/auth.js'; // Importing auth routes
import connectDB from './db/db.js'

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter); // Mounting auth routes

const PORT = process.env.PORT || 5000; // Default port if not set

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});