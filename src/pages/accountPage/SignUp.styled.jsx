import styled from "styled-components";

export const SignUpBox = styled.div`
  width: 100%;
  margin-top: 15%;

  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
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

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.lg};

  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-25px);
 
`;

export const SignUpBoxForm = styled.form`
  width: 100%;
  margin-top: 10%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding-left: 10px;

  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;

  position: absolute;
  box-sizing: border-box;
  justify-content: center;
 
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.Gray4};
  }
`;

export const SignUpBoxInputIcon = styled.div`
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
    path {
      fill: ${(props) =>
        props.state
          ? props.theme.colors.Green1
          : props.theme.colors.Red};
    }
  }
`;

export const SignUpBoxSpan = styled.span`
  color: transparent;
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const SignUpButtonGroup = styled.div`
  width: 90%;
  padding-top: 28%;

  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
