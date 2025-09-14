    import chat from "../model/chat.model.js"
import { Request,Response } from "express"


export const createchat= async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId
    const newchat=await chat.create({userId,name:"New Chat",userName:req.user?.name,messages:[]})
    res.status(200).json({success:true,message:"A new chat has been created"})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}

export const getallchat=async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId
    const newchat=await chat.find({userId}).sort({updatedAt:-1})
    res.status(200).json({success:true,newchat})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}

export const deletechat=async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId
    const {chatId}=req.body
    const newchat=await chat.findOneAndDelete({_id:chatId,userId })
    res.status(200).json({success:true,newchat})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}