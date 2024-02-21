import API from "../api";
import Cookies from "js-cookie";

export const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await API.get("/refresh", {
        withCredentials: true,
      });
      Cookies.set("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  };
  return refresh;
};
