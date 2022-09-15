import styled from "styled-components";

export const SignUpBox = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignUpBoxTitle = styled.div`
  width: 100%;
  height: 15%;
  position: relative;
  box-sizing: border-box;
`;

export const SignUpBoxTitleSpan = styled.span`
  width: 200px;
  position: absolute;
  top: 50%;
  transform: translateY(-25px);
  left: 20px;
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

export const SignUpBoxForm = styled.form`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  gap: 16px;
`;

export const SignUpBoxInputGroup = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignUpBoxInputWrap = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const SignUpBoxInput = styled.input`
  width: 100%;
  height: 56px;
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  padding-left: 10px;
  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.colors.White};
  color: ${(props) => props.theme.colors.Black};
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.Gray4};
  }
`;

export const SignUpBoxInputIcon = styled.div`
  .icon {
    position: absolute;
    right: 10px;
    color: ${(props) => props.theme.colors.Green1};
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SignUpBoxSpan = styled.span`
  height: 20px;
  color: transparent;

  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const SignUpButtonGroup = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 28%;
`;
