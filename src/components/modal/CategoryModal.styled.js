// Package import
import styled, { css, keyframes } from "styled-components";

export const slideIn = keyframes`
  from {
      transform: translate(0%, 100%);
  }
  to {
      transform: translateX(0%);
  }
`;

export const slideOut = keyframes`
  from {
      transform: translate(0%);
  }
  to {
      transform: translate(0%, 100%);
  }
`;

// components
export const modalSettings = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  animation: ${visible ? slideIn : slideOut} 0.5s ease-out;
  transition: visibility 0.5s ease-out;
`;

export const ModalLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  z-index: 20;
`;

export const CategoryModalWrap = styled.div`
  width: 100%;
  height: 520px;

  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  position: relative;
  top: calc(100% - 520px);
  bottom: 0px;

  display: flex;
  flex-direction: column;

  /* animation: ${(props) => props.aniSlide} 0.5s ease-out; */
  ${(props) => modalSettings(props.show)}
`;

export const CategoryModalHead = styled.div`
  width: 100%;
  height: 60px;

  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryModalBodyContainer = styled.div`
  height: 460px;
  padding: 0px 20px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;

  gap: 26px 0px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export const CategoryModalBodyItem = styled.div`
  width: 165px;
  min-width: 48%;
  max-width: 48%;
  height: 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CategoryModalBodyItemIn = styled.button`
  width: 100%;
  height: 100%;

  color: ${(props) => props.theme.colors.Black};
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.medium};

  border: none;
  border-radius: 100px;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:active {
    background-color: ${(props) => props.theme.colors.SkyBlue} !important;
  }
`;
