import axios from "axios";

const baseURL = "https://bright-route.online";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
