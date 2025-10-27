import chatModel from "../model/chat.model.js"
import { Request, Response } from "express"
import GenAi from "../config/GenAI.js"
import userModel from "../model/user.model.js"
// import imagekit from "../config/Imagekit.js"
import axios, { all } from "axios"
import Imagekit from "../config/Imagekit.js"
import { GoogleGenAI } from "@google/genai"


// export const textChatController = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?.userId
//         const { chatId, prompt } = req.body
//       if(req.user?.credits<1)   {
//         return res.status(403).json({success:false,message:"Sorry the credits is Belove > 1"})
//       }
//         const chat = await chatModel.findOne({ userId, _id: chatId })
//         console.log(chat)

//         if (!chat) {
//             return res.status(404).json({ success: false, message: "Chat not found" })
//         }
//         chat.messages.push({ role: "user", content: prompt, time: Date.now(), isImage: false })
//         const { choices } = await GenAi.chat.completions.create({

//             model: "gemini-2.0-flash-lite",

//             messages: [
//                 {
//             role: "user",
//             content: prompt
//         },
//     ],
// });
//             console.log(choices[0].message)
//          const reply={...choices[0].message,time:Date.now(),isImage:false}

//         chat.messages.push(reply)
//        await chat.save()
//        await userModel.findOneAndUpdate({_id:userId},{$inc:{credits:-1}})
//        res.status(200).json({success:true,reply})
//     } catch (error:any) {
//         res.status(500).json({success:false,error:error.message})
//     }
// }


export const textChatController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const { chatId, prompt,isImage,isPublished } = req.body
    if (req.user?.credits < 1) {
      return res.status(403).json({ success: false, message: "Sorry the credits is Belove > 1" })
    }
    const chat = await chatModel.findOne({ userId, _id: chatId })
    // console.log(chat)

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" })
    }
    chat.messages.push({ role: "user", content: prompt, time: Date.now(), isImage: false })
    const myHistory =chat.messages.map((mes) => ({
  role: mes.role,
  parts: [{ text: mes.content }]
}))
      if (!GenAi) {
        return res.status(503).json({
          success: false,
          message: "Gemini API is not configured"
        });
      }
      
      const allChat = GenAi.chats.create({
        model: "gemini-2.5-flash-lite",
        history: myHistory,
        config :{
          systemInstruction:"You are Gemini Spark, a helpful AI assistant. You are a Gemini wrapper created by Sumanth U Shetty. When asked about yourself, you must identify yourself as Gemini Spark and mention that you were created by him."
        }
      });
    
      const response = await allChat.sendMessage({
        message: prompt,
      });
      const replytext = response.text
      const reply = { role: "model", content: replytext, time: Date.now(), isImage: false }
      chat.messages.push(reply)
      await chat?.save()
      await userModel.findOneAndUpdate({ _id: userId }, { $inc: { credits: -1 } })
      res.status(200).json({ success: true, reply })
    }
  
     catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }


//for image generation
export const imageMessageController = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId
      if (req.user?.credits < 2) {
        return res.status(403).json({ success: false, message: "Sorry the credits is Belove > 2" })
      }
      const { chatId, prompt, isPublished } = req.body;
      if (!prompt || !chatId) {
        return res.status(400).json({ success: false, message: "Please provide all the details" })
      }

     
      const chat = await chatModel.findOne({ userId, _id: chatId })
      if (!chat) {
        return res.status(404).json({ success: false, message: "Chat not found" })
      }
    chat.messages.push({role:"user",content:prompt,time:Date.now(),isImage:true})
      const encodeURI = encodeURIComponent(prompt)
      const generateImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodeURI}/GeminiSpark/${Date.now()}.png?tr=w-400,h-300,fo-auto`


      const aiImageResponse = await axios.get(generateImageUrl, { responseType: 'arraybuffer' })
      //Buffer
      const imageBuffer = Buffer.from(aiImageResponse.data, 'binary')
      const base64String = imageBuffer.toString('base64')
      const base64Image = `data:image/png;base64,${base64String}`
      if (!Imagekit) {
        return res.status(503).json({
          success: false,
          message: "ImageKit is not configured"
        });
      }
      
      const uploadResponse = await Imagekit.upload({
        file: base64Image,
        fileName: `${encodeURI}/GeminiSpark/${Date.now()}.png`,
        folder: "GeminiSpark"
      })
      const reply = {
        role: "model",
        content: uploadResponse.url,
        time: Date.now(),
        isImage: true,
        isPublished
      }
      chat.messages.push(reply)
      await chat.save()
      await userModel.findOneAndUpdate({ _id: userId }, { $inc: { credits: -2 } })
      res.status(200).json({ success: true, reply })
    } catch (error: any) {
      res.status(200).json({ success: false, error: error.message })
    }
  }

  //All pulished images
  export const getAllPublishedImages = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId
      const Images = await chatModel.aggregate([{ $unwind: "$messages" }, { $match: { "messages.isPublished": true, "messages.isImage": true } },
      { $project: { _id: 0, imageUrl: "$messages.content", userName: "$userName", time: "$messages.time" } }
      ])
      res.status(200).json({ success: true, Images })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }