import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionRow from "../../components/auction/AuctionRow";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";

const MyPageParticipationAuction = () => {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);
  const data = useSelector((state) => state.myPage.myPage);

  return (
    <MyAuctionLayout>
      <Header />
      <AuctionStateNav isAuction={isAuction} setIsAuction={setIsAuction} />
      <MyAuctionBody>
        <AuctionRow isAuction={isAuction} />
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
