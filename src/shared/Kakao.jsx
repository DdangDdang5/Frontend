// React import
import { useEffect, Fragment } from "react";

// Redux import
import { kakaoOauthThunk } from "../redux/modules/MemberSlice";

// Package import
import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

// Shared import
import api from "./Api";
import { KAKAO_OAUTH_URL } from "./SocialAuth";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  // 리다이렉트된 주소의 params query code를 가져옴
  const code = new URL(window.location.href).searchParams.get("code");
  // console.log(code);

  // const kakaoLogin = async () => {
  //   await axios
  //   .get(
  //     window.location.href,
  //   )
  //   .then((res) => console.log(res));
  //   };

  useEffect(() => {
    // kakaoLogin()
    if (code) {
      dispatch(kakaoOauthThunk(code));
    }
  }, [code]);

  return <Fragment></Fragment>;
};
export default Kakao;
