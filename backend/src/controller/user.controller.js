import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

// Controller to handle saving user text data with multiple images
const UserCopiedData = asyncHandler(async (req, res) => {
    const { userText } = req.body;

    if (!userText) {
        throw new ApiError(400, "User text is required");
    }

    let imageUrls = [];

    if (req.files && req.files.imageData && req.files.imageData.length > 0) {
        try {
            // Iterate over each file and upload to Cloudinary
            const uploadPromises = req.files.imageData.map(file => uploadOnCloudinary(file.buffer));
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map(result => result.secure_url);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new ApiError(500, "One or more image uploads failed");
        }
    }

    const uniqueText = nanoid(10);

    const data = await User.create({
        userText,
        imageData: imageUrls,
        uniqueText
    });

    return res.status(200).json(
        new ApiResponse(200, data, "Text and images added successfully")
    );
});

// Controller to retrieve user text data using the unique ID
const getUserCopiedData = asyncHandler(async (req, res) => {
    const { uniqueText } = req.body;

    if (!uniqueText) {
        throw new ApiError(400, "Unique Text is required");
    }

    const data = await User.findOne({ uniqueText });

    if (!data) {
        throw new ApiError(404, "Data not found for the provided Unique Text");
    }

    return res.status(200).json(
        new ApiResponse(200, data, "Data retrieved successfully")
    );
});

// Optional: Controller to fetch all entries (for displaying all data)
const getAllEntries = asyncHandler(async (req, res) => {
    const entries = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(200, entries, "Entries fetched successfully")
    );
});

export {
    UserCopiedData,
    getUserCopiedData,
    getAllEntries
};