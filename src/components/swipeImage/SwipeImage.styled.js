// Package import
import styled, { css } from "styled-components";

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

export const SwipeItem = styled.div`
  width: 100%;
  min-width: 100%;
  height: auto;
  min-height: ${(props) => props.minHeight};

  position: relative;
`;

export const SwipeImg = styled.img`
  width: 100%;

  position: absolute;
  z-index: -5;

  object-fit: contain;
`;

export const SwipeContent = styled.div`
  height: 20%;
  min-height: 160px;
  padding: 20px;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  color: ${(props) => props.theme.colors.White};

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const BannerContent = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
`;

export const BannerTime = styled.span`
  width: fit-content;
  padding: 2px 8px;

  background-color: aqua;
  border-radius: 100px;

  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  ${(props) => {
    switch (props.idx) {
      case 0:
        return css`
          background: ${(props) => props.theme.colors.Green1};
        `;
      case 1:
        return css`
          background: ${(props) => props.theme.colors.Yellow};
        `;
      case 2:
        return css`
          background: ${(props) => props.theme.colors.Blue1};
        `;
      case 3:
        return css`
          background: ${(props) => props.theme.colors.Red};
        `;
      default:
        return;
    }
  }};
`;

export const BannerTitle = styled.span`
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const BannerPriceWrap = styled.div`
  text-align: end;

  span {
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export const BannerPrice = styled.span`
  margin-left: 4px;
  font-size: ${(props) => props.theme.fontSizes.xxl} !important;
  font-weight: ${(props) => props.theme.fontWeights.medium} !important;
`;

export const BannerCircle = styled.div`
  width: 214px;
  height: 214px;

  border-radius: 200px;
  z-index: -5;

  position: absolute;
  left: 61.28%;
  right: -16.15%;
  top: 45.59%;
  bottom: -50.49%;

  ${(props) => {
    switch (props.idx) {
      case 0:
        return css`
          background: linear-gradient(
            140.57deg,
            #1dc79a 17.63%,
            rgba(29, 199, 154, 0) 63.63%
          );
        `;
      case 1:
        return css`
          background: linear-gradient(
            140.57deg,
            #fdb024 17.63%,
            rgba(253, 176, 36, 0) 63.63%
          );
        `;
      case 2:
        return css`
          background: linear-gradient(
            140.57deg,
            #4d71ff 17.63%,
            rgba(77, 113, 255, 0) 63.63%
          );
        `;
      case 3:
        return css`
          background: linear-gradient(
            140.57deg,
            #ff664d 17.63%,
            rgba(255, 102, 77, 0) 63.63%
          );
        `;
      default:
        return;
    }
  }};
`;

export const SwipeIdx = styled.div`
  width: fit-content;

  position: absolute;
  top: ${(props) => (props.isMain ? "20px" : null)};
  right: ${(props) => (props.isMain ? "20px" : "45%")};
  bottom: ${(props) => (props.isMain ? null : "17px")};

  display: flex;
  gap: 4px;
`;

export const SwipeIdxItem = styled.span`
  width: 8px;
  height: 8px;

  border-radius: 10px;
  background-color: ${(props) =>
    props.idxNow ? props.theme.colors.White : "rgba(255, 255, 255, 0.5)"};
`;

export const EventBannerList = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;

  display: flex;
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

  svg {
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
  /* background: linear-gradient(180deg, #344485 0%, rgba(52, 68, 133, 0) 100%); */
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

export const SwipeBtn = styled.button`
  width: 30px;
  height: 30px;

  border: none;
  border-radius: 15px;
  opacity: 0.6;

  position: absolute;
  top: 50%;
  left: ${(props) => (props.location === "prev" ? "10px" : null)};
  right: ${(props) => (props.location === "next" ? "10px" : null)};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 15px;
    height: 15px;

    path {
      fill: ${(props) => props.theme.colors.Gray4};
    }
  }

  .back-btn {
    margin-right: 2px;
  }

  .next-btn {
    margin-left: 2px;
  }
`;
