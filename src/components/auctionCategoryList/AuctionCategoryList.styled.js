// Package import
import styled from "styled-components";

export const CategoryListContainer = styled.div`
	margin-top: 32px;
`;

export const CategoryHeader = styled.div`
  margin: 16px 20px;

  display: flex;
  justify-content: space-between;
`;

export const CategoryTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const CategoryNum = styled.span`
  color: ${(props) => props.theme.colors.Blue1};
`;

export const CategoryMore = styled.div`
  display: flex;
  align-items: center;
	gap: 8px;

	span {
		color: ${(props) => props.theme.colors.Gray3};
		font-size: ${(props) => props.theme.fontSizes.sm};
		font-weight: ${(props) => props.theme.fontWeights.normal};
	}

  svg {
    width: 6px;
    height: 10px;

		path {
			fill: ${(props) => props.theme.colors.Gray3};
		}
  }
`;

export const CategoryList = styled.div`
  margin: auto 20px;

  display: flex;
	gap: 4px;
  overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`;
