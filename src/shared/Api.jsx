import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

// const token = getCookie("accessToken");
const token = localStorage.getItem("accessToken");
api.defaults.headers.common["authorization"] = token ? `${token}` : null;

export default api;
