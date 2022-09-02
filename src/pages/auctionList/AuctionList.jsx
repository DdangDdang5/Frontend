import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

//reducer
import { useDispatch, useSelector } from "react-redux";
import Auction from "../../components/auction/Auction";
import { auctionItemList } from "../../redux/modules/AuctionListSlice";

//styled
import styled from "styled-components";

const AuctionList = () => {
  // const token = localStorage.

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuctionListData = useSelector((state) => state.auctionList.auctionList);

  useEffect(() => {
    dispatch(auctionItemList());
  }, []);

  return (
    <AuctionListLayout>
      <Header />

      <ListCategoryWrap>
        <CategoryBtn>
          <CategoryBtnText>전체품목</CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnText>전체지역</CategoryBtnText>
          <CategoryBtnIcon>v</CategoryBtnIcon>
        </CategoryBtn>
        <CategoryBtn>
          <CategoryBtnText_time>마감임박</CategoryBtnText_time>
        </CategoryBtn>
      </ListCategoryWrap>

      <ListContents>
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
      </ListContents>
      {/* <PlusBtn>+</PlusBtn> */}

      <Footer />
    </AuctionListLayout>
  );
};

const AuctionListLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;

<<<<<<< Updated upstream
const ListCategoryWrap = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid red;
  margin-top: 70px;
  padding: 0px 20px;
`;
const CategoryBtn = styled.div`
=======
const AuctionListNav = styled.div``;
const CategoryBtn = styled.div`
  /* height: 30px;
  width: 80px;
  align-items: center;
>>>>>>> Stashed changes
  display: flex;
  align-items: center;
  justify-content: center;
<<<<<<< Updated upstream
  border: 1px solid #dedede;
  border-radius: 100px;
  margin-left: 8px;
  height: 30px;
`;
const CategoryBtnIcon = styled.div`
  margin: 11.53px 11.53px 11.53px 4px;
  font-size: 12px;
`;

const CategoryBtnText = styled.div`
  font-size: 16px;
  padding: 4px 4px 4px 12px;
`;
const CategoryBtnText_time = styled.div`
  font-size: 16px;
  padding: 4px 12px;
`;

const ListContents = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  height: calc(100vh - 170px);
  overflow: auto;
  padding: 0px 10px;
=======
  border-bottom: ${({ category }) => (category ? "solid 2px blue;" : "")}; */
`;
const CategoryBtnText = styled.h3`
  /* font-size: 16px; */
`;
const AuctionListContents = styled.div`
  /* overflow-y: auto; */
>>>>>>> Stashed changes
`;
const PlusBtn = styled.button`
  /* display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 500px;
  font-size: 50px;
  color: white;
  padding: 0px 15px;
  background-color: orange;
  :hover {
    background-color: #de5539;
  } */
`;

export default AuctionList;
