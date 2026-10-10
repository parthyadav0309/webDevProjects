import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAiAnalysis = async (analysisId) => {
    const response = await axios.get(
        `${API_URL}/ai/analysis/${analysisId}`,
        {
            withCredentials: true,
    
        }
    );

    return response.data;
}