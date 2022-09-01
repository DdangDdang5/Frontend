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

  const [category, setCategory] = useState(true);

  return (
    <AuctionListLayout>
      <Header />

      <AuctionListNav>
        <CategoryBtn
          category={category}
          onClick={() => {
            setCategory(true);
          }}>
          <CategoryBtnText>카테고리</CategoryBtnText>
        </CategoryBtn>
        <CategoryBtn
          category={!category}
          onClick={() => {
            setCategory(false);
          }}>
          <CategoryBtnText>지역</CategoryBtnText>
        </CategoryBtn>
      </AuctionListNav>

      <AuctionListContents>
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
        <Auction />
        <Auction />
        <Auction />
        <Auction />
      </AuctionListContents>
      {/* <PlusBtn>+</PlusBtn> */}

      <Footer />
    </AuctionListLayout>
  );
};

const AuctionListLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuctionListNav = styled.div`
  margin-top: 70px;
  display: flex;
`;
const CategoryBtn = styled.div`
  height: 30px;
  width: 80px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom: ${({ category }) => (category ? "solid 2px blue;" : "")};
`;
const CategoryBtnText = styled.h3`
  font-size: 16px;
`;
const AuctionListContents = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
`;
const PlusBtn = styled.button`
  display: flex;
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
  }
`;

export default AuctionList;
