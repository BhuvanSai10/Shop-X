import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import router from "./routes/index.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api",router);


app.listen(PORT,()=>{
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});