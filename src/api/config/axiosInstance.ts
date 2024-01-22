
import axios from "axios";
import { refreshToken, logout } from "../services/auth";
import globalRouter from "../../globalRouter";

const apiCall = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  //baseURL: "http://101.53.240.136:5002/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiCall.interceptors.response.use(
  (response) => {
   return response;
  },
  async function (error) {
    const originalRequest = error.config;
       if(error.response.status===422 && globalRouter.navigate) {
        return globalRouter.navigate('accessdenied')
   }
    
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response: any = await refreshToken();
      if (response.data.status === false) {
        const resp = await logout();
        if (resp) {
          return localStorage.removeItem("authInfo");
        }
      }
      return apiCall(originalRequest);
    }
   return Promise.reject(error);
  }
);
export default apiCall;
