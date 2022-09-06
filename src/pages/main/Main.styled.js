// Package import
import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const MainContent = styled.div`
  width: 100%;
  font-size: 14px;

  position: absolute;
  top: 70px;
  bottom: 70px;

  overflow-y: scroll;
`;

export const BannerContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

export const ListContainer = styled.div`
  margin: 32px 20px;
`;

export const ListHeader = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "20px")};
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
    width: 23px;
    height: 23px;
  }
`;

export const PopularList = styled.div`
  margin-top: 16px;

  display: flex;
  gap: 12px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PopularItem = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;

    border-radius: 8px;
		z-index: -5;

    position: absolute;

    object-fit: cover;
  }
`;

export const PopularItemContent = styled.div`
  width: 185px;
  min-width: 185px;
  height: 250px;
  padding: 16px;

	color: white;
	border-radius: 8px;
  background: linear-gradient(
		180deg, #4d71ff 22.5%, 
		rgba(0, 0, 0, 0.4) 91.9%
	);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TagWrap = styled.div`
  margin-bottom: 10px;

  display: flex;
  gap: 4px;

  span {
    padding: 2px 6px;
    font-weight: bold;

		color: ${(props) => props.color};
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
    width: 75px;
    height: 75px;
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
  width: 100%;
  margin-top: 16px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  gap: 16px 20px;
`;

export const LastItem = styled.div`
  width: 165px;

  /* background-color: aliceblue; */

  img {
    width: 100%;
    height: 120px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
`;

export const AddAuction = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  position: absolute;
  bottom: 102px;
  right: 20px;
`;
