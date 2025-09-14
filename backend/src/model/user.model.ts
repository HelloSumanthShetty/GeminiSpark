import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"required name"],
        trim:true,
        maxlenght:[30,"char below 20"]
    },
    password:{
          type:String,
        required:[true,"required password"],
  
    },
    email:{
   type:String,
        unique:true
  
    },      
    credits:{
        type:Number,
        default:20
    }
},{timestamps:true})


export default mongoose.model("user",userschema)