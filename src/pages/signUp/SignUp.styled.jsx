import styled from "styled-components";

export const SignUpBox = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  left: 20px;
  color: #3a3a3a;
  font-size: 20px;
`;

export const SignUpBoxForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  gap: 16px;
`;

export const SignUpBoxInputGroup = styled.div`
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignUpBoxInputWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;
`;

export const SignUpBoxInput = styled.input`
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  padding-left: 10px;
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

export const SignUpBoxInputIcon = styled.div`
  .icon {
    position: absolute;
    right: 10px;
    color: #6d6d6d;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SignUpBoxSpan = styled.span`
  height: 20px;
  color: transparent;
  font-size: 13px;
`;

export const SignUpButtonGroup = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 28%;
`;
