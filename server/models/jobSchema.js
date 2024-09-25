import mongoose from "mongoose";
const jobSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"provide job title"],
        minLength:[3,"jpb title must contain atleast 3 characters"],
        maxLength:[50,"job title cannot exceed 50 characters"],
    },
    description:{
        type:String,
        required:[true,"please provide job description"],
        minLength:[3,"jpb description must contain atleast 3 characters"],
        maxLength:[350,"job description cannot exceed 350 characters"],
    },
category:{
    type:String,
    required:[true,"job category is required!"],
},
city:{
    type:String,
    required:[true,"job city is required"],
},
location:{
    type:String,
    required:[true,"please provide exact loaction"],
    minLength:[5,"job location must contain atleast 50 characters"]
},
fixedSalary:{
    type:Number,
    minLength:[4,"Fixed salary must contain at least 4 digits"],

    maxLength:[10,"Fixed salary cannot exceed 9 digits"],
},
salaryFrom:{
    type:Number,
    minLength:[4,"salary from must contain at least 4 digits"],
maxLength:[9,"salary from cannot exceed 9 digits"],

},
salaryTo:{
    type:Number,
    minLength:[4,"salary to must contain at least 4 digits"],
maxLength:[9,"salary to cannot exceed 9 digits"],

},
expired:{
    type:Boolean,
    default:false,
},
jobPostedOn:{
    type:Date,
    default:Date.now,
},
postedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},

});

export const Job=mongoose.model("job",jobSchema);