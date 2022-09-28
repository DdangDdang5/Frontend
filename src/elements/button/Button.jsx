// Package import
import styled, { css } from "styled-components";

const Button = ({ type, text, style, _onClick }) => {
  return (
    <StyledButton
      type={type}
      onClick={_onClick}
      width={style?.width}
      height={style?.height}
      ft_size={style?.ft_size}
      ft_weight={style?.ft_weight}
      bg_color={style?.bg_color}
      color={style?.color}
      disabled={style?.disabled}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

export const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  font-size: ${(props) =>
    props.ft_size ? props.ft_size : props.theme.fontSizes.md};
  font-weight: ${(props) =>
    props.ft_weight ? props.ft_weight : props.theme.fontWeights.normal};
  background-color: ${(props) =>
    props.bg_color ? props.bg_color : props.theme.colors.Blue1};
  color: ${(props) => (props.color ? props.color : props.theme.colors.Black)};
  ${(props) =>
    props.disabled
      ? css`
          :disabled ;
        `
      : null};

  border-radius: 8px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
