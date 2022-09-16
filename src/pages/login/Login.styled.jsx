import styled from "styled-components";

export const LoginBox = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginBoxTitle = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  height: 15%;
`;

export const LoginBoxTitleSpan = styled.span`
  width: 200px;
  height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-25px);
  left: 30px;
  color: ${(props) => props.theme.colors.Black};
  font-size: 40px;
`;

export const LoginBoxForm = styled.form`
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15%;
  gap: 20px;
`;

export const LoginBoxInputGroup = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const LoginBoxInputWrap = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const LoginBoxInput = styled.input`
  width: 100%;
  height: 56px;
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  padding-left: 10px;
  padding-right: 50px;
  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.colors.White};
  color: black;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  &:focus {
    outline: none;
    border-color: #6d6d6d;
  }
`;

export const LoginBoxInputIcon = styled.div`
  .icon {
    position: absolute;
    right: 10px;
    color: ${(props) => props.theme.colors.Gray2};
    top: 56%;
    bottom: 0;
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

export const LoginBoxkakaoButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

export const LoginBoxSignUp = styled.div`
  width: 90%;
  height: 15%;
  margin-top: 5%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.Gray4};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;

export const LoginBoxSignUpText = styled.span`
  /* width: 100%; */
  text-align: center;
  display: flex;
  line-height: 140%;
  /* margin-left: 5%; */
  /* gap: 30%; */
`;

export const LoginBoxSignUpLink = styled.span`
  margin-left: 10px;

  &:hover {
    color: #000000;
    cursor: pointer;
  }
`;
