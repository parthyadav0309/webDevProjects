import prisma from "../config/prisma.js";

export const createApplication = async (req, res) => {
  try {
    const { jobId, resumeId, status, appliedAt, interviewAt, notes } = req.body;

    // Make sure the job belongs to the logged-in user
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

    // If resumeId was provided, verify ownership
    if (resumeId) {
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
    }

    const application = await prisma.application.create({
      data: {
        userId: req.userId,
        jobId,
        resumeId: resumeId || null,
        status: status || "SAVED",
        appliedAt: appliedAt ? new Date(appliedAt) : null,
        interviewAt: interviewAt ? new Date(interviewAt) : null,
        notes: notes || null,
      },
      include: {
        job: true,
        resume: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create application",
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job: true,
        resume: true,
      },
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        job: true,
        resume: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const existingApplication = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const { status, appliedAt, interviewAt, notes, resumeId } = req.body;

    if (resumeId) {
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
    }

    const application = await prisma.application.update({
      where: {
        id,
      },
      data: {
        ...(status !== undefined && { status }),

        ...(appliedAt !== undefined && {
          appliedAt: appliedAt ? new Date(appliedAt) : null,
        }),

        ...(interviewAt !== undefined && {
          interviewAt: interviewAt ? new Date(interviewAt) : null,
        }),

        ...(notes !== undefined && {
          notes,
        }),

        ...(resumeId !== undefined && {
          resumeId: resumeId || null,
        }),
      },
      include: {
        job: true,
        resume: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await prisma.application.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};