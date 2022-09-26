// Package import
import styled from "styled-components";

export const CategoryItem = styled.div`
  height: fit-content;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
	gap: 8px;

  svg {
    width: 56px;
    height: 56px;
  }
	
  img {
    width: 60px;
    height: 56px;
  }
`;

export const CategoryName = styled.span`
	width: 76px;
	height: 20px;

	font-size: ${(props) => props.length > 6 ? "12px" : props.theme.fontSizes.sm};
	font-weight: ${(props) => props.theme.fontWeights.normal};

	display: flex;
	justify-content: center;
	align-items: center;
`;
