import express from "express";

import {
  createApplication,
  getMyApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/applications
router.post("/", protect, createApplication);

// GET /api/applications
router.get("/", protect, getMyApplications);

// GET /api/applications/:id
router.get("/:id", protect, getApplicationById);

// PUT /api/applications/:id
router.put("/:id", protect, updateApplication);

// DELETE /api/applications/:id
router.delete("/:id", protect, deleteApplication);

export default router;
