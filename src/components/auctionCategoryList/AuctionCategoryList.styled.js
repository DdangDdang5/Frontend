// Package import
import styled from "styled-components";

export const CategoryHeader = styled.div`
  margin: 20px;

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
	font-size: 14px;
	
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const CategoryList = styled.div`
  margin: auto 20px;

  display: flex;
  gap: 12px;
  overflow-x: scroll;
`;
