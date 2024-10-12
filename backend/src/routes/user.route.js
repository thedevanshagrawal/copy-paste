import { Router } from "express";
import { getUserCopiedData, UserCopiedData, getAllEntries } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Route to handle user copied data upload with multiple images
router.post(
    "/usercopieddata",
    upload.fields([
        {
            name: "imageData",
            maxCount: 5 // Allow up to 5 images
        }
    ]),
    UserCopiedData
);

// Route to retrieve user copied data
router.post(
    "/getusercopieddata",
    getUserCopiedData
);

// Optional: Route to fetch all entries
router.get(
    "/getallentries",
    getAllEntries
);

export default router;