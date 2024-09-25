import mongoose from "mongoose";
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your name!"],
        minLength:[3,"name must contain 3 letter"],
        maxLength:[30,"name cannot exceed 30 lettes"]
    },
    email:{
        type:String,
        validate:[validator.isEmail,"please provide a valid email"],
        required:[true,"please provide a email"]
    },
coverLetter:{
    type:String,
    required:[true,"please provide your cover letter"]
},
phone:{
type:Number,
required:[true,"pleae provide your phone number"]
},
address:{
    type:String,
    required:[true,"please provide your address"]
},
resume:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
  
},
applicantId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        res:"User",
        required:true
    },
    role:{
        type:String,
        enum:["Job Seeker"],
        required:true
    }
},
employerId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        res:"User",
        required:true
    },
    role:{
        type:String,
        enum:["Employer"],
        required:true
    }
},

});

export const Application = mongoose.model("Application", applicationSchema);