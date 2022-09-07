import React, { useState } from "react";
import styled from "styled-components";

const AuctionStateNav = () => {
  const [onSelect, setOnSelect] = useState(false);
  return (
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
  border-bottom: 1px solid black;
  div {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
  }
`;
export default AuctionStateNav;
