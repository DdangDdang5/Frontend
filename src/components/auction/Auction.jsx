import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Auction = ({ data }) => {
  const navigate = useNavigate();

  return (
    <AuctionItemWrap
      onClick={() => {
        navigate(`/auctionDetail/${data.auctionId}`);
      }}>
      <AuctionItemContainer>
        <ItemPicture>
          <img src={data.multiImages[0].imgUrl} alt="" />
        </ItemPicture>
        <ItemContentWrap>
          <ItemContentHeader>
            {data.direct ? <div>택배</div> : ""}
            {data.delivery ? <div>직거래</div> : ""}
          </ItemContentHeader>

          {/* 줄에 표시되는 글자수 제한 */}
          <ItemContentBody>{data.title}</ItemContentBody>

          <ItemContentFooter>
            <StartPrice>최고입찰가</StartPrice>
            <PresentPrice>{data.nowPrice}원</PresentPrice>
          </ItemContentFooter>
        </ItemContentWrap>
      </AuctionItemContainer>
    </AuctionItemWrap>
  );
};

const AuctionItemWrap = styled.div`
  display: flex;
  width: 50%;
  height: 277px;
`;
const AuctionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 10px;
`;
const ItemPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  img {
    height: 160px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
`;
const ItemContentWrap = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 117px;
`;
const ItemContentHeader = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  margin-bottom: 8px;

  div {
    align-items: center;
    font-size: 14px;
    margin-right: 5px;
    padding: 1px 6px;
    border-radius: 100px;
    background-color: #dedede;
  }
`;
const ItemContentBody = styled.div`
  display: flex;
  width: 100%;
  word-break: break-all;
  font-size: 18px;
  margin-bottom: 8px;
`;
const ItemContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StartPrice = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 4px;
  color: #9b9b9b;
`;
const PresentPrice = styled.div`
  display: flex;
  font-size: 18px;
`;

export default Auction;
