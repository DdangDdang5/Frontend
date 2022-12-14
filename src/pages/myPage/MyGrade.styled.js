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
	bottom: 0px;
`;

export const MyGradeImgWrap = styled.div`
	width: 100%;
	height: 120px;
  margin-top: 5%;

  position: relative;

  img {
    width: 120px;
    height: 120px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    width: 113px;
    height: 113px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.Gray1};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const MyGradeInfo = styled.div`
  margin-top: 12px;

  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MyGradeNickname = styled.span`
  font-size: ${(props) => props.theme.fontSizes.lg} !important;
  font-weight: ${(props) => props.theme.fontWeights.bold} !important;
`;

export const MyGradeGrade = styled.div`
  width: calc(100% - 40px);
  max-width: 90%;
  margin: 17px auto;
  text-align: left;

  p {
    color: ${(props) => props.theme.colors.Black};
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
`;

export const MyGradeBarWrap = styled.div`
  height: 8px;
  margin-top: 41px;

  background-color: ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;

  position: relative;
`;

export const MyGradeBar = styled.div`
  width: ${(props) => props.point}%;
  height: 8px;

  background-color: ${(props) => props.theme.colors.Blue1};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-radius: ${(props) => (props.point === 100 ? "8px" : null)};
`;

export const NowGrade = styled.div`
  position: absolute;
  top: -20px;
  left: ${(props) => props.point}%; // (point-2)%

  svg {
    path {
      fill: ${(props) => props.theme.colors.Blue1};
    }
  }
`;

export const NextGrade = styled.div`
  position: absolute;
  top: -36px;
  left: ${(props) =>
    props.nextPoint === 92 ? 86 : props.nextPoint}%; // (nextgrade-8)%

  display: ${(props) => (props.nextPoint === 163 ? "none" : "flex")};
  flex-direction: column;
  align-items: ${(props) => (props.nextPoint === 92 ? "end" : "center")};
  gap: 2.5px;

  span {
    width: 60px;
    color: ${(props) => props.theme.colors.Gray3};
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }

  div {
    width: 0px;
    height: 0px;
    border-top: 12px solid ${(props) => props.theme.colors.Gray2};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;

export const MyGradeText = styled.div`
  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;

export const GradeRankList = styled.div`
	margin: 20px;

	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const GradeItem = styled.div`
	height: 50px;
	padding: 9px 20px;

	background-color: ${(props) => props.theme.colors.Gray1};
	border-radius: 8px;

	display: flex;
	align-items: center;


	img {
		width: 60px;
		height: 60px;
	}
`;

export const GradeInfo = styled.div`
	width: 100%;
	margin: 9px 20px;

	color: ${(props) => props.theme.colors.Gray4};
	font-weight: ${(props) => props.theme.fontWeights.normal};
	font-size: ${(props) => props.theme.fontSizes.sm};
	line-height: 140%;
	letter-spacing: -0.05em;

	display: flex;
	flex-direction: column;
	align-items: baseline;
	gap: 1px;
`;

export const GradeItemName = styled.span`
	font-weight: ${(props) => props.theme.fontWeights.bold};
	font-size: ${(props) => props.theme.fontSizes.ms};
	line-height: 150%;
`;