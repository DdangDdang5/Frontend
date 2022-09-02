import { useEffect, Fragment } from "react";
import { kakaoAuthThunk } from "../redux/modules/member";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization_code = new URL(window.location.href).searchParams.get(
    "code"
  );

  useEffect(() => {
    const fetchCode = (code) => {
      dispatch(kakaoAuthThunk({ code })).then((res) => {
        if (res.payload) {
          navigate("/");
        }
      });
    };
    fetchCode(authorization_code);
  }, []);

  return <Fragment></Fragment>;
};
export default Kakao;
