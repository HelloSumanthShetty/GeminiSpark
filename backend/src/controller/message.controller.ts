import chatModel from "../model/chat.model.js"
import { Request, Response } from "express"
import GenAi from "../config/GenAI.js"
import userModel from "../model/user.model.js"
// import imagekit from "../config/Imagekit.js"
import axios from "axios"
import Imagekit from "../config/Imagekit.js"


export const textChatController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const { chatId, prompt } = req.body

        const chat = await chatModel.findOne({ userId, _id: chatId })
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" })
        }   
        
const {choices} = await GenAi.chat.completions.create({
    model: "gemini-2.0-flash-lite",
    
    messages: [     
       
        {
            role: "user",
            content: prompt
        },
    ],
});

         const reply={role:"user",content:prompt ,timestamp:Date.now(),isImage:false}
         res.status(200).json({success:true,reply})
        chat.messages.push(reply)
       await chat.save()
       await userModel.findOneAndUpdate({_id:userId},{$inc:{credits:-1}})
       
    } catch (error:any) {
        res.status(200).json({success:true,error:error.message})
    }
}


//for image generation
export const imageMessageController=async(req:Request,res:Response)=>{
    try {
        const userId = req.user?.userId
      if(req.user?.credits==0)   {
        return res.status(403).json({success:false,message:"Sorry the credits is Belove > 2"})
      }
        const { chatId, prompt,isPublished } = req.body;
     


        const chat = await chatModel.findOne({userId,_id:chatId })
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" })
        }
     
        const encodeURI=encodeURIComponent(prompt)
        const generateImageUrl=`${process.env.Image_Generation_Url}/ik-genimg-prompt-${encodeURI}/GooluluAI/${Date.now()}.png?tr=w-400,h-300,fo-auto`
    
   
        res.status(200).json({ success: true, })
     
      const aiImageResponse=await axios.get(generateImageUrl, { responseType: 'arraybuffer' })
       //Buffer
      const imageBuffer=Buffer.from(aiImageResponse.data,'binary')
      const base64String=imageBuffer.toString('base64')  
        const base64Image=`data:image/png;base64,${base64String}`
       const uploadResponse=await Imagekit.upload({
        file:base64Image,
        fileName:`${encodeURI}/GooluluAI/${Date.now()}.png`,
        folder:"GooluluAI"
       })
       const replay={
        role:"assistant",
        content:uploadResponse.url,
        timestamp:Date.now(),
        isImage:true,
        isPublished:false
       }
       res.status(200).json({success:true,replay})
       chat.messages.push(replay)
        await chat.save()
       
    } catch (error: any) {
        res.status(200).json({ success: true, error: error.message })
    }
}