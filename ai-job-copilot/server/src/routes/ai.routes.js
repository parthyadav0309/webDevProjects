import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { analyzeJobApplication, getAiAnalysisById, getAnalysesByJob } from "../controllers/ai.controller.js";
import { analysisIdValidation, analyzeAppApplicationValadation, jobIdValidation } from "../validators/ai.validator.js";

const router = express.Router();

router.post("/analyze",  protect,  analyzeAppApplicationValadation,  validate,  analyzeJobApplication,);
router.get("/analysis/:id",protect,analysisIdValidation,validate,getAiAnalysisById); // analysis id
router.get("/job/:jobId", protect, jobIdValidation, validate, getAnalysesByJob); //job id
export default router;
