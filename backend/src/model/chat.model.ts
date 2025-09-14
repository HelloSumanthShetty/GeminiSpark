import mongoose from "mongoose";

const chatschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    userName:{
        type:String,
        required:[true,"missing userName"]
    },
    name:{
        type:String,
        required:[true,"missing chat name"]
    }, 
    messages:[
        {
            isImage:{type:Boolean,required:true,default:false},
            isPublished:{type:Boolean,default:false},
            role:{type:String,required:[true,"missing role"]},
            message:{type:String,required:[true,"missing message"]},
            time:{type:Number ,required:[true,"missing timestamp"]}
        }
    ]
},{timestamps:true})
 
    export default mongoose.model("chat",chatschema)