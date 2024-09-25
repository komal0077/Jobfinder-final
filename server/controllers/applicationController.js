// import {catchAsyncError} from '../middlewares/catchAsyncError.js'
// import ErrorHandler from '../middlewares/error.js'
// import {} from '../model/applicationSchema.js'
// import { Application } from '../models/applicationSchema.js';


// export const employerGetAllApplications=catchAsyncError(async(req,res,next)=>{
//     const {role}=req.user;
//     if(role === "job Seeker"){
//         return next(new ErrorHandler("job seeker is not allowed to access this resources",
//             400
//         )
//         );
//     }
// const {_id}=req.user;
// const applications=await Application.find({'employerId.user': _id});
// res.status(200).json({
//     success:true,
//     applications
// })
// });


// //

// export const jobseekerGetAllApplications=catchAsyncError(async(req,res,next)=>{
//     const {role}=req.user;
//     if(role === "Employer"){
//         return next(new ErrorHandler(" Employer is not allowed to access this resources",
//             400
//         )
//         );
//     }
// const {_id}=req.user;
// const applications=await Application.find({'applicantId.user': _id});
// res.status(200).json({
//     success:true,
//     applications
// })
// });

// export const jobSeekerDeleteApplication=catchAsyncError(async(req,res,next)=>{
//     const {role}=req.user;
//     if(role === "Employer"){
//         return next(new ErrorHandler(" Employer is not allowed to access this resources",
//             400
//         )
//         );
//     }

//     const {id}=req.params;
//     const application=await Application.findById(id);
// if(!application){
//     return next(new ErrorHandler("oops,application not found!",400));
// }

// await application.deleteOne();
// res.status(200).json({
//     success:true,
//     message:"Application deleted successfully !",
// });
// });

import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../models/applicationSchema.js';
import cloudinary from 'cloudinary'
import dotenv from 'dotenv';
import { Job } from '../models/jobSchema.js';

export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seekers are not allowed to access this resource", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'employerId.user': _id });
    res.status(200).json({
        success: true,
        applications
    });
});

export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employers are not allowed to access this resource", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'applicantId.user': _id });
    res.status(200).json({
        success: true,
        applications
    });
});

export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employers are not allowed to access this resource", 400));
    }

    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Oops, application not found!", 400));
    }

    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application deleted successfully!",
    });
});


// export const postApplication =catchAsyncError(async(req,res,next)=>{
//     const { role } = req.user;
//     if (role === "Employer") {
//         return next(new ErrorHandler("Employers are not allowed to access this resource", 400));
//     }

//     if(!req.files || Object.keys(req.files).length===0){
//         return next(new ErrorHandler("resume file required"));
//     }

//     const {resume}=req.files;

//     const allowedFormats=["image/png", "image/jpg", "image/jpeg", "image/webp"];
//    if(!allowedFormats.includes(resume.mimetype)){
//     return next(new ErrorHandler("Invalid file type.please upload in png,jpg or webp format only",400))

//    }
//    const cloudinaryResponse=await cloudinary.uploader.upload(
//     resume.tempFilePath
//    );

//    if(!cloudinaryResponse || cloudinaryResponse.error){
//     console.error("cloudinary error:",cloudinaryResponse.error || "unknown cloudinary error");

//     return next(new ErrorHandler("Failed to upload resume",500))
//    }

//    const{name,email,coverLetter,phone,address,jobId} = req.body;

//    const applicantId={
//     user:req.user._id,
//     role:"job Seeker"
//    };
//    if(!jobId){
//     return next(new ErrorHandler("job not found !",404));
//    }
//    const jobDetails=await Job.findById(jobId);
//    if(!jobDetails){
//     return next(new ErrorHandler("job not found !",404));
//    }

//    const employerId={
//     user:jobDetails.postedBy,
//     role:"Employer",
//    };
//    if(!name || !email || !coverLetter || !phone || !address || !employerId || !resume ){
//     return next(new ErrorHandler("please fill all the fields",400));
//    }
//    const application=await Application.create({
//     name,email,coverLetter,phone,address,applicantId,employerId,
//     resume:{
//         public_id:cloudinaryResponse.public_id,
//         url:cloudinaryResponse.secure_url,
//     },
//    });
//    res.status(200).json({
//     sucess:true,
//     message:"Application submitted",
//     application,
//    });
// });


dotenv.config(); // Load environment variables from .env file

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});




export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employers are not allowed to access this resource", 400));
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume file required", 400));
    }

    const { resume } = req.files;

    // Log MIME type for debugging
    console.log("Uploaded file MIME type:", resume.mimetype);

    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp","application/pdf"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload in png, jpg, jpeg, or webp format only", 400));
    }

    let cloudinaryResponse;
    try {
        // Attempt to upload to Cloudinary
        cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath, {
            resource_type: "auto"  // This allows for various file types, not just images
        });
    } catch (error) {
        // Log the specific error for debugging
        console.error("Cloudinary upload error:", error);
        return next(new ErrorHandler("Failed to upload resume", 500));
    }

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary response error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed to upload resume", 500));
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const applicantId = {
        user: req.user._id,
        role: "Job Seeker"
    };

    if (!jobId) {
        return next(new ErrorHandler("Job not found!", 404));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
    }

    const employerId = {
        user: jobDetails.postedBy,
        role: "Employer"
    };

    if (!name || !email || !coverLetter || !phone || !address || !employerId || !resume) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const application = await Application.create({
        name, email, coverLetter, phone, address, applicantId, employerId,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: "Application submitted",
        application
    });
});
