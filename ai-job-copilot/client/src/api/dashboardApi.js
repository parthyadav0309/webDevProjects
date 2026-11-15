import { api } from "./backendApi";

export const getJobs = () => api.get("/jobs");
export const getResumes = () => api.get("/resumes");
export const getApplications = () => api.get("/applications");
