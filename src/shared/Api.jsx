import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "./Cookie";
import { history } from "../redux/config/ConfigStore";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

// api.defaults.headers.common["authorization"] = token ? `${token}` : null;
api.interceptors.request.use((config) => {
  // const token = getCookie("accessToken");
  // const refreshToken = getCookie("refreshToken");

	const token = sessionStorage.getItem("accessToken");
	const refreshToken = sessionStorage.getItem("refreshToken");

  config.headers.common["Authorization"] = token;
  config.headers.common["reAuthorization"] = refreshToken;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.data.token) {
      setCookie("accessToken", response.data.token, 168);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

      return axios(originalRequest);
    }

    if (response.data.success === false) {
      if (response.data.message === "token 문제(기한만료가 아닌 에러)") {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        localStorage.clear();

        window
          .alert({
            text: "로그인 후 이용해주세요",
            closeOnClickOutside: false,
          })
          .then(function (result) {
            if (result) {
              history.push("/login");
            }
          });
        return;
      }

      if (
        response.data.message === "유저 정보 불러오기에 실패하였습니다." ||
        response.data.message === "잘못된 유저입니다" ||
        response.data.message === "코스 추천 게시물 불러오기 실패하였습니다" ||
        response.data.message === "refreshToken까지 만료되었습니다." ||
        response.data.message ===
          "database에 저장된 refreshToken과 다릅니다." ||
        response.data.message === "authorization 값이 존재하지 않습니다." ||
        response.data.message === "토큰이 Bearer가 아닙니다." ||
        response.data.message === "reAuthorization 값이 존재하지 않습니다." ||
        response.data.message === "리프레쉬 토큰이 Bearer가 아닙니다." ||
        response.data.message === "token에 문제가 있음(기한만료가 아닌 에러)" ||
        response.data.message ===
          "refreshToken에 문제가 있음(기한만료가 아닌 에러)"
      ) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        localStorage.clear();
        window
          .alert({
            text: "로그인 후 이용해주세요.",
            closeOnClickOutside: false,
          })
          .then(function (result) {
            if (result) {
              history.push("/login");
            }
          });
        return;
      } else {
        window.alert(response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
