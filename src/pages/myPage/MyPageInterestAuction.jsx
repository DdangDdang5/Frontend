import React from "react";
import styled from "styled-components";
import Auction2 from "../../components/auction2/Auction2";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const MyPageInterestAuction = () => {
  return (
    <MyAuctionLayout>
      <Header />
      <AuctionStateNavLayout>
        <StateNavContainer>
          <div>경매중</div>
          <div>10</div>
        </StateNavContainer>
        <StateNavContainer>
          <div>경매완료</div>
          <div>20</div>
        </StateNavContainer>
      </AuctionStateNavLayout>
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
const AuctionStateNavLayout = styled.div`
  display: flex;
  height: 24px;
  flex-direction: row;
  margin-top: 70px;
  margin-bottom: 20px;
  padding: 0px 20px;
  gap: 30px;
`;
const StateNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  div {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
  }
`;
const MyAuctionBody = styled.div`
  display: flex;
  height: calc(100vh - 180px);
  flex-direction: column;
  overflow: scroll;
`;
export default MyPageInterestAuction;
