import React from "react";
import styled from "styled-components";

const Footer = () => {
  const footerList = ["홈", "검색", "채팅", "마이페이지"];

  return (
    <FooterContainer>
      <FooterItemContainer>
        {footerList.map((item, idx) => (
          <FooterIcon key={idx}>
            <img src="maskable.png" alt={item} />
            {item}
          </FooterIcon>
        ))}
      </FooterItemContainer>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100vw;
  height: 70px;
  border-top: 1px solid gray;

  position: absolute;
  bottom: 0;
`;

const FooterItemContainer = styled.div`
  width: 90vw;
  height: 100%;
  margin: auto;

  display: flex;
`;

const FooterIcon = styled.div`
  width: 25%;
  height: 90%;
  margin: auto;
  font-size: small;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
    object-fit: contain;
    border-radius: 20px;
  }
`;

export default Footer;
