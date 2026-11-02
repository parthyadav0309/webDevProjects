import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

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

