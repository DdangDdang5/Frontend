// React import
import { Fragment, useRef, useState, useCallback, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginMemberThunk } from "../../redux/modules/MemberSlice";

// Component & Element import
import Button from "../../elements/button/Button";

// Package import
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { getCookie } from "../../shared/Cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://54.180.89.34:8080/oauth/kakao/callback";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const emailIconRef = useRef();
  const passwordRef = useRef();
  const passwordIconRef = useRef();

  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // useEffect(() => {
  //   if (email !== "") emailIconRef.current.style.display = "block";
  //   else emailIconRef.current.style.display = "none";
  //   if (password !== "") passwordIconRef.current.style.display = "block";
  //   else passwordIconRef.current.style.display = "none";
  // }, [email, password]);

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
        <LoginBoxkakaoButton>
          <Button
            type={"button"}
            text={"카카오 로그인"}
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
        </LoginBoxkakaoButton>
      </LoginBox>
    </Fragment>
  );
};

export default Login;

export const LoginBox = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginBoxTitle = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
`;

export const LoginBoxTitleSpan = styled.span`
  top: 50%;
  transform: translateY(-25px);
  position: absolute;
  width: 200px;
  height: 50px;
  left: 30px;
  color: #3a3a3a;
  font-size: 40px;
`;

export const LoginBoxForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15%;
  gap: 20px;
`;

export const LoginBoxInputGroup = styled.div`
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const LoginBoxInputWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
`;

export const LoginBoxInput = styled.input`
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  padding-left: 10px;
  padding-right: 50px;
  font-size: 18px;
  background-color: #ffffff;
  color: black;
  width: 100%;
  height: 56px;
  border: 1px solid #dedede;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #6d6d6d;
  }
`;

export const LoginBoxInputIcon = styled.div`
  .icon {
    position: absolute;
    right: 10px;
    color: #6d6d6d;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const LoginBoxButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
`;

export const LoginBoxkakaoButton = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8%;
`;

export const LoginBoxSignUp = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBoxSignUpText = styled.span`
  width: 100%;
  text-align: center;
  color: #6d6d6d;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.05em;
  margin-top: 5%;
`;

export const LoginBoxSignUpLink = styled.span`
  margin-left: 10px;
  &:hover {
    color: #000000;
    cursor: pointer;
  }
`;
