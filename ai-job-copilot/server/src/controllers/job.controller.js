import prisma from "../config/prisma.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, description, sourceUrl } = req.body;

    const job = await prisma.job.create({
      data: {
        userId: req.userId,
        title,
        company,
        location,
        description,
        sourceUrl,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};


export const getMyJobs = async (req,res)=>{
    try {
        const jobs = await prisma.job.findMany({
          where: {
            userId: req.userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return res.status(200).json({
            success:true,
            count: jobs.length,
            jobs,
        });
    } catch (error) {
        console.error("Get jobs error:",error);

        return res.status(500).json({
            success: false,
            message: "failed to fetch the jobs",
        });
        
    }
}

export const getJobById = async(req,res)=>{
    try {
        const {id} = req.params;

        const job = await prisma.job.findFirst({
            where:{
                id,
                userId:req.userId,
            }
        })

        if(!job){
            return res.status(404).json({
                success: false,
                message: "job not found",
            })
        }

        return res.status(200).json({
            success:true,
            job,
        });
    } catch (error) {
        console.log("Get job error:", error);

        return res.status(500).json({
            success: false,
            message: "failed to fecth job",
        });
    }
};

export const updateJob = async (req,res) =>{
    const {id} = req.params;
    try {
        const exisitingJob = await prisma.job.findFirst({
            where:{
                id,
                userId:req.userId,

            },
        });

        if(!exisitingJob){
            return res.status(404).json({
                success: false,
                message: "job not found"
            });
        }

        const { title, company, location, description, sourceUrl } = req.body;

        const job = await prisma.job.update({
            where:{
                id,
            },
            data:{
                ...(title!==undefined && {title}),
                ...(company!==undefined && {company}),
                ...(location!==undefined && {location}),
                ...(description!=undefined && {description}),
                ...(sourceUrl!=undefined && {sourceUrl}),
            },
        });

        return res.status(200).json({
            success:true,
            message:"job updated Successfully",
            job,
        });
    } catch (error) {
        console.error("Update job error:", error);

        return res.status(500).json({
          success: false,
          message: "Failed to update job",
        });
    }
}

export const deleteJob = async(req,res)=>{
    try {
        const {id} = req.params;

        const job = await prisma.job.findFirst({
            where:{
                id,
                userId:req.userId,
            },
        });

        if(!job){
            return res.status(404).json({
                success: false,
                message: "job not found",
            });
        }

        await prisma.job.delete({
            where:{
                id,
            },
        });

        return res.status(200).json({
            success:true,
            message:"Job deleted successfully",
        });
    } catch (error) {
         console.error("Delete job error:", error);

         return res.status(500).json({
           success: false,
           message: "Failed to delete job",
         });
    }
}