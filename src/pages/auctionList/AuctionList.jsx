import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

//reducer
import { useDispatch, useSelector } from "react-redux";
import Auction from "../../components/auction/Auction";

//styled
import styled from "styled-components";

const AuctionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AuctionListData = useSelector((state) => state.auctionList.auctionList);

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
      </AuctionListContents>
      <button>기능버튼</button>

      <FooterContainer>
        <Footer />
      </FooterContainer>
    </AuctionListLayout>
  );
};

const AuctionListLayout = styled.div`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 600px;
  margin: 10px;
  overflow: auto;
`;
const FooterContainer = styled.div``;

export default AuctionList;
