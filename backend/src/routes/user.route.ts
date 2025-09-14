import express from "express"
import {getUser,login,signup,logout} from "../controller/user.controller.js"
import { signupvalidates,validator,loginvalidates } from "../utils/validator.util.js"
import { verifytoken } from "../middleware/verifytoken.js"
const Router=express.Router()


Router.route("/").get(verifytoken,getUser).post(verifytoken,logout)
Router.route("/login").post(validator(loginvalidates),login)
Router.route("/signup").post(validator(signupvalidates),signup)

export default Router