import { body, param } from "express-validator";

const applicationStatuses = [
  "SAVED",
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
];

// POST /api/applications
export const createApplicationValidation = [
  body("jobId")
    .notEmpty()
    .withMessage("jobId is required")
    .isUUID()
    .withMessage("jobId must be a valid UUID"),

  body("resumeId")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("resumeId must be a valid UUID"),

  body("status")
    .optional()
    .isIn(applicationStatuses)
    .withMessage(`status must be one of: ${applicationStatuses.join(", ")}`),

  body("appliedAt")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("appliedAt must be a valid ISO 8601 date"),

  body("interviewAt")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("interviewAt must be a valid ISO 8601 date"),

  body("notes")
    .optional({ nullable: true })
    .isString()
    .withMessage("notes must be a string")
    .isLength({ max: 2000 })
    .withMessage("notes cannot exceed 2000 characters"),
];

// PUT /api/applications/:id
export const updateApplicationValidation = [
  param("id").isUUID().withMessage("Application ID must be a valid UUID"),

//   body("jobId").optional().isUUID().withMessage("jobId must be a valid UUID"),

  body("resumeId")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("resumeId must be a valid UUID"),

  body("status")
    .optional()
    .isIn(applicationStatuses)
    .withMessage(`status must be one of: ${applicationStatuses.join(", ")}`),

  body("appliedAt")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("appliedAt must be a valid ISO 8601 date"),

  body("interviewAt")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("interviewAt must be a valid ISO 8601 date"),

  body("notes")
    .optional({ nullable: true })
    .isString()
    .withMessage("notes must be a string")
    .isLength({ max: 2000 })
    .withMessage("notes cannot exceed 2000 characters"),
];

// GET /api/applications/:id
// DELETE /api/applications/:id
export const applicationIdValidation = [
  param("id").isUUID().withMessage("Application ID must be a valid UUID"),
];
