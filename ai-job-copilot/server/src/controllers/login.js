import prisma from "../config/prisma.js";
import { generateToken } from "./auth.controller.js";
import bcrypt from "bcryptjs";

export const login = async (req,res) =>{

    try{
        const {email,password} =req.body;
        console.log("Login request body:", req.body);

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and Password is required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email / Password",
            });
        }

        const hashedPass = user.password;
       
        const passMatch = await bcrypt.compare(password,hashedPass);
        
        if(!passMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user.id);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });

        res.json({
        success: true,
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });


    }

    catch{
        console.error("Login error:", error);

        res.status(500).json({
        success: false,
        message: "Login failed",
        });
    }
    
};