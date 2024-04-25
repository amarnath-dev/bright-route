import axios from "axios";

// const baseURL = "https://bright-route.online";
const baseURL = import.meta.env.VITE_API;

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
