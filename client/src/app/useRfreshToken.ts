import { AxiosError } from "axios";
import API from "../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useRefreshToken = () => {
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await API.get("/refresh", {
        withCredentials: true,
      });
      Cookies.set("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        navigate("/signin");
      }
    }
  };
  return refresh;
};
