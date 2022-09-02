// Package import
import styled from "styled-components";

export const SwipeContainer = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};

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
  opacity: 0.6;

  background-color: black;
  object-fit: cover;
`;

export const SwipeContent = styled.div`
  height: 20%;
  min-height: 140px;
  padding: 20px;

  /* background-color: #dedede; */
  font-size: 14px;

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
  font-size: 18px;
`;

export const BannerTitle = styled.span`
  margin-top: 4px;
  font-size: 20px;
`;

export const BannerPriceWrap = styled.div`
  text-align: end;
`;

export const BannerPrice = styled.span`
  margin-left: 4px;
  font-size: 24px;
  font-weight: bold;
`;

export const BannerCircle = styled.div`
  width: 214px;
  height: 214px;
  background-color: blue;
  border-radius: 200px;
  opacity: 0.4;

  position: absolute;
  bottom: -100px;
  right: -50px;
`;

export const SwipeIdx = styled.div`
  width: fit-content;

  position: absolute;
	top: 20px;
	right: 20px;

	display: flex;
	gap: 4px;
`;

export const SwipeIdxItem = styled.span`
  width: 8px;
  height: 8px;
	
  border-radius: 10px;
  background-color: ${(props) => props.color};
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
`;
