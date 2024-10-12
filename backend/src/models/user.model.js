import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userText: {
        type: String,
        required: true
    },
    imageData: {
        type: [String], // Array of image URLs
        default: []
    },
    uniqueText: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);