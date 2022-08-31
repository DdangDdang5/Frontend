import React, { useEffect } from "react";

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
  const AuctionListData = useSelector((state) => state.auctionList.auctionList);

  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <AuctionListLayout>
      <Header />

      <AuctionListNav>
        <div>카테고리</div>
        <div>지역</div>
      </AuctionListNav>

      <AuctionListContents>
        <Auction />
        <Auction />
        <Auction />
        <Auction />
      </AuctionListContents>

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
  display: flex;
  div {
    margin: 10px 20px;
  }
`;
const AuctionListContents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  height: 50%;
  border: 1px solid red;
`;
const FooterContainer = styled.div``;
export default AuctionList;
