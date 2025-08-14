import { MongoCryptCreateDataKeyError } from "mongodb";
import mongoose from "mongoose";
import { create } from "ts-node";

const departmentSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
