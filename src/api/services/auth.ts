import axios from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("auth/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post("auth/logout");
    return response;
  } catch (error) {
    return error;
  }
};

const refreshToken = async () => {
    try {
      const response = await axios.post("auth/refresh");
      return response;
    } catch (error) {
      return error;
    }
  };

export { login, logout,refreshToken };
