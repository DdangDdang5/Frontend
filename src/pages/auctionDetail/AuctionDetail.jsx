import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";

const AuctionDetail = () => {
  return (
    <AuctionDetailLayout>
      <Header />
      <div>사진</div>

      <AuctionDetailBody>
        <div>
          <div>프로필사진</div>
          <div>
            <div>닉네임 이름</div>
            <div></div>
          </div>
        </div>
      </AuctionDetailBody>
    </AuctionDetailLayout>
  );
};

const AuctionDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const AuctionDetailBody = styled.div`
  display: flex;
`;
export default AuctionDetail;
