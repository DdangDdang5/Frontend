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
  font-size: 20px;
  font-weight: bold;
`;

export const CategoryNum = styled.span`
  color: gray;
`;

export const CategoryMore = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 23px;
    height: 23px;
  }
`;

export const CategoryList = styled.div`
  margin: auto 20px;

  display: flex;
  gap: 12px;
  overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`;
