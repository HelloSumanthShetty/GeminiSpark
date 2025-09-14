    import {Request,Response,NextFunction} from "express"
    import jwt from "jsonwebtoken"
    import dotenv from "dotenv"
    dotenv.config()
    import { JwtPayload } from "jsonwebtoken";

type currentUser={
    userId:String,
    name:String,
    email:String,
    credits:Number
}

declare global{
  namespace Express {
    interface Request{
      user?:currentUser|JwtPayload
    }
  }
}

const jwtsecret=process.env.SECRET||""

 export const verifytoken=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.cookies?.token
            if(!token){
                return res.status(404).json("tokens are missing")
            }
    
            const verify=jwt.verify(token,jwtsecret) as currentUser|JwtPayload
            req.user =verify
            next()

        } catch (error:any) {
            res.status(401).json({error:error})
        }
    }