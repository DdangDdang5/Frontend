// Package import
import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;

  position: absolute;
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
		
		path {
			fill: ${(props) => props.theme.colors.Black};
		}
	}
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

	.close {
		width: 16px;
		height: 16px;
	}
  
  .logo {
		width: 56px;
		height: 36px;
	}
`;

export const PageTitle = styled.span`
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const HeaderIconContainer = styled.div`
  width: 100px;

  display: flex;
  gap: 20px;
  justify-content: end;
	align-items: center;
	
  span {
    color: ${(props) => props.theme.colors.Gray4};
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;
