import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getJobs = async()=>{
    const response = await api.get("jobs");
    return response.data;
}

export const createJobs = async(jobData)=>{
    // console.log(jobData);
    const response = await api.post("jobs",jobData);
    return response.data;
}

export const getJobById = async(id)=>{
    const response = await api.delete("resumes", {
      params: { id },
    });
    return response.data;
}

export const updateJob = async(id,jobData)=>{
    // console.log(jobData);
    const response = await api.put(`jobs/${id}`,jobData);
    return response.data;
}

export const deleteJob = async(id)=>{
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}