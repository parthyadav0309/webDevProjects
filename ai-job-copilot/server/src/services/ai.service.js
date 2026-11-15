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

export const generateCareerAdvice = async ({ analyses }) => {
  if (!Array.isArray(analyses) || analyses.length === 0) {
    throw new Error("No AI analyses available to generate career advice");
  }

  const analysisData = analyses.map((analysis) => ({
    jobTitle: analysis.jobTitle,
    company: analysis.company,
    matchScore: analysis.matchScore,
    matchingSkills: analysis.matchingSkills || [],
    missingSkills: analysis.missingSkills || [],
    recommendations: analysis.recommendations || [],
    weaknesses: analysis.weaknesses || [],
  }));

  const prompt = `
You are an expert technical career advisor and software engineering mentor.

Analyze the candidate's previous resume-to-job analyses.

ANALYSIS DATA:
${JSON.stringify(analysisData, null, 2)}

Your task is to generate a personalized career improvement plan.

Requirements:

1. Identify important skills the candidate should improve.
2. Prioritize skills based on how frequently they are missing and their relevance to the analyzed jobs.
3. Create a practical four-week learning roadmap.
4. Recommend practical projects to demonstrate the skills.
5. Suggest technical interview preparation topics.
6. Provide actionable career improvement recommendations.

Important rules:
- Base recommendations only on the supplied analysis data.
- Do not invent candidate experience or qualifications.
- Distinguish between observed skill gaps and suggested skills to learn.
- Avoid recommending skills unrelated to the analyzed job requirements.
- Make the roadmap realistic for someone learning alongside other responsibilities.
- If there is insufficient information, clearly state the limitation.
- Return valid structured JSON matching the requested schema.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {
          careerSummary: {
            type: Type.STRING,
            description:
              "A short summary of the candidate's current skill position",
          },

          prioritySkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                priority: {
                  type: Type.STRING,
                  enum: ["HIGH", "MEDIUM", "LOW"],
                },
                reason: { type: Type.STRING },
              },
              required: ["skill", "priority", "reason"],
            },
          },

          learningRoadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.INTEGER },
                title: { type: Type.STRING },
                topics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                tasks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["week", "title", "topics", "tasks"],
            },
          },

          projectRecommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                skillsImproved: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: [
                "title",
                "description",
                "technologies",
                "skillsImproved",
              ],
            },
          },

          interviewPreparation: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },

        required: [
          "careerSummary",
          "prioritySkills",
          "learningRoadmap",
          "projectRecommendations",
          "interviewPreparation",
          "recommendations",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty career advice response");
  }

  const advice = JSON.parse(response.text);

  if (
    !Array.isArray(advice.prioritySkills) ||
    !Array.isArray(advice.learningRoadmap) ||
    !Array.isArray(advice.projectRecommendations)
  ) {
    throw new Error("Invalid career advice response from Gemini");
  }

  return advice;
};
