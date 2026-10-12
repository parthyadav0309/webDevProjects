import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/login.js";
import {logout} from "../controllers/logout.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/user", protect, (req, res) => {
  res.status(200).json({
    authenticated: true,
    userId: req.userId,
  });
});
export default router;