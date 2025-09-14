import { Router } from "express";
import {getallchat,deletechat,createchat,} from "../controller/chat.controller.js"
import { verifytoken } from "../middleware/verifytoken.js"
const router=Router()

router.route("/").get(verifytoken,getallchat).post(verifytoken,createchat).delete(deletechat)

export default router