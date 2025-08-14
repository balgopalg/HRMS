// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import your User model

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, message: "Token not Provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

        // Corrected line: use the imported 'User' model
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error); // Add a console log for debugging
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default verifyUser;