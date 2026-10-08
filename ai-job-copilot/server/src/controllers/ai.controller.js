import prisma from "../config/prisma.js";
import { analyzeResumeAgainstJob } from "../services/ai.service.js";

export const analyzeJobApplication = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;

    // Check job ownership
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: req.userId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: req.userId,
      },
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        success: false,
        message: "Resume does not contain extracted text",
      });
    }

    // Call AI service
    const analysis = await analyzeResumeAgainstJob({
      resumeText: resume.extractedText,
      jobTitle: job.title,
      company: job.company,
      jobDescription: job.description,
    });

    // Save AI analysis
    const savedAnalysis = await prisma.aIAnalysis.create({
      data: {
        jobId: job.id,
        resumeId: resume.id,
        matchScore: analysis.matchScore,
        result: analysis,
      },
    });

    return res.status(201).json({
      success: true,
      message: "AI analysis completed successfully",
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};

export const getAiAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await prisma.aIAnalysis.findFirst({
      where: {
        id,
        job: {
          userId: req.userId,
        },
      },
      include: {
        job: true,
      },
    });
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "AI analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};

export const getAnalysesByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Verify that the job belongs to the logged-in user
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: req.userId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const analyses = await prisma.aIAnalysis.findMany({
      where: {
        jobId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    console.error("Get job analyses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get AI analyses",
    });
  }
};