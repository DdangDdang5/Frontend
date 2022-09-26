// Package import
import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 70px;

  background-color: white;
  border-top: 1px solid gray;

  position: absolute;
  bottom: ${(props) => (props.isIOS13 ? "10px" : "0")};
  z-index: 1;
`;

export const FooterItemContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;

  display: flex;
`;

export const FooterIcon = styled.div`
  width: 25%;
  height: 90%;
  margin: auto;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${(props) =>
        props.children[0].props.nowpage
          ? props.theme.colors.Blue1
          : props.theme.colors.Gray3} !important;
    }
  }

  span {
    color: ${(props) =>
      props.children[0].props.nowpage
        ? props.theme.colors.Blue1
        : props.theme.colors.Gray3} !important;
  }
`;
