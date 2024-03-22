import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://bright-route.online/api"

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
