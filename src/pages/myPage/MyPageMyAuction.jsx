import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionRow from "../../components/auction/AuctionRow";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { _MyPageInAuction } from "../../redux/modules/MyPageSlice";

function MyPageMyAuction() {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);
  const data = useSelector((state) => state.myPage.myPageIn);

  const auctionIng = data?.filter((data) => data.auctionStatus === true).length;
  const auctionDone = data?.filter(
    (data) => data?.auctionStatus === false
  ).length;

  useEffect(() => {
    dispatch(_MyPageInAuction());
  }, []);

  // console.log("myauction", auctionIng);

  return (
    <MyAuctionLayout>
      <Header />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      <MyAuctionBody>
        <AuctionRow isAuction={isAuction} />
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
