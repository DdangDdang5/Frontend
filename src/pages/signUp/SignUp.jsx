// React import
import { Fragment, useState, useEffect, useRef, useCallback } from "react";

// Redux import
import { useDispatch } from "react-redux";
import {
  emailCheckThunk,
  signUpMemberThunk,
  nickNameCheckThunk,
} from "../../redux/modules/MemberSlice";

// Package import
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// Component & Element import
import Button from "../../elements/button/Button";
import Header from "../../components/header/Header";

// Shared import
import { Delete, DeleteImage, Ok } from "../../shared/images";

//Style import
import {
  SignUpBox,
  SignUpBoxForm,
  SignUpBoxInputGroup,
  SignUpBoxInputWrap,
  SignUpBoxInput,
  SignUpBoxInputIcon,
  SignUpBoxSpan,
  SignUpButtonGroup,
} from "./SignUp.styled";

const SignUp = () => {
  // 인풋 상태 관리
  const [check, setCheck] = useState({
    email: false,
    id: false,
    nickName: false,
    password: false,
    repassword: false,
  });

  // 중복 검사
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const emailSpanRef = useRef();
  const emailIconRef = useRef();
  const passwordRef = useRef();
  const passwordSpanRef = useRef();
  const passwordIconRef = useRef();
  const rePasswordRef = useRef();
  const rePasswordSpanRef = useRef();
  const rePasswordIconRef = useRef();
  const nickNameRef = useRef();
  const nickNameIconRef = useRef();
  const nickNameSpanRef = useRef();
  const NickNameCheckRef = useRef();

  const newMember = {
    email,
    password,
    nickName,
  };

  // 이메일 확인
  const checkLoginEmail = useCallback(
    debounce((email) => {
      const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
      if (!emailRegExp.test(email)) {
        emailSpanRef.current.innerText = "이메일 형식에 맞지 않습니다.";
        emailSpanRef.current.style.color = "#FF664D";
        emailRef.current.style.borderColor = "#FF664D";
        // setCheck({ ...check, email: true });
        setEmailCheck(true);
      } else {
        dispatch(emailCheckThunk({ email })).then((res) => {
          if (!res.payload) {
            emailSpanRef.current.innerText = "중복되는 이메일입니다.";
            emailSpanRef.current.style.color = "#FF664D";
            emailRef.current.style.borderColor = "#FF664D";
            setEmailCheck(true);
          } else {
            emailSpanRef.current.innerText = "사용가능한 이메일입니다.";
            emailSpanRef.current.style.color = "#1DC79A";
            emailRef.current.style.borderColor = "#1DC79A";
            setEmailCheck(false);
          }
        });
      }
    }, 500),
    [email]
  );

  // 비밀번호 정규 표현식
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  // 비밀번호 확인
  useEffect(() => {
    if (password === "" && repassword === "") {
      passwordSpanRef.current.innerText = "";
    } else if (passwordRegExp.test(password) === false) {
      passwordSpanRef.current.innerText =
        "비밀번호는 영문 대소문자, 숫자, 특수문자(`!@#$%)를 혼합하여 8~20자로 입력해주세요.";
      passwordSpanRef.current.style.color = "#FF664D";
      passwordRef.current.style.borderColor = "#FF664D";
    } else if (passwordRegExp.test(password) === true) {
      passwordSpanRef.current.style.color = "#1DC79A";
      passwordRef.current.style.borderColor = "#1DC79A";
      passwordSpanRef.current.innerText = "";
    } else if (password === "") {
      passwordSpanRef.current.style.color = "#FF664D";
      passwordRef.current.style.borderColor = "#FF664D";
      passwordSpanRef.current.innerText =
        "비밀번호는 영문 대소문자, 숫자, 특수문자(`!@#$%)를 혼합하여 8~20자로 입력해주세요.";
    }
    if (repassword !== password && repassword.length > 0) {
      rePasswordSpanRef.current.style.color = "#FF664D";
      rePasswordSpanRef.current.innerText = "비밀번호가 일치하지 않습니다.";
      rePasswordRef.current.style.borderColor = "#FF664D";
    } else if (repassword.length > 0) {
      rePasswordSpanRef.current.innerText = "비밀번호가 일치합니다.";
      rePasswordSpanRef.current.style.color = "#1DC79A";
      rePasswordRef.current.style.borderColor = "#1DC79A";
    }
  }, [password, repassword]);

  useEffect(() => {
    if (nickName !== "") {
      checkNickName(nickName);
    } else {
      nickNameSpanRef.current.innerText = "";
      nickNameSpanRef.current.style.color = "";
    }
  }, [nickName]);

  // 닉네임 확인
  const checkNickName = useCallback(
    debounce((nickName) => {
      const nickNameRegExp = /^([a-z0-9가-힣])[a-z0-9가-힣]{3,7}$/i;
      if (!nickNameRegExp.test(nickName)) {
        nickNameSpanRef.current.innerText =
          "닉네임은 공백 없이 4~6자 이내의 한글, 영문, 숫자를 이용하여 입력해주세요.";
        nickNameSpanRef.current.style.color = "#EF664D";
        nickNameRef.current.style.borderColor = "#EF664D";
        nickNameIconRef.current.style.color = "#EF664D";
        setNickNameCheck(true);
      } else {
        dispatch(nickNameCheckThunk({ nickName })).then((res) => {
          if (!res.payload) {
            nickNameSpanRef.current.innerText = "중복되는 닉네임입니다.";
            nickNameSpanRef.current.style.color = "#FF664D";
            nickNameRef.current.style.borderColor = "#FF664D";
            setNickNameCheck(true);
          } else {
            nickNameSpanRef.current.innerText = "사용가능한 닉네임입니다.";
            nickNameSpanRef.current.style.color = "#1DC79A";
            nickNameRef.current.style.borderColor = "#1DC79A";
            setNickNameCheck(false);
          }
        });
      }
    }, 500),
    [nickName]
  );

  useEffect(() => {
    if (email !== "") {
      checkLoginEmail(email);
    } else {
      emailSpanRef.current.innerText = "";
      emailSpanRef.current.style.color = "";
    }
  }, [checkLoginEmail, email]);

  const onsubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (emailCheck === true) {
        emailRef.current.focus();
        emailRef.current.style.color = "#3A3A3A";
        emailRef.current.innerText = "중복되는 이메일입니다.";
        // setCheck({ ...check, email: true });
      } else {
        if (nickNameCheck === true) {
          nickNameRef.current.focus();
          nickNameRef.current.style.color = "#3A3A3A";
          nickNameRef.current.innerText = "중복되는 닉네임입니다.";
          // setCheck({ ...check, nickName: true });
        } else {
          if (password !== repassword) {
            passwordRef.current.style.innerText = "";
            rePasswordSpanRef.current.focus();
            nickNameRef.current.style.color = "#3A3A3A";
            rePasswordSpanRef.current.innerText =
              "비밀번호가 일치하지 않습니다.";
            // setCheck({ ...check, password: true, repassword: true });
          } else {
            dispatch(signUpMemberThunk(newMember));
          }
        }
      }
    },
    [email, nickName, password, repassword]
  );

  return (
    <Fragment>
      <Header back={true} pageName="회원가입" />
      <SignUpBox>
        <SignUpBoxForm>
          <SignUpBoxInputGroup>
            이메일
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="text"
                value={email}
                ref={emailRef}
                state={check.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요."
                required
              ></SignUpBoxInput>
              {email.length > 0 ? (
                !emailCheck ? (
                  <SignUpBoxInputIcon ref={emailIconRef} state={true}>
                    <Ok />
                  </SignUpBoxInputIcon>
                ) : (
                  <SignUpBoxInputIcon ref={emailIconRef} state={false}>
                    <Delete />
                  </SignUpBoxInputIcon>
                )
              ) : null}
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={emailSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            비밀번호
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요."
                minLength="8"
                maxLength="20"
                ref={passwordRef}
                required
              ></SignUpBoxInput>
              {password.length > 0 ? (
                passwordRegExp.test(password) ? (
                  <SignUpBoxInputIcon ref={passwordIconRef} state={true}>
                    <Ok />
                  </SignUpBoxInputIcon>
                ) : (
                  <SignUpBoxInputIcon ref={passwordIconRef} state={false}>
                    <Delete />
                  </SignUpBoxInputIcon>
                )
              ) : null}
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={passwordSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="password"
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="비밀번호를 재입력하세요."
                minLength="8"
                maxLength="20"
                ref={rePasswordRef}
                required
              ></SignUpBoxInput>
              {repassword.length > 0 ? (
                repassword === password ? (
                  <SignUpBoxInputIcon ref={rePasswordIconRef} state={true}>
                    <Ok />
                  </SignUpBoxInputIcon>
                ) : (
                  <SignUpBoxInputIcon ref={rePasswordIconRef} state={false}>
                    <Delete />
                  </SignUpBoxInputIcon>
                )
              ) : null}
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={rePasswordSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            닉네임
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="닉네임을 입력하세요.(최대 6글자)"
                minLength="4"
                maxLength="6"
                ref={nickNameRef}
                required
              />
              {nickName.length > 0 ? (
                !nickNameCheck ? (
                  <SignUpBoxInputIcon ref={nickNameIconRef} state={true}>
                    <Ok />
                  </SignUpBoxInputIcon>
                ) : (
                  <SignUpBoxInputIcon ref={nickNameIconRef} state={false}>
                    <Delete />
                  </SignUpBoxInputIcon>
                )
              ) : null}
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={nickNameSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpButtonGroup>
            {email && password && repassword && nickName ? (
              <Button
                _onClick={(e) => onsubmitHandler(e)}
                type={"submit"}
                text={"회원가입"}
                style={{
                  width: "100%",
                  height: "56px",
                  ft_size: "18px",
                  color: "#FFFFFF",
                  bg_color: "#4D71FF",
                }}
              />
            ) : (
              <Button
                type={"submit"}
                text={"회원가입"}
                style={{
                  width: "100%",
                  height: "56px",
                  ft_size: "18px",
                  color: "#6D6D6D",
                  bg_color: "#dedede",
                }}
              />
            )}
          </SignUpButtonGroup>
        </SignUpBoxForm>
      </SignUpBox>
    </Fragment>
  );
};

export default SignUp;
