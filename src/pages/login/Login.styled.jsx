import styled from "styled-components";

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
  border: 1px solid blue;
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
