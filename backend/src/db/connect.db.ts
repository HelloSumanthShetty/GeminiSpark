import mongoose from "mongoose"

const connectdb=async(url:string)=>{
    try {
        console.log("connecting")
    const db=mongoose.connect(url)
    console.log("successfully connected")
    } catch (error) {
        console.error("mongodb failed to connect"+error)  
        process.exit(1)
    }
}

export default connectdb   