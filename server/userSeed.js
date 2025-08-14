import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDB from "./db/db.js";

const userRegister = async () => {
  try {
    await connectDB();
    // Check if admin already exists
    const existingUser = await User.findOne({ email: "admin@admin.com" });
    if (existingUser) {
      console.log("Admin user already exists");
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash("admin", 10);
    const user = new User({
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
    });
    await user.save();
    console.log("User registered successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error registering user:", error);
    process.exit(1);
  }
};

userRegister();