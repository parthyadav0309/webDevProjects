import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getResumes = async ()=>{
    const response =  await api.get("/resumes");
    return response.data.resumes;
};

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('resume',file);
    
    const response =  await api.post("/resumes/upload", formData);
    return response.data.resume;

};

export const deleteResume = async (id)=>{
    const response = await api.delete("resumes",{
        params: {id},
    });
    return response.data;
};