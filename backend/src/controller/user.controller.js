import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid"


const UserCopiedData = asyncHandler(async (req, res) => {
    const { userText } = req.body

    console.log("userText: ", userText);

    if (!userText) {
        throw new ApiError(400, "user text is required")
    }

    const uniqueText = nanoid(10)
    console.log("uniqueText: ", uniqueText);


    const data = await User.create({
        userText,
        uniqueText
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, data, "Text Added Successfully")
        )
})

const getUserCopiedData = asyncHandler(async (req, res) => {
    const { uniqueText } = req.body

    if (!uniqueText) {
        throw new ApiError(400, "Unique Text is required")
    }

    const data = await User.findOne({
        uniqueText
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, data, "Text Added Successfully")
        )
})

export {
    UserCopiedData,
    getUserCopiedData
}