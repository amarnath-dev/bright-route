import API from "../api";
import Cookies from "js-cookie";

export const useRefreshToken = () => {
  const refresh = async () => {
    console.log("refresh called");
    try {
      const response = await API.get("/refresh", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log("response of refresh -> ", response.data);
      Cookies.set("token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  };
  return refresh;
};
