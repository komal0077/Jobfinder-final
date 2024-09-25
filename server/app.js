import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js'
import jobRouter from './routes/jobRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import {dbConnection} from './database/dbConnection.js'
import {handleErrors} from './middlewares/error.js'
import {User} from './models/userSchema.js'
import path from 'path';
import { fileURLToPath } from "url";
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const app=express();
dotenv.config({path : "./config/config.env"});

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","DELETE","URL"],
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json());

// urlencoded converts strings to json format
app.use(express.urlencoded({extended:true}))

app.use(
    fileUpload({
useTempFiles:true,
tempFileDir:"/tmp",
})
);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/job",jobRouter)

// app.use(express.static(path.join(__dirname,"/client/dist")))
// app.get("*",(req,res)=>
//     res.sendFile(path.join(__dirname,"/client/dist/index.html"))
// )

dbConnection();

app.use(handleErrors);

export default app;

