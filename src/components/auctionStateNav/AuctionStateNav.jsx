// React import
import React from "react";

// Package import
import styled from "styled-components";

const AuctionStateNav = ({
  isAuction,
  setIsAuction,
  auctionIng,
  auctionDone,
}) => {
  return (
    <AuctionStateNavLayout>
      <StateNavContainer
        type="button"
        state={isAuction}
        onClick={() => setIsAuction(true)}>
        <div>경매중</div>
        <div>{auctionIng}</div>
      </StateNavContainer>
      <StateNavContainer state={!isAuction} onClick={() => setIsAuction(false)}>
        <div>경매완료</div>
        <div>{auctionDone}</div>
      </StateNavContainer>
    </AuctionStateNavLayout>
  );
};

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
  border-bottom: ${(props) => (props.state ? "1px solid black " : "none")};
  div {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
  }
`;
export default AuctionStateNav;
