import userModel from "../model/user.model.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


dotenv.config();


export const signup = async (req: Request, res: Response) => {
    try {

         const { name, email, password } = req.body;
               
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await userModel.create({ name, email, password: hashedPassword });
       //console.log(process.env.SECRET)
        const token = jwt.sign(
            { userId: createdUser._id, name: createdUser.name, email: createdUser.email, credits: createdUser.credits },
            process.env.SECRET as string,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7200000,
            sameSite: "strict"
        });

        res.json({
            success: true,
            msg: "User has been created",
            token:token,
            userId: createdUser._id,
            username: createdUser.name,
            useremail: createdUser.email
        });
    } catch (error: any) {
        console.error({error})
         res.status(500).json({ success: false, error: error.message });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const {  email, password } = req.body;

      
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email,credits:user.credits },
            process.env.SECRET as string,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7200000,
            sameSite: "none"
        });

        res.json({
            success: true,
            token:token,
            msg: "Login successful",
            userId: user._id,
            username: user.name,
            useremail: user.email
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getUser=async(req:Request,res:Response)=>{
    try {
        const userId=req.user?.userId 
        const user=await userModel.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({success:false,msg:"user not found"})   
        }
        res.status(200).json({success:true,user:user})  
    }
    catch (error:any) {
        
        res.status(500).json({ success: false, error: error.message });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            msg: "User logged out successfully"
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
