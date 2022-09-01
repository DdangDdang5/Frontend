// Package import
import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const MainContent = styled.div`
  width: 100%;
  background-color: aliceblue;

  position: absolute;
  top: 70px;
  bottom: 70px;

  overflow-y: scroll;
`;

export const Banner = styled.div`
  height: 20%;
  min-height: 140px;
  padding: 20px;

  background-color: #dedede;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BannerContent = styled.div`
  width: 70%;
  /* background-color: aqua; */

  display: flex;
  flex-direction: column;
`;

export const BannerTitle = styled.span`
  font-size: 20px;
  margin-top: 5px;
`;

export const BannerPriceWrap = styled.div`
  /* background-color: aqua; */
  text-align: end;
`;

export const BannerPrice = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

export const ListContainer = styled.div`
  margin: 20px;
	/* background-color: aqua; */
`;

export const ListHeader = styled.span`
  font-size: ${(props) => props.fontSize ?  props.fontSize : "20px"};
  font-weight: bold;
	
  display: flex;
  justify-content: space-between;
	align-items: center;
`;

export const ListHeaderMore = styled.div`
  font-size: 14px;
	font-weight: normal;

  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const PopularList = styled.div`
  margin-top: 16px;

  display: flex;
  gap: 12px;
  overflow: scroll;
`;

export const PopularItem = styled.div`
  width: 185px;
  min-width: 180px;
  height: 250px;
  padding: 16px;
  background-color: gray;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TagWrap = styled.div`
  margin-bottom: 10px;

  display: flex;
  gap: 6px;

  span {
    padding: 1px 6px;

    font-size: 14px;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 100px;
  }
`;

export const PopularTitle = styled.span`
  font-size: 18px;
`;

export const PopularPriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const PopularPrice = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

export const NewList = styled.div`
  margin: 10px auto;
`;

export const NewItem = styled.div`
  margin: 8px auto;

  display: flex;

  img {
    width: 73px;
    height: 73px;
    border-radius: 8px;
  }
`;

export const NewItemContent = styled.div`
  width: calc(100% - 93px);
  margin-left: 20px;
`;

export const NewItemTitle = styled.span`
  width: 100%;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NewItemPriceWrap = styled.div`
  font-size: 14px;

  display: flex;
  align-items: center;
  gap: 5px;
`;

export const NewItemPrice = styled.span`
  font-size: 18px;
`;

export const LastList = styled.div`
	width: 90%;

	display: flex;
	gap: 20px;
`;

export const LastItem = styled.div`
	width: 165px;
	margin: 8px auto;

	background-color: aliceblue;

	img {
		width: 100%;
		height: 120px;
		margin-bottom: 10px;
		border-radius: 8px;
	}
`;
