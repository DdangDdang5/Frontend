// React import
import { Fragment, useRef, useState, useCallback, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginMemberThunk } from "../../redux/modules/MemberSlice";

// Package import
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { getCookie } from "../../shared/Cookie";

// Component & Element import
import Button from "../../elements/button/Button";

// Style import
import {
  LoginBox,
  LoginBoxTitle,
  LoginBoxTitleSpan,
  LoginBoxForm,
  LoginBoxInputGroup,
  LoginBoxInputWrap,
  LoginBoxInput,
  LoginBoxInputIcon,
  LoginBoxButtonGroup,
  LoginBoxkakaoButton,
  LoginBoxSignUp,
  LoginBoxSignUpText,
  LoginBoxSignUpLink,
} from "./Login.styled";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/member/kakao/callback";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const emailIconRef = useRef();
  const passwordRef = useRef();
  const passwordIconRef = useRef();

  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const deleteEmailText = useCallback(() => {
    setEmail("");
  }, [email]);
  const deletePasswordText = useCallback(() => {
    setPassword("");
  }, [password]);

  const isLogin = useSelector((state) => state.member.isLogin);
  const member = useSelector((state) => state.member.member);
  // const token = getCookie("accessToken")
  useEffect(() => {}, [dispatch]);

  const onsubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      if (email === "") {
        alert("이메일을 입력해주세요");
      } else if (emailRegExp.test(email) === false) {
        alert("이메일 형식에 맞지 않습니다");
      } else {
        dispatch(loginMemberThunk({ email, password }));
      }
    },
    [email, password]
  );

  return (
    <Fragment>
      <LoginBox>
        <LoginBoxTitle>
          <LoginBoxTitleSpan>땅땅</LoginBoxTitleSpan>
        </LoginBoxTitle>
        <LoginBoxForm onSubmit={(event) => onsubmitHandler(event)}>
          <LoginBoxInputGroup>
            <LoginBoxInputWrap>
              <LoginBoxInput
                type={"text"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요."
                required
              />
              <LoginBoxInputIcon ref={emailIconRef}>
                <MdCancel onClick={deleteEmailText} className="icon" />
              </LoginBoxInputIcon>
            </LoginBoxInputWrap>
          </LoginBoxInputGroup>
          <LoginBoxInputGroup>
            <LoginBoxInputWrap>
              <LoginBoxInput
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요."
              />
              <LoginBoxInputIcon ref={emailIconRef}>
                <MdCancel onClick={deletePasswordText} className="icon" />
              </LoginBoxInputIcon>
            </LoginBoxInputWrap>
          </LoginBoxInputGroup>
          <LoginBoxButtonGroup>
            <Button
              type={"submit"}
              text={"로그인"}
              style={{
                width: "100%",
                height: "56px",
                ft_size: "18px",
                color: "#6D6D6D",
                bg_color: "#DEDEDE",
              }}
            />
          </LoginBoxButtonGroup>
        </LoginBoxForm>
        <LoginBoxSignUp>
          <LoginBoxSignUpText>
            계정정보를 잊으셨나요?
            <LoginBoxSignUpLink onClick={() => navigate("/signup")}>
              회원가입하기
            </LoginBoxSignUpLink>
          </LoginBoxSignUpText>
        </LoginBoxSignUp>
        <LoginBoxkakaoButton
            type={"button"}
            text={"카카오로 로그인하기"}
            onClick={() => {
              window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
            }}
            style={{
              width: "100%",
              height: "56px",
              ft_size: "18px",
              bg_color: "#f7e111",
              color: "#6D6D6D",
            }}
          />
      </LoginBox>
    </Fragment>
  );
};

export default Login;
