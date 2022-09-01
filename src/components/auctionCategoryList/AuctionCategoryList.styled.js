// Package import
import styled from "styled-components";

export const CategoryHeader = styled.div`
	margin: 20px;

	background-color: beige;

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
		width: 30px;
		height: 30px;
	}
`;