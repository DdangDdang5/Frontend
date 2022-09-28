// Package import
import styled from "styled-components";

export const NotFoundContainer = styled.div`
  width: 100%;
`;

export const NotFoundContent = styled.div`
  width: 100%;

  position: absolute;
  top: 70px;
  bottom: 70px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  svg {
    width: 200px;
    height: 150px;
  }

  span {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: ${(props) => props.theme.fontWeights.normal};
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: 140%;
  }
`;
