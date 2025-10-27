import express from "express"
import connectdb from "./db/connect.db.js"
import dotenv from "dotenv"
import { error } from "console";
import usrouter from "./routes/user.route.js"
import chatrouter from "./routes/chat.route.js";
import cookieparser from "cookie-parser"
import messagerouter from "./routes/message.route.js"
import mediarouter from "./routes/media.route.js"
import cors from "cors"

const app=express()

dotenv.config();
app.use(cors(
    {
        origin:"https://geminispark-1.onrender.com",
        credentials:true,
         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
))
app.use(express.json())



app.use(cookieparser())
app.get("/", async (req,res)=>res.send("serve is live !!"))
app.use("/api/user",usrouter)
app.use("/api/chat",chatrouter)
app.use("/api/message",messagerouter)
app.use("/api/media",mediarouter)
const port = Number(process.env.PORT) || 3000
const mongo = process.env.MONGO_URL

const start = async (): Promise<void> => {
    try { 
        if (!mongo) {
            throw new Error("MONGO_URL is not defined in your .env file");
        }
        await connectdb(mongo)

        app.listen(port,"0.0.0.0", () => console.log(`server is running on ${port}`))
    }

    catch (error) {
        console.error(`failed to connect to ${port}` + error)
    }
}
start()