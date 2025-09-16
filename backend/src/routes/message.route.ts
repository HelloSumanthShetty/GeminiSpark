import express from "express"
import { getAllPublishedImages, imageMessageController, textChatController, } from "../controller/message.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const router=express.Router()

router.route("/text").post(verifytoken,textChatController)
router.route("/image").post(verifytoken,imageMessageController).get(verifytoken,getAllPublishedImages)

export default router
