import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResumeAgainstJob = async ({
  resumeText,
  jobTitle,
  company,
  jobDescription,
}) => {
  const prompt = `
You are an expert technical recruiter and resume analyst.

Analyze the candidate's resume against the job description.

JOB INFORMATION
Title: ${jobTitle}
Company: ${company}

JOB DESCRIPTION
${jobDescription}

CANDIDATE RESUME
${resumeText}

Analyze how well the candidate matches the job.

Return:
- Match score from 0 to 100
- Skills that match the job requirements
- Important skills missing from the resume
- Candidate strengths relevant to this job
- Candidate weaknesses or gaps
- Practical recommendations to improve the candidate's chances
- Relevant technical and behavioral interview questions

Be specific and base your analysis only on the provided resume and job description.
Never invent experience, skills, companies, technologies,
certifications, years of experience, or achievements.

Only state information that can be directly supported
by the provided resume text.

If information is unavailable, say it is unavailable.

Match score should be calculated based on:

40% - Required technical skills
25% - Relevant experience
15% - Responsibilities
10% - Database/cloud/tools
10% - Other requirements

Do not give a score above 95 unless nearly every requirement
is explicitly supported by the resume.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {
          matchScore: {
            type: Type.INTEGER,
            description: "Resume-to-job match score from 0 to 100",
          },

          matchingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description:
              "Skills present in both the resume and job description",
          },

          missingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Important job requirements missing from the resume",
          },

          strengths: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Candidate strengths relevant to the job",
          },

          weaknesses: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Candidate weaknesses or gaps",
          },

          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "Practical recommendations for the candidate",
          },

          interviewQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description:
              "Relevant technical and behavioral interview questions",
          },
        },

        required: [
          "matchScore",
          "matchingSkills",
          "missingSkills",
          "strengths",
          "weaknesses",
          "recommendations",
          "interviewQuestions",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  const analysis = JSON.parse(response.text);

  // Additional application-level validation
  if (
    typeof analysis.matchScore !== "number" ||
    analysis.matchScore < 0 ||
    analysis.matchScore > 100
  ) {
    throw new Error("Invalid matchScore returned by Gemini");
  }

  return analysis;
};
