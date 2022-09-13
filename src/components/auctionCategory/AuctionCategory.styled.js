// Package import
import styled from "styled-components";

export const CategoryItem = styled.div`
  height: fit-content;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
	gap: 8px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 30px;
  }

  span {
    width: 70px;
    font-size: ${(props) => props.theme.fontSizes.sm};
		font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;
