import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { _MyPageInAuction } from "../../redux/modules/MyPageSlice";
import { useNavigate } from "react-router-dom";

const AuctionRow = ({ data, isAuction }) => {
  const navigate = useNavigate();

  console.log(data);
  const Img = <img src={data.multiImages[0].imgUrl} alt="" />;

  return (
    // {data.data == '' ? }
    <AuctionLayout>
      <div
        onClick={() => {
          navigate(`/auctionDetail/${data.auctionId}`);
        }}>
        <Auction2Container>
          <ImgBox>{Img}</ImgBox>
          <ContentBox>
            <div className="contentNavBox">
              {data?.direct ? <div className="delivery">택배</div> : ""}
              {data?.delivery ? <div className="region">직거래</div> : ""}
              <div className="region">{data.region}</div>
            </div>
            <div className="title">{data.title}</div>
            <div className="priceBox">
              <div>최근입찰가</div>
              <div className="price">5000원</div>
            </div>
          </ContentBox>
        </Auction2Container>
        {isAuction ? (
          <Action2Btn>거래 진행중</Action2Btn>
        ) : (
          <Action2Btn>거래 완료</Action2Btn>
        )}
      </div>
    </AuctionLayout>
  );
};

const AuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 20px;
`;
const Auction2Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  gap: 18px;
  margin-bottom: 15px;
`;

const ImgBox = styled.div`
  display: flex;

  img {
    width: 75px;
    height: 75px;
    border-radius: 8px;
  }
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
  gap: 4px;
  .contentNavBox {
    display: flex;
    flex-direction: row;
    gap: 5px;

    .delivery {
      background-color: #4d71ff;
      color: white;
      border-radius: 100px;
      padding: 2px 6px;
      font-size: 14px;
      font-weight: 500;
    }
    .region {
      border: 1px solid #4d71ff;
      color: #4d71ff;
      border-radius: 100px;
      padding: 2px 6px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .title {
    display: flex;
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-weight: 400;
    align-items: center;

    flex-wrap: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
  }
  .priceBox {
    display: flex;
    align-items: center;
    gap: 4px;
    div {
      font-size: 14px;
      font-weight: 400;
      color: #a5a9b6;
    }
    .price {
      font-size: 18px;
      font-weight: 500;
      color: black;
    }
  }
`;
const Action2Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #4d71ff;
  border-radius: 8px;
  color: #4d71ff;
`;
export default AuctionRow;
