import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";
import { Prisma } from "@prisma/client";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

   if (
     typeof name !== "string" ||
     typeof email !== "string" ||
     typeof password !== "string"
   ) {
     return res.status(400).json({
       success: false,
       message: "Invalid registration data",
     });
   }

   const normalizedName = name.trim();
   const normalizedEmail = email.trim().toLowerCase();

   if (!normalizedName || !normalizedEmail || !password) {
     return res.status(400).json({
       success: false,
       message: "All fields are required",
     });
   }

   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
     return res.status(400).json({
       success: false,
       message: "Invalid email address",
     });
   }

   if (password.length < 8) {
     return res.status(400).json({
       success: false,
       message: "Password must contain at least 8 characters",
     });
   }

    const existingUser = await prisma.user.findUnique({
      where: {
        email:normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name:normalizedName,
        email:normalizedEmail,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};
