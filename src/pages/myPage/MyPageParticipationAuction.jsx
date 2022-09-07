import React from "react";
import styled from "styled-components";
import Auction2 from "../../components/auction2/Auction2";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";

const MyPageParticipationAuction = () => {
  return (
    <MyAuctionLayout>
      <Header />
      <AuctionStateNav />
      <MyAuctionBody>
        <Auction2 />
      </MyAuctionBody>

      <Footer />
    </MyAuctionLayout>
  );
};

const MyAuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MyAuctionBody = styled.div`
  display: flex;
  height: calc(100vh - 180px);
  flex-direction: column;
  overflow: scroll;
`;

export default MyPageParticipationAuction;
