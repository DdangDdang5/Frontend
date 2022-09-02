import axios from "axios";
import { createDispatchHook } from "react-redux";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const token = localStorage.getItem("token");
api.defaults.headers.common["authorization"] = token ? `${token}` : null;

export default api;

