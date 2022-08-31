import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>
        <Img>사진</Img>
        <Text>홈</Text>
      </FooterContainer>
      <FooterContainer>
        <Img>사진</Img>
        <Text>검색</Text>
      </FooterContainer>
      <FooterContainer>
        <Img>사진</Img>
        <Text>채팅</Text>
      </FooterContainer>
      <FooterContainer>
        <Img>사진</Img>
        <Text>마이페이지</Text>
      </FooterContainer>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  border-radius: 50px;
`;
const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
