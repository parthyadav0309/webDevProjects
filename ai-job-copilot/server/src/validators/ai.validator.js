import { body, param } from "express-validator";

export const analyzeAppApplicationValadation = [
  body("jobId")
    .notEmpty()
    .withMessage("JOb Id is required")
    .isUUID()
    .withMessage("Invalid Job Id"),

  body("resumeId")
    .notEmpty()
    .withMessage("resumeId is required")
    .isUUID()
    .withMessage("resumeId must be a valid UUID"),
];

export const analysisIdValidation = [
  param("id").isUUID().withMessage("Analysis ID must be a valid UUID"),
];

export const jobIdValidation = [
  param("jobId").isUUID().withMessage("jobId must be a valid UUID"),
];