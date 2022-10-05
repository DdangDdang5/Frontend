// Package import
import styled from "styled-components";

export const SwipeContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};

  color: white;
  position: relative;

  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const SwipeShowContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-content: center;
`;

export const EventBanner = styled.div`
  width: 100%;
  min-width: 100%;
  height: auto;
  min-height: ${(props) => props.minHeight};

  position: relative;

  background-color: ${(props) =>
    props.idx ? props.theme.colors.Blue1 : props.theme.colors.Yellow};
  border-radius: ${(props) => (props.isMain ? null : "8px")};
  overflow: hidden;

  img {
		width: ${(props) => props.idx ? "212px" : "203px"};
		height: ${(props) => props.idx ? "184px" : "193px"};

    position: absolute;
    top: ${(props) => (props.isMain ? "10px" : "-15px")};
    right: ${(props) => (props.isMain ? "10px" : "-10px")};

    z-index: 10;

    transform: ${(props) => (props.isMain ? null : "scale(0.8)")};
  }
`;

export const EventContent = styled.div`
  height: calc(100% - 40px);
  padding: 20px;
  background: ${(props) =>
    props.idx
      ? "linear-gradient(180deg, #344485 0%, rgba(52, 68, 133, 0) 100%)"
      : "linear-gradient(180deg, #FF8339 0%, rgba(255, 131, 57, 0) 100%)"};
  border-radius: ${(props) => (props.isMain ? null : "8px")};

  color: ${(props) => props.theme.colors.White};

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EventDate = styled.span`
  width: fit-content;
  padding: 2px 10px;

  background: ${(props) =>
    props.idx ? props.theme.colors.Blue1 : props.theme.colors.Yellow};
  border-radius: 100px;

  font-size: ${(props) => (props.isMain ? props.theme.fontSizes.sm : "12px")};
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  line-height: 150%;
`;

export const EventTitle = styled.span`
  width: ${(props) => (props.idx ? "130px" : "160px")};

  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) =>
    props.isMain ? props.theme.fontSizes.lg : props.theme.fontSizes.md};
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  line-height: 125%;

  font-family: "GmarketSansMedium";
`;

export const EventText = styled.div`
  width: 160px;

  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => (props.isMain ? "12px" : "10px")};
  line-height: 140%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* white-space: pre-wrap; */
`;

export const EventCircle = styled.div`
  width: 214px;
  height: 214px;

  border-radius: 200px;
	background: ${(props) =>
    props.isMain && !props.idx
      ? "linear-gradient(140.57deg, #ff664d 17.64%, rgba(255, 102, 77, 0) 63.63%)"
      : "linear-gradient(140.57deg, #fdb024 17.64%, rgba(253, 176, 36, 0) 63.63%)"};

  position: absolute;
  left: 61.28%;
  right: -16.15%;
  top: 45.59%;
  bottom: -50.49%;
`;

export const SwipeBtn = styled.div`
	position: absolute;
	left: 14px;
	bottom: 14px;

	
	transform: ${(props) => props.location === "next" ? "scaleX(-1)" : null};
`;
