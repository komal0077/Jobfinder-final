import express from "express";

import {getAllJobs,getmyJobs,postJob,updateJob,deleteJob,getSingleJob} from '../controllers/jobController.js';
    import { isAuthenticated} from "../middlewares/auth.js";

const router=express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthenticated,postJob);
router.get("/getmyJobs",isAuthenticated,getmyJobs);
router.put("/update/:id",isAuthenticated,updateJob);
router.delete("/delete/:id",isAuthenticated,deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);
export default router;

// import express from "express";
// import {
//   deleteJob,
//   getAllJobs,
//   getMyJobs,
//   getSingleJob,
//   postJob,
//   updateJob,
// } from "../controllers/jobController.js";
// import { isAuthenticated } from "../middlewares/auth.js";

// const router = express.Router();

// router.get("/getall", getAllJobs);
// router.post("/post", isAuthenticated, postJob);
// router.get("/getmyjobs", isAuthenticated, getMyJobs);
// router.put("/update/:id", isAuthenticated, updateJob);
// router.delete("/delete/:id", isAuthenticated, deleteJob);
// router.get("/:id", isAuthenticated, getSingleJob);

// export default router;