import { body, param } from "express-validator";

export const createJobValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ max: 150 })
    .withMessage("Job title cannot exceed 150 characters"),

  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ max: 150 })
    .withMessage("Company name cannot exceed 150 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Location cannot exceed 150 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),

  body("sourceUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("sourceUrl must be a valid URL"),
];

export const updateJobValidation = [
  param("id").isUUID().withMessage("Invalid job ID"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Job title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Job title cannot exceed 150 characters"),

  body("company")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company name cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Company name cannot exceed 150 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Location cannot exceed 150 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Job description cannot be empty"),

  body("sourceUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("sourceUrl must be a valid URL"),
];

export const jobIdValidation = [
  param("id").isUUID().withMessage("Invalid job ID"),
];
