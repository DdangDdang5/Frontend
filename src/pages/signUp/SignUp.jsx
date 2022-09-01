// React import
import { Fragment, useState, useEffect, useSelector } from "react";

// Component & Element import
import Button from "../../elements/button/Button";

//Style import
import styled from "styled-components";

const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const is_signUp = useSelector(is_SignUp);
  // const [email_double, setEmail_Double] = useState("");
  // const [signup_info, setSignUp_Info] = useState({
  //   email: "",
  //   nickname: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const { email, nickname, password, confirmPassword } = signup_info;

  // useEffect(() => {
  //   if (is_signUp === "success") {
  //     alert("땅땅 회원이 되신 것을 축하합니다!");
  //     window.location.href = "/";
  //     return;
  //   }
  // }, [is_signUp]);

  // useEffect(() => {
  //   if (email === "") {
  //     setEamil_Check_Text("");
  //     return;
  //   }
  //   if (emailCheck(email) === false) {
  //     setEmail_Double(false);
  //     setEamil_Check_Text("올바른 이메일 형식이 아닙니다.");
  //   } else if (is_email === "fail") {
  //     setEmail_Double(false);
  //     setEamil_Check_Text("사용중인 이메일입니다.");
  //   } else if (emailCheck(email) === true && is_email === "success") {
  //     setEmail_Double(true);
  //     setEamil_Check_Text("사용 가능한 이메일입니다.");
  //   }
  //   return () => {};
  // }, [email, is_email]);

  // useEffect(() => {
  //   if (nickname === "") {
  //     setNickname_Check_Text("");
  //     return;
  //   }
  //   if (
  //     is_nickname?.message === "fail" &&
  //     is_nickname?.error === "exist nickname"
  //   ) {
  //     setNickName_Double(false);
  //     setNickname_Check_Text("사용중인 닉네임입니다.");
  //   } else if (
  //     is_nickname?.message === "fail" &&
  //     is_nickname?.error === "wrong nickname"
  //   ) {
  //     setNickName_Double(false);
  //     setNickname_Check_Text("사용할 수 없는 닉네임입니다.");
  //   } else if (nickname.length >= 8) {
  //     setNickname_Check_Text("닉네임 글자 수는 6자 미만이어야합니다.");
  //   } else {
  //     setNickName_Double(true);
  //     setNickname_Check_Text("사용 가능한 닉네임입니다.");
  //   }
  // }, [nickname, is_nickname]);

  // const submitSignUp = () => {
  //   if (
  //     email === "" ||
  //     nickname === "" ||
  //     password === "" ||
  //     confirmPassword === ""
  //   ) {
  //     alert("아이디, 닉네임, 비밀번호를 다시 확인 해주세요!");
  //     return;
  //   }

  //   if (!pwdReg(password)) {
  //     alert("비밀번호를 4자 이상 입력해주세요!");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("비밀번호 및 비밀번호확인이 다릅니다!");
  //     return;
  //   }

  //   dispatch(signUp(signup_info));

  //   setSignUp_Info({
  //     email: "",
  //     nickname: "",
  //     password: "",
  //     confirmPassword: "",
  //   });
  // };
  // const submitEnterSignUp = (e) => {
  //   if (e.key === "Enter") {
  //     submitSignUp();
  //   }
  // };
  // const doubleCheckEmail = useCallback(() => {
  //   dispatch(checkEmail(email));
  // }, [email]);

  // const doubleCheckNickname = useCallback(() => {
  //   dispatch(checkNickname(nickname));
  // }, [nickname]);

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
                type="text"
                placeholder="휴대폰 번호를 입력하세요"
                minLength="4"
                maxLength="11"
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
