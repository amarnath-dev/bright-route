import API from "../api";

export const useRefreshToken = () => {
  const refresh = async () => {
    console.log("refresh called");
    try {
      const response = await API.get("/refresh", {
        withCredentials: true,
      });
      console.log("response of refresh -> ", response.data);
      // Cookies.set("token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  };
  return refresh;
};
