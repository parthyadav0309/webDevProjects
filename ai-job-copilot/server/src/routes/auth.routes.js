import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/login.js";
import {logout} from "../controllers/logout.js"
import { protect } from "../middleware/auth.middleware.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again later.",
  },
});

const router = express.Router();

router.post("/register",authLimiter, register);
router.post("/login",authLimiter,login);
router.post("/logout",logout);
router.get("/user", protect, (req, res) => {
  res.status(200).json({
    authenticated: true,
    userId: req.userId,
  });
});
export default router;