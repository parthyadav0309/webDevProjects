import express from "express";

import {
  createApplication,
  getMyApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { applicationIdValidation, createApplicationValidation, updateApplicationValidation } from "../validators/application.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

// POST /api/applications
router.post("/", protect, createApplicationValidation,validate,createApplication);

// GET /api/applications
router.get("/", protect, getMyApplications);

// GET /api/applications/:id
router.get("/:id", protect,applicationIdValidation,validate, getApplicationById);

// PUT /api/applications/:id
router.put("/:id", protect,updateApplicationValidation,validate, updateApplication);

// DELETE /api/applications/:id
router.delete("/:id", protect,applicationIdValidation,validate, deleteApplication);

export default router;
