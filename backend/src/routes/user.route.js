import { Router } from "express"
import { getUserCopiedData, UserCopiedData } from "../controller/user.controller.js"

const router = Router()

router.route("/usercopieddata").post(UserCopiedData)
router.route("/getusercopieddata").post(getUserCopiedData)

export default router