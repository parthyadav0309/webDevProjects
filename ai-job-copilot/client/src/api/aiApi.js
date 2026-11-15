import { api } from "./backendApi";

export const analyzeResume = async (jobId, resumeId) => {
  const response = await api.post("/ai/analyze", {
    jobId,
    resumeId,
  });

  return response.data;
};

export const getAIAnalysis = async (analysisId) => {
  const response = await api.get(`/ai/analyses/${analysisId}`);
  return response.data;
};

export const getAIAnalysesLoggedInUser = async () => {
  const response = await api.get("/ai/analyses");
  return response.data.analyses;
};

// Generate and save career plan
export const generateCareerPlan = async () => {
  const response = await api.post("/ai/career-advice");
  return response.data.careerPlan;
};

// Fetch previous career plans
export const getCareerPlans = async () => {
  const response = await api.get("/ai/career-plans");
  return response.data.careerPlans;
};