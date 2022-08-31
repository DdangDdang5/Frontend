import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <div>홈</div>
      <div>검색</div>
      <div>채팅</div>
      <div>마이페이지</div>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    border-radius: 50px;
    border: 1px solid black;
    padding: 5px;
    margin: 10px;
  }
`;

export default Footer;
