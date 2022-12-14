// Package import
import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;

  position: absolute;
  z-index: 100;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled.div`
  width: 90%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
		filter: ${(props) => props.color ? "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))" : null};

    path {
			fill: ${(props) => props.color ? props.color : props.theme.colors.Black};
    }

		circle {
			fill: ${(props) => props.color ? props.color : props.theme.colors.Black};
		}
  }
`;

export const HeaderTitle = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  gap: 8px;

  #close {
    width: 16px;
    height: 16px;
  }

  #logo {
    width: 56px;
    height: 36px;
  }
`;

export const PageTitle = styled.span`
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HeaderIconContainer = styled.div`
  width: 100px;

  display: flex;
  gap: 20px;
  justify-content: end;
  align-items: center;
`;

export const SaveBtn = styled.span`
  color: ${(props) =>
    props.state ? props.theme.colors.Blue1 : props.theme.colors.Gray4};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;
