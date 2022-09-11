// React import
import { useEffect, Fragment } from "react";

// Redux import
import { kakaoOauthThunk } from "../redux/modules/MemberSlice";

// Package import
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { kakaoOauthThunk } from "../redux/modules/MemberSlice";

// Shared import
import api from "./Api";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    if (code) {
      dispatch(kakaoOauthThunk(code));
      // api
      //   .get(`/member/kakao/callback?code=${code}`)
      //   .then((res) => {
      //     if (res.data.success === true) {
      //       return (
      //         localStorage.setItem("memberId", res.data.result.memberId),
      //         localStorage.setItem("accessToken", res.headers.authorization),
      //         cookies.set("refreshToken", res.headers["refresh-token"]),
      //         navigate("/")
      //       );
      //     }
      //   })
      //   .catch((err) => {
      //   });
    }
  }, [code]);
  return <Fragment></Fragment>;
};
export default Kakao;
