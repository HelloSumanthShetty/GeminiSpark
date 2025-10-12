    import chat from "../model/chat.model.js"
import { Request,Response } from "express"


export const createchat= async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId
    const newchat=await chat.create({userId,name:"New Chat",userName:req.user?.name,messages:[]})
    res.status(200).json({success:true,message:"A new chat has been created",newchat})
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
export const getispublishedchat=async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId  
    if(!userId){
        return res.status(404).json("userId is missing")
    } 
    const newChat=await chat.aggregate([
        {
    $match: {
      "messages.isImage": true                     //only the chat's that has image url 
    }
  },
  {
    $project: {
      userName: 1,
      imageMessages: {
        $filter: {
          input: "$messages",
          as: "msg",
          cond: {
            $and: [
              { $eq: ["$$msg.role", "model"] },                //condition if it's an modal and image is true
              { $eq: ["$$msg.isImage", true] }
            ]
          }
        }
      }
    }
  },
  {
    $unwind:"$imageMessages" //flat the array 
  },
{
 $project:{
    userName:1,
    imageUrl:"$imageMessages.content"
 }
}
]);
    res.status(200).json({
        // userName:newChat.userName,
        // imageUrl:newChat.messages.content
        success:true,
        newChat
    })   
}
  catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}
export const deletechat=async(req:Request,res:Response)=>{
 try {
    const userId=req.user?.userId
    const {chatId}=req.params
    const newchat=await chat.findOneAndDelete({_id:chatId,userId })
    res.status(200).json({success:true,newchat})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}
