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
        <div>경매중 {auctionIng}</div>
      </StateNavContainer>
      <StateNavContainer state={!isAuction} onClick={() => setIsAuction(false)}>
        <div>경매완료 {auctionDone}</div>
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
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    color: ${(props) => (props.state ? `black` : `#A5A9B6`)};
    line-height: 24px;
    border-bottom: ${(props) => (props.state ? "3px solid #3A3A3A " : "none")};
    height: 24px;

    &:after {
      content: "";
      display: block;
      border-bottom: ${(props) => (props.state ? "3px solid black " : "none")};
    }
  }
`;
export default AuctionStateNav;
