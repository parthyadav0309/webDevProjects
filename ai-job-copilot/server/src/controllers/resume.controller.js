import fs from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";
import prisma from "../config/prisma.js";

export const uploadResume = async (req, res) => {
  try {
    // 1. Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    // 2. Get the uploaded file path
    const filePath = path.resolve(req.file.path);

    // 3. Read PDF file as Buffer
    const fileBuffer = await fs.readFile(filePath);

    // 4. Create PDF parser
    const parser = new PDFParse({
      data: fileBuffer,
    });

    // 5. Extract text from PDF
    const pdfData = await parser.getText();

    const extractedText = pdfData.text;
    // console.log(extractedText);
    // 6. Clean up parser resources
    await parser.destroy();

    // 7. Check whether text was extracted
    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // 8. Save resume information in PostgreSQL using Prisma

    const resume = await prisma.resume.create({
      data: {
        userId: req.userId,
        name: req.file.originalname,
        fileName: req.file.filename,
        fileUrl: `/uploads/resumes/${req.file.filename}`,
        extractedText,
      },
    });

    // 9. Send response
    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        id: resume.id,
        name: resume.name,
        fileName: resume.fileName,
        extractedText: resume.extractedText, //don't return the entire resume text to the frontend.
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};

/////

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        fileName: true,
        fileUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if(resumes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resumes found for the user",
      });
    }

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};

//////

export const deleteResume = async (req, res) => {
  console.log("HERE");
  try {
    const { id } = req.query;
    console.log("Deleting resume with ID:", id, "for user ID:", req.userId);
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await prisma.resume.delete({
      where: {
        id,
      },
    });

    if (resume.fileName) {
      const filePath = path.resolve("uploads/resumes", resume.fileName);

      await fs.unlink(filePath).catch(() => {});
    }

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};