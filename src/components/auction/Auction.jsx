import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Auction = () => {
  const navigate = useNavigate();
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <AuctionItemWrap onClick={() => navigate("/auctionDetail")}>
      <ItemPicture>{Img}</ItemPicture>

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
  flex-direction: column;
  width: 165px;
  height: 240px;
`;
const ItemPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 120px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
`;
const ItemContentWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 120px;
`;
const ItemContentHeader = styled.div`
  display: flex;
  width: 100%;
  height: ;
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
  width: 390px;
  font-size: 13px;
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
