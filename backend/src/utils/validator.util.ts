import {Request,Response,NextFunction} from "express"
import { body, ValidationChain, validationResult } from "express-validator"



export const validator=(validate:ValidationChain[])=>{
   
    return  async(req:Request,res:Response,next:NextFunction)=>{
       
 for(let validation of validate){
    const result=await validation.run(req)
    
    if(!result.isEmpty()){
        break
    }
}
    const error=validationResult(req)
    if(!error.isEmpty()){
       return res.status(422).json({error:error.array()})
    }
    next()
 
    }}

export const loginvalidates=[

    body("email").notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("password should not be empty").isLength({min:8}).withMessage("Password should be at least 8 characters long")
]



export const signupvalidates=[
    body("name").notEmpty().withMessage("name should not be empty"),
    ...loginvalidates
    //   body("email")
    //     .notEmpty()
    //     .withMessage("Email should not be empty")
    //     .isEmail()
    //     .withMessage("Invalid email format"),
    //     body("password").notEmpty().withMessage("Email should not be empty").isLength({ min: 8 }).withMessage("Password should be at least 8 characters long")
]