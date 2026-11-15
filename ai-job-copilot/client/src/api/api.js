import { api } from "./backendApi";


export const getAiAnalysis = async (analysisId) => {
    const response = await api.get(
        `/ai/analysis/${analysisId}`,
        {
            withCredentials: true,
    
        }
    );

    return response.data;
}