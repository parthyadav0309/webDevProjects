import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const getJobs = () => api.get("/jobs");
export const getResumes = () => api.get("/resumes");
export const getApplications = () => api.get("/applications");
