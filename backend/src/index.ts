import express from "express"
import connectdb from "./db/connect.db.js"
import dotenv from "dotenv"
import { error } from "console";
import usrouter from "./routes/user.route.js"
import chatrouter from "./routes/chat.route.js";
import cookieparser from "cookie-parser"
import messagerouter from "./routes/message.route.js"
import cors from "cors"

const app=express()

dotenv.config();
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","DELETE"]
    }
))
app.use(express.json())



app.use(cookieparser())
app.get("/", async (req,res)=>res.send("serve is live !!"))
app.use("/api/user",usrouter)
app.use("/api/chat",chatrouter)
app.use("/api/message",messagerouter)
const port =process.env.PORT ||3000 
const mongo = process.env.MONGO_URL

const start = async (): Promise<void> => {
    try { 
        if (!mongo) {
            throw new Error("MONGO_URL is not defined in your .env file");
        }
        await connectdb(mongo)

        app.listen(port, () => console.log(`server is running on ${port}`))
    }

    catch (error) {
        console.error(`failed to connect to ${port}` + error)
    }
}
start()