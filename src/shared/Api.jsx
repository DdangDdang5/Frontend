// Package import
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
	const token = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  config.headers.common["Authorization"] = token;
  config.headers.common["reAuthorization"] = refreshToken;

  return config;
});

export default api;