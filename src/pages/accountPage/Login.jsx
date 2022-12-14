// React import
import { Fragment, useRef, useState, useCallback, useEffect } from "react";

// Redux import
import { useDispatch } from "react-redux/es/exports";
import { loginMemberThunk } from "../../redux/modules/MemberSlice";

// Package import
import { useNavigate } from "react-router-dom";

// Component & Element & Shared import
import Header from "../../components/header/Header";
import Button from "../../elements/button/Button";
import { KAKAO_OAUTH_URL } from "../../shared/SocialAuth";
import { Delete, Kakao, Logo } from "../../shared/images";

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
  LoginBoxkakaoButtonGroup,
  LoginBoxSignUp,
  LoginBoxSignUpText,
  LoginBoxSignUpLink,
} from "./Login.styled";

const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (location?.state) {
    localStorage.setItem("from", location?.state?.from);
  }

  const iconRef = useRef();

  //이메일 정규 표현식
  const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

  const deleteEmailText = useCallback(() => {
    setEmail("");
  }, [email]);

  const deletePasswordText = useCallback(() => {
    setPassword("");
  }, [password]);

  useEffect(() => {}, [dispatch]);

  const onsubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      if (email === "") {
        alert("이메일을 입력해주세요");
      } else if (emailRegExp.test(email) === false) {
        alert("이메일 형식에 맞지 않습니다");
      } else if (password === "") {
        alert("비밀번호를 입력해주세요");
      } else {
        dispatch(loginMemberThunk({ email, password })).then((res) => {
          if (res.payload.statusCode === 200) {
            window.alert(`${res.payload.data.nickName}님 안녕하세요!`);

            navigate(-1);
          } else {
            alert(res.payload.msg);
          }
        });
      }
    },
    [email, password]
  );

  return (
    <Fragment>
      <Header close={true} />
      <LoginBox>
        <LoginBoxTitle>
          <LoginBoxTitleSpan>
            <Logo
              style={{
                width: "44.51px",
                height: "29px",
              }}
            />
          </LoginBoxTitleSpan>
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
              <LoginBoxInputIcon ref={iconRef}>
                <Delete onClick={deleteEmailText} className="icon" />
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
              <LoginBoxInputIcon ref={iconRef}>
                <Delete onClick={deletePasswordText} className="icon" />
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
                color: "#FFFFFF",
                bg_color: "#4D71FF",
              }}
            />
          </LoginBoxButtonGroup>
        </LoginBoxForm>
        <LoginBoxSignUp>
          <LoginBoxSignUpText>계정정보를 잊으셨나요?</LoginBoxSignUpText>
          <LoginBoxSignUpLink onClick={() => navigate("/signup")}>
            회원가입하기
          </LoginBoxSignUpLink>
        </LoginBoxSignUp>
        <LoginBoxkakaoButtonGroup>
          <Kakao
            type={"button"}
            text={"카카오로 로그인하기"}
            onClick={() => {
              window.location.href = KAKAO_OAUTH_URL;
            }}
          />
        </LoginBoxkakaoButtonGroup>
      </LoginBox>
    </Fragment>
  );
};

export default Login;
