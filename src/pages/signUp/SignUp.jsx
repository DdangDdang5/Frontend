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
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { debounce } from "lodash";

// Component & Element import
import Button from "../../elements/button/Button";
import Header from "../../components/header/Header";

//Style import
import {
  SignUpBox,
  SignUpBoxTitle,
  SignUpBoxTitleSpan,
  SignUpBoxForm,
  SignUpBoxInputGroup,
  SignUpBoxInputWrap,
  SignUpBoxInput,
  SignUpBoxInputIcon,
  SignUpBoxSpan,
  SignUpButtonGroup,
} from "./SignUp.styled";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [repassword, setRePassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState(false);
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
  const NickNameCheckef = useRef();

  const [color, setColor] = useState({
    email: "#dedede",
    id: "#dedede",
    nickName: "#dedede",
    password: "#dedede",
    repassword: "#dedede",
  });

  const newMember = {
    email,
    password,
    nickName,
  };

  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const checkLoginEmail = useCallback(
    debounce((email) => {
      const emailRegExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!emailRegExp.test(email)) {
        emailSpanRef.current.innerText = "이메일 형식에 맞지 않습니다.";
        emailSpanRef.current.style.color = "#FF664D";
        emailRef.current.style.borderColor = "#FF664D";
        emailIconRef.current.style.color = "#FF664D";
        setEmailCheck(false);
      } else {
        dispatch(emailCheckThunk({ email })).then((res) => {
          if (!res.payload) {
            emailSpanRef.current.innerText = "중복되는 이메일입니다.";
            emailSpanRef.current.style.color = "#FF664D";
            emailRef.current.style.borderColor = "#FF664D";
            emailIconRef.current.style.color = "#FF664D";
            setEmailCheck(true);
          } else {
            emailSpanRef.current.innerText = "사용가능한 이메일입니다.";
            emailSpanRef.current.style.color = "#1DC79A";
            emailRef.current.style.borderColor = "#1DC79A";
            emailIconRef.current.style.color = "#1DC79A";
            setEmailCheck(false);
          }
        });
      }
    }, 500),
    [email]
  );

  useEffect(() => {
    if (password === "" && repassword === "") {
      passwordSpanRef.current.innerText = "";
    } else if (passwordRegExp.test(password) === false) {
      passwordSpanRef.current.innerText =
        "비밀번호는 영문 대소문자, 숫자, 특수문자(`!@#$%)를 혼합하여 8~20자로 입력해주세요.";
      passwordSpanRef.current.style.color = "#FF664D";
      passwordRef.current.style.borderColor = "#FF664D";
      passwordIconRef.current.style.color = "#FF664D";
    } else if (passwordRegExp.test(password) === true) {
      passwordSpanRef.current.style.color = "#1DC79A";
      passwordRef.current.style.borderColor = "#1DC79A";
      passwordSpanRef.current.innerText = "";
      passwordIconRef.current.style.color = "#1DC79A";
    } else if (password === "") {
      rePasswordSpanRef.current.style.color = "";
      rePasswordSpanRef.current.innerText = "";
      passwordSpanRef.current.style.color = "#FF664D";
      passwordRef.current.style.borderColor = "#FF664D";
      passwordSpanRef.current.innerText =
        "비밀번호는 영문 대소문자, 숫자, 특수문자(`!@#$%)를 혼합하여 8~20자로 입력해주세요.";
    } else if (repassword === "") {
      rePasswordSpanRef.current.style.color = "";
      passwordSpanRef.current.style.color = "";
    } else {
      if (password !== repassword) {
        passwordSpanRef.current.style.color = "";
        rePasswordSpanRef.current.style.color = "#FF664D";
        rePasswordSpanRef.current.innerText = "비밀번호가 일치하지 않습니다.";
        passwordRef.current.style.borderColor = "#FF664D";
        passwordIconRef.current.style.color = "#FF664D";
      } else {
        passwordSpanRef.current.style.color = "";
        rePasswordSpanRef.current.innerText = "비밀번호가 일치합니다";
        rePasswordSpanRef.current.style.color = "#1DC79A";
        rePasswordRef.current.style.borderColor = "#1DC79A";
        rePasswordIconRef.current.style.color = "#1DC79A";
        passwordIconRef.current.style.color = "#1DC79A";
        passwordRef.current.style.borderColor = "#1DC79A";
      }
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

  const checkNickName = useCallback(
    debounce((nickName) => {
      dispatch(nickNameCheckThunk({ nickName })).then((res) => {
        if (!res.payload) {
          nickNameSpanRef.current.innerText = "중복되는 닉네임입니다";
          nickNameSpanRef.current.style.color = "#FF664D";
          nickNameIconRef.current.style.color = "#FF664D";
          nickNameRef.current.style.borderColor = "#FF664D";
          setNickNameCheck(true);
        } else {
          nickNameSpanRef.current.innerText = "사용가능한 닉네임입니다";
          nickNameSpanRef.current.style.color = "#1DC79A";
          nickNameIconRef.current.style.color = "#1DC79A";
          nickNameRef.current.style.borderColor = "#1DC79A";
          setNickNameCheck(false);
        }
      });
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
    (event) => {
      event.preventDefault();
      if (emailCheck === true) {
        emailRef.current.focus();
        emailRef.current.style.color = "#BCBCBC";
        emailRef.current.innerText = "중복되는 이메일입니다.";
      } else {
        if (nickNameCheck === true) {
          nickNameRef.current.focus();
          nickNameRef.current.style.color = "#BCBCBC";
          nickNameRef.current.innerText = "중복되는 닉네임입니다.";
        } else {
          if (password !== repassword) {
            passwordRef.current.style.innerText = "";
            rePasswordSpanRef.current.focus();
            nickNameRef.current.style.color = "#BCBCBC";
            rePasswordSpanRef.current.innerText =
              "비밀번호가 일치하지 않습니다.";
          } else {
            dispatch(signUpMemberThunk(newMember));
          }
        }
      }
    },
    [email, password, repassword, nickName]
  );

  return (
    <Fragment>
      <Header back={true} pageName="회원가입" />
      <SignUpBox>
        <SignUpBoxForm onSubmit={(event) => onsubmitHandler(event)}>
          <SignUpBoxInputGroup>
            이메일
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                type="text"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요."
                required
              ></SignUpBoxInput>
              <SignUpBoxInputIcon ref={emailIconRef}>
                <BsFillCheckCircleFill className="icon" />
              </SignUpBoxInputIcon>
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
              <SignUpBoxInputIcon ref={passwordIconRef}>
                <BsFillCheckCircleFill className="icon" />
              </SignUpBoxInputIcon>
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
              <SignUpBoxInputIcon ref={rePasswordIconRef}>
                <BsFillCheckCircleFill className="icon" />
              </SignUpBoxInputIcon>
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={rePasswordSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpBoxInputGroup>
            닉네임
            <SignUpBoxInputWrap>
              <SignUpBoxInput
                setColor="green"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="닉네임을 입력하세요.(최대 6글자)"
                minLength="4"
                maxLength="6"
                ref={nickNameRef}
                required
              />
              <SignUpBoxInputIcon ref={nickNameIconRef}>
                <BsFillCheckCircleFill className="icon" />
              </SignUpBoxInputIcon>
            </SignUpBoxInputWrap>
            <SignUpBoxSpan ref={nickNameSpanRef}></SignUpBoxSpan>
          </SignUpBoxInputGroup>
          <SignUpButtonGroup>
            <Button
              type={"submit"}
              text={"회원가입"}
              style={{
                width: "100%",
                height: "56px",
                ft_size: "18px",
                color: "#6D6D6D",
                bg_color: "#DEDEDE",
              }}
            />
          </SignUpButtonGroup>
        </SignUpBoxForm>
      </SignUpBox>
    </Fragment>
  );
};

export default SignUp;
