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

// api.interceptors.request.use((config) => {
//   const token = getCookie("accessToken");

//   config.headers.common["Authorization"] = `Bearer ${token}`;

//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     const originalRequest = config;

//     if (response.data.token) {
//       setCookie("accessToken", response.data.token, 168);
//       axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

//       return axios(originalRequest);
//     }

//     if (response.data.success === false) {
//       if (response.data.message === "token 문제(기한만료가 아닌 에러)") {
//         deleteCookie("accessToken");
//         localStorage.clear();

//         window
//           .alert({
//             text: "로그인 후 이용해주세요",
//             closeOnClickOutside: false,
//           })
//           .then(function (result) {
//             if (result) {
//               history.push("/login");
//             }
//           });
//         return;
//       }

//       if (
//         response.data.message === "유저 정보 불러오기에 실패하였습니다." ||
//         response.data.message === "잘못된 유저입니다." ||
//         response.data.message === "authorization 값이 존재하지 않습니다." ||
//         response.data.message === "토큰이 Bearer이 아닙니다." ||
//         response.data.message === "reAuthorization 값이 존재하지 않습니다." ||
//         response.data.message === "token 문제(기한만료가 아닌 에러)"
//       ) {
//         deleteCookie("accessToken");
//         localStorage.clear();
//         window
//           .alert({
//             text: "로그인 후 이용해주세요.",
//             closeOnClickOutside: false,
//           })
//           .then(function (result) {
//             if (result) {
//               history.push("/login");
//             }
//           });
//         return;
//       } else {
//         window.alert(response.data.message);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
