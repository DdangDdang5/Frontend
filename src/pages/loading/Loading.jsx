// React import
import React from "react";

// Package import
import styled, { keyframes } from "styled-components";

// Shared import
import { LoadingImg } from "../../shared/images";

const Loading = () => {
  return (
    <LoadingWrap>
      <SpinnerWrap>
        <LoadingImg />
      </SpinnerWrap>
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	} to {
		transform: rotate(-360deg);
	}
`;

const SpinnerWrap = styled.div`
  animation: ${rotate} 1s infinite;
  svg {
    width: 50px;
    height: 50px;
  }
`;

export default Loading;
