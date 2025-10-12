import { Router } from "express";
import {getallchat,deletechat,createchat,getispublishedchat} from "../controller/chat.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const router=Router()

router.route("/").get(verifytoken,getallchat).post(verifytoken,createchat)
router.route("/community").get(verifytoken,getispublishedchat)
router.route("/:chatId").delete(verifytoken,deletechat)

export default router