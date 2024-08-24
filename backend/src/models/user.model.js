import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userText: {
            type: String,
        },
        uniqueText: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)