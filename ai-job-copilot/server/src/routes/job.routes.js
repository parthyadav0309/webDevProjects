import express from "express";
import { createJob, deleteJob, getJobById, getMyJobs, updateJob } from "../controllers/job.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { createJobValidation, jobIdValidation, updateJobValidation } from "../validators/job.validator.js";

const router = express.Router();
//create job
router.post("/",protect,createJobValidation,validate,createJob);

//getalljobs
router.get("/",protect,getMyJobs);

//get single jobs
router.get("/:id",protect,updateJobValidation,validate,getJobById);

//update job
router.put("/:id",protect,updateJobValidation,validate,updateJob);

//deleteJob
router.delete("/:id",protect,jobIdValidation,validate,deleteJob);

export default router;