import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Auction2 from "../../components/auction2/Auction2";
import Footer from "../../components/footer/Footer";

function MyPageMyAuction() {
  const [isAuction, setIsAuction] = useState(true);

  return (
    <MyAuctionLayout>
      <Header />
      <AuctionStateNav isAuction={isAuction} setIsAuction={setIsAuction} />
      <MyAuctionBody>
        <Auction2 isAuction={isAuction} />
      </MyAuctionBody>
      <Footer />
    </MyAuctionLayout>
  );
}

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

export default MyPageMyAuction;
