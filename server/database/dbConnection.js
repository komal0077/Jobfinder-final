import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"JOB_SEEKING",
    })
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        console.log("error in connecting to database")
    });
};