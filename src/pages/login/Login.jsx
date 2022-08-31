// React import
import { Fragment, useRef, useState } from "react";

// Component & Element import
import Button from "../../elements/button/Button";

// Style import
import styled from "styled-components";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return (
    <Fragment>
      <LoginBox>
        <LoginBoxTitle>
          <LoginBoxTitleSpan>Login</LoginBoxTitleSpan>
        </LoginBoxTitle>
        <LoginBoxForm>
          <LoginBoxInputGroup>
            <LoginBoxInputWrap>
              <LoginBoxInput
                type="text"
                placeholder="이메일 주소를 입력하세요."
                required
              ></LoginBoxInput>
            </LoginBoxInputWrap>
          </LoginBoxInputGroup>
          <LoginBoxInputGroup>
            <LoginBoxInputWrap>
              <LoginBoxInput
                type="password"
                placeholder="패스워드를 입력하세요."
              />
            </LoginBoxInputWrap>
          </LoginBoxInputGroup>
          <LoginBoxButtonGroup>
            <Button
              type={"submit"}
              text={"로그인"}
              style={{
                width: "80%",
                height: "50px",
                ft_size: "16px",
                color: "#202020",
              }}
            />
            <Button
              type={"button"}
              text={"카카오 로그인"}
              _onClick={() => {}}
              style={{
                width: "80%",
                height: "50px",
                ft_size: "16px",
                bg_color: "#f7e111",
              }}
            />
          </LoginBoxButtonGroup>
        </LoginBoxForm>
        <LoginBoxSignUp>
          <LoginBoxSignUpText>
            땅땅 회원이 아니신가요?
            <LoginBoxSignUpLink>회원가입</LoginBoxSignUpLink>
          </LoginBoxSignUpText>
        </LoginBoxSignUp>
      </LoginBox>
    </Fragment>
  );
};

export default Login;

export const LoginBox = styled.div`
  position: absolute;
  border-radius: 5%;
  width: 100%;
  height: 650px;
  box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10%;
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
  color: #cecece;
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
  gap: 20px;
`;

export const LoginBoxInputGroup = styled.div`
  box-sizing: border-box;
  width: 80%;
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
  padding-left: 10px;
  padding-right: 50px;
  font-size: 15px;
  background-color: #cecece;
  color: black;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

export const LoginBoxButtonGroup = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
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
  text-align: center;
  width: 250px;
  color: #cecece;
  font-size: 15px;
`;

export const LoginBoxSignUpLink = styled.span`
  margin-left: 10px;
  &:hover {
    color: #ff0356;
    cursor: pointer;
  }
`;
