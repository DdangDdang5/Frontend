// React import
import { useEffect, Fragment } from "react";

// Redux import
import { kakaoOauthThunk } from "../redux/modules/MemberSlice";

// Package import
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";

// Shared import
import api from "./Api";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const code = new URL(window.location.href).searchParams.get("code");
  
  useEffect(() => {
    if (code) {
      dispatch(kakaoOauthThunk(code));
    }
  }, [code]);
  return <Fragment></Fragment>;
};
export default Kakao;
