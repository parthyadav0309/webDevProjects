import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getJobs = () => api.get("/jobs");
export const getResumes = () => api.get("/resumes");
export const getApplications = () => api.get("/applications");
