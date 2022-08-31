import React from 'react';

//components
import Footer from '../../components/footer/Footer';

//reducer

//styled
import styled from 'styled-components';
import AuctionItem from '../../components/auctionItem/AuctionItem';

const AuctionList = () => {
  return (
    <AuctionListLayout>
      <Header>
        <HeaderLeft>경매목록</HeaderLeft>
        <HeaderRight>
          <div>돋보기</div>
          <div>알람</div>
        </HeaderRight>
      </Header>

      <Nav>
        <div>카테고리</div>
        <div>지역</div>
      </Nav>

      <Contents>
        <AuctionItem />
        <AuctionItem />
        <AuctionItem />
        <AuctionItem />
      </Contents>

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLeft = styled.div`
  font: bold;
  margin: 10px;
`;
const HeaderRight = styled.div`
  display: flex;
  div {
    margin: 10px;
  }
`;
const Nav = styled.div`
  display: flex;
  div {
    margin: 10px 20px;
  }
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  height: 50%;
  border: 1px solid red;
`;
const FooterContainer = styled.div``;
export default AuctionList;
