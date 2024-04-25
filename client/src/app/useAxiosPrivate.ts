import { axiosPrivate } from "../api";
import { useRefreshToken } from "./useRfreshToken";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "./hooks";

const useAxiosPrivate = () => {
  const { user } = useAppSelector((state) => state.userAuth); 
  const refresh = useRefreshToken();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = newAccessToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = accessToken;
          config.headers["Role"] = user?.role;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;

