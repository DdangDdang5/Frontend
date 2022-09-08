// Package import
import styled from "styled-components";

export const MyGradeContainer = styled.div`
  width: 100vw;
  height: 100vh;

  text-align: center;
`;

export const MyGradeContent = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.Black};

  position: absolute;
  top: 70px;
  bottom: 70px;
`;

export const MyGradeImgWrap = styled.div`
  margin-top: 5%;

  img {
    width: 113px;
    height: 113px;
    border-radius: 100px;
  }
`;

export const MyGradeInfo = styled.div`
  margin-top: 12px;

  font-size: ${(props) => props.theme.fontSizes.ms};

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MyGradeNickname = styled.span`
  font-size: ${(props) => props.theme.fontSizes.lg} !important;
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const MyGradeGrade = styled.div`
  width: calc(100% - 40px);
	max-width: 90%;
  margin: 16px auto;
  text-align: left;

  p {
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
`;

export const MyGradeBarWrap = styled.div`
  height: 8px;
  background-color: ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;

	position: relative;
`;

export const MyGradeBar = styled.div`
	width: 20%;
	height: 8px;

	background-color: ${(props) => props.theme.colors.Gray3};
	border-radius: 8px;

	position: relative;

	div {
		width: 16px;
		height: 16px;
		border-radius: 16px;
		background-color: ${(props) => props.theme.colors.Gray2};

		position: absolute;
		right: -4px;
		top: -4px;
	}
`;

export const MyGradeText = styled.div`
  color: ${(props) => props.theme.colors.Gray3};
	font-size: ${(props) => props.theme.fontSizes.sm};
	font-weight: ${(props) => props.theme.fontWeights.normal};
`;