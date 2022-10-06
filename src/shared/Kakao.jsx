// React import
import { useEffect, Fragment } from "react";

// Redux import
import { kakaoOauthThunk } from "../redux/modules/MemberSlice";
import { useDispatch } from "react-redux";

const Kakao = () => {
  const dispatch = useDispatch();

  // 리다이렉트된 주소의 params query code를 가져옴
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      dispatch(kakaoOauthThunk(code));
    }
  }, [code]);

  return <Fragment></Fragment>;
};
export default Kakao;
