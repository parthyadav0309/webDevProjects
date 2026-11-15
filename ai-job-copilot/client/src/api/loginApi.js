import { api } from "./backendApi";


export const postLogin = async (email,password) => {
  const response = await api.post(
    `/auth/login`,
    { email, password },
    { withCredentials: true },
  );

  return response.data;
};


export const logout = async ()=>{
  const response = await api.post(
    `/auth/logout`,
    {},
    { withCredentials: true },
  );

   return response.data;
}
