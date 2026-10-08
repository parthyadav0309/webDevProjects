import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

JOB:
Title: ${jobTitle}
Company: ${company}

Job Description:
${jobDescription}

RESUME:
${resumeText}

Return ONLY valid JSON in exactly this structure:

{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "interviewQuestions": []
}

Rules:
- matchScore must be an integer between 0 and 100.
- matchingSkills must contain skills present in both the resume and job description.
- missingSkills must contain important job requirements missing or weak in the resume.
- strengths must contain specific candidate strengths relevant to the job.
- weaknesses must contain specific gaps.
- recommendations must be practical and actionable.
- interviewQuestions must contain relevant technical/interview questions.
- Do not include markdown.
- Return only JSON.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional technical recruiter and resume analyst. Always return valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  const analysis = JSON.parse(content);

  return analysis;
};
