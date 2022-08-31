import React from "react";
import styled from "styled-components";

const Auction = () => {
  return (
    <AuctionItemWrap>
      <ItemPicture>
        <div>사진</div>
      </ItemPicture>

      <ItemContentWrap>
        <ItemContentHeader>
          <div>택배</div>
          <div>동대문구</div>
        </ItemContentHeader>

        {/* 줄에 표시되는 글자수 제한 */}
        <ItemContentBody>제목은 한줄만 노출</ItemContentBody>

        <ItemContentFooter>
          <StartPrice>입찰시작가</StartPrice>
          <PresentPrice>100000원</PresentPrice>
        </ItemContentFooter>
      </ItemContentWrap>
    </AuctionItemWrap>
  );
};

const AuctionItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 74px;
  margin: 10px 0px;
  border: 1px solid black;
`;
const ItemPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  div {
    height: 100%;
    width: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid red;
  }
`;
const ItemContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0px 10px;
`;
const ItemContentHeader = styled.div`
  display: flex;
  margin: 5px 0px;
  div {
    font-size: 10px;
    margin-right: 5px;
    padding: 2px;
    border: 1px solid red;
    border-radius: 30px;
  }
`;
const ItemContentBody = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const ItemContentFooter = styled.div`
  display: flex;
`;
const StartPrice = styled.div`
  display: flex;
  font-size: 13px;
  margin-right: 5px;
`;
const PresentPrice = styled.div`
  display: flex;
  font-size: 13px;
`;

export default Auction;
