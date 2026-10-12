import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const postLogin = async (email,password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true },
  );

  return response.data;
};


export const logout = async ()=>{
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    { withCredentials: true },
  );

   return response.data;
}
