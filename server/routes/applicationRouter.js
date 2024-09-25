// import express from "express";
// import {employerGetAllApplications,jobSeekerDeleteApplication,jobseekerGetAllApplications} from '../controllers/applicationController.js'
// import {isAuthenticated} from '../middlewares/auth.js'
// const router=express.Router();


// router.get("");
// router.get("");
// router.delete("/delete/:id",isAuthenticated,jobSeekerDeleteApplication);

// export default router;

// import express from "express";
// import { employerGetAllApplications, jobSeekerDeleteApplication, jobseekerGetAllApplications } from '../controllers/applicationController.js';
// import { isAuthenticated } from '../middlewares/auth.js';

// const router = express.Router();

// router.get("/employer/applications", isAuthenticated, employerGetAllApplications);
// router.get("/jobseeker/applications", isAuthenticated, jobseekerGetAllApplications);
// router.delete("/delete/:id", isAuthenticated, jobSeekerDeleteApplication);

// export default router;
import express from "express";
import { employerGetAllApplications, jobSeekerDeleteApplication, jobseekerGetAllApplications,
    postApplication
 } from '../controllers/applicationController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobSeekerDeleteApplication);
router.post("/post/",isAuthenticated,postApplication);


export default router;
