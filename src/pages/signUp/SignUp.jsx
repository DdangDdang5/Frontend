// React import
import { Fragment } from "react";

// Component & Element import
import Button from "../../elements/button/Button";

//Style import
import styled from "styled-components";

const SignUp = () => {
  return (
    <Fragment>
      <SignUpBox>
        <SignUpBoxTitle>
          <SignUpBoxTitleSpan>Sign Up</SignUpBoxTitleSpan>
        </SignUpBoxTitle>
        <SignUpBoxForm>
          <SignUpBoxInputGroup>
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="text"
                placeholder="이메일 주소를 입력하세요"
                required
              ></SignUpBoxInput>
            </SignUpBoxInputWrap>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="text"
                placeholder="닉네임을 입력하세요(4 ~ 6 글자)"
                minLength="4"
                maxLength="6"
                required
              />
            </SignUpBoxInputWrap>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
              ></SignUpBoxInput>
            </SignUpBoxInputWrap>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                required
              ></SignUpBoxInput>
            </SignUpBoxInputWrap>
          </SignUpBoxInputGroup>
          <SignUpButtonGroup>
            <Button
              type={"submit"}
              text={"Submit"}
              style={{
                width: "170px",
                height: "50px",
                ft_size: "15px",
                color: "#202020",
              }}
            />
            <Button
              type={"button"}
              text={"Back"}
              style={{
                width: "170px",
                height: "50px",
                ft_size: "15px",
                color: "#202020",
                bg_color: "#727272",
              }}
            />
          </SignUpButtonGroup>
        </SignUpBoxForm>
      </SignUpBox>
    </Fragment>
  );
};

export default SignUp;

export const SignUpBox = styled.div`
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

export const SignUpBoxTitle = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
`;

export const SignUpBoxTitleSpan = styled.span`
  top: 50%;
  transform: translateY(-25px);
  position: absolute;
  width: 200px;
  height: 50px;
  left: 30px;
  color: #cecece;
  font-size: 40px;
`;

export const SignUpBoxForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const SignUpBoxInputGroup = styled.div`
  box-sizing: border-box;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SignUpBoxInputWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  .icon-password {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-20px);
    font-size: 40px;
    color: #202020;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const SignUpBoxInput = styled.input`
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

export const SignUpButtonGroup = styled.div`
  margin-top: 5%;
  width: 80%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;
