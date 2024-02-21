import { axiosPrivate } from "../api";
import { useRefreshToken } from "./useRfreshToken";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("Intercepting Response");
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          prevRequest.headers["Authorization"] = newAccessToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("intercepting request");
        if (accessToken && !config.headers["Authorization"]) {
          // config.headers["Authorization"] = `Bearer ${accessToken}`;
          config.headers["Authorization"] = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
