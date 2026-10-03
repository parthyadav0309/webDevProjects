import express from "express";

import { uploadResume,getMyResumes, deleteResume } from "../controllers/resume.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getMyResumes);
router.delete("/:id", protect, deleteResume);

export default router;
